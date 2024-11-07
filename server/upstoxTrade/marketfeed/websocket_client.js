// Import required modules
var UpstoxClient = require("upstox-js-sdk");
const WebSocket = require("ws").WebSocket;
const protobuf = require("protobufjs");
Token = require('../../models/upstoxAuthToken');

const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

// Initialize global variables
let protobufRoot = null;
let defaultClient = UpstoxClient.ApiClient.instance;
let apiVersion = "2.0";
let OAUTH2 = defaultClient.authentications["OAUTH2"];


// Function to get the Upstox token from the database
const getUpstoxToken = async () => {
    try {
        const tokenDoc = await Token.findOne(); // Fetch the first token document
        return tokenDoc ? tokenDoc.upstoxToken : null; // Return the token or null if not found
    } catch (error) {
        console.error('Error retrieving Upstox token from DB:', error);
        throw new Error('Failed to retrieve Upstox token');
    }
};

const getMarketFeedUrl = async () => {
  return new Promise((resolve, reject) => {
    let apiInstance = new UpstoxClient.WebsocketApi(); // Create new Websocket API instance

    // Call the getMarketDataFeedAuthorize function from the API
    apiInstance.getMarketDataFeedAuthorize(
      apiVersion,
      (error, data, response) => {
        if (error) reject(error); // If there's an error, reject the promise
        else resolve(data.data.authorizedRedirectUri); // Else, resolve the promise with the authorized URL
      }
    );
  });
};

// Function to establish WebSocket connection
const connectWebSocket = async (wsUrl) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl, {
      headers: {
        "Api-Version": apiVersion,
        Authorization: "Bearer " + OAUTH2.accessToken,
      },
      followRedirects: true,
    });

    // WebSocket event handlers
    ws.on("open", () => {
      console.log("connected");
      resolve(ws); // Resolve the promise once connected

      // Set a timeout to send a subscription message after 1 second
      setTimeout(() => {
        const data = {
          guid: "someguid",
          method: "sub",
          data: {
            mode: "full",
            instrumentKeys: ["NSE_FO|50387"],
          },
        };
        ws.send(Buffer.from(JSON.stringify(data)));
      }, 1000);
    });

    ws.on("close", () => {
      console.log("disconnected");
    });

    ws.on("message", (data) => {
        const decodedData = decodeProfobuf(data);
    //   console.log(JSON.stringify(decodeProfobuf(data)));
      
      eventEmitter.emit("marketData", decodedData); // Decode the protobuf message on receiving it
    });

    ws.on("error", (error) => {
      console.log("error:", error);
      reject(error); // Reject the promise on error
    });
  });
};

// Function to initialize the protobuf part
const initProtobuf = async () => {
  protobufRoot = await protobuf.load(__dirname + "/MarketDataFeed.proto");
  console.log("Protobuf part initialization complete");
};

// Function to decode protobuf message
const decodeProfobuf = (buffer) => {
  if (!protobufRoot) {
    console.warn("Protobuf part not initialized yet!");
    return null;
  }

  const FeedResponse = protobufRoot.lookupType(
    "com.upstox.marketdatafeeder.rpc.proto.FeedResponse"
  );
  return FeedResponse.decode(buffer);
};

// Initialize the protobuf part and establish the WebSocket connection
(async () => {
  try {

    OAUTH2.accessToken = await getUpstoxToken();
    // await initProtobuf(); // Initialize protobuf
    // const wsUrl = await getMarketFeedUrl(); // Get the market feed URL
    // const ws = await connectWebSocket(wsUrl); // Connect to the WebSocket

    // const isValid = await validateAccessToken(OAUTH2.accessToken);
    if (OAUTH2.accessToken) {
        // console.log("OAUTH2.accessToken is valid:", OAUTH2.accessToken);
        await initProtobuf(); // Initialize protobuf
        const wsUrl = await getMarketFeedUrl(); // Get the market feed URL
        const ws = await connectWebSocket(wsUrl); // Connect to the WebSocket
    } else {
        console.log("OAUTH2.accessToken is invalid. Cannot proceed with WebSocket connection.");
        // Handle the invalid token case (e.g., wait for a valid token or refresh)
    }

  } catch (error) {
    console.error("An error occurred:", error);
  }
})();

module.exports = {
    eventEmitter,
  };