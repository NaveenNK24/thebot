


// const roundToNearest = (value, tickSize) => {
//     return Math.round(value / tickSize) * tickSize;
// };

// const calculatePOC_VAH_VAL = (data, resolution = 1, valueAreaPercent = 0.68) => {
//     const dailyProfiles = {};
    
//     // Aggregate the data into daily profiles
//     data.forEach(candle => {
//         const date = new Date(candle.time * 1000).toISOString().split('T')[0];
//         if (!dailyProfiles[date]) {
//             dailyProfiles[date] = [];
//         }
//         dailyProfiles[date].push(candle);
//     });

//     const updatedData = data.map(candle => {
//         const date = new Date(candle.time * 1000).toISOString().split('T')[0];
//         const profile = dailyProfiles[date];

//         if (profile && profile.length) {
//             const priceLevels = {};
//             let minPrice = Infinity;
//             let maxPrice = -Infinity;

//             // Calculate price levels and volumes
//             profile.forEach(candle => {
//                 const { high, low, volume } = candle;
//                 const roundedLow = roundToNearest(low, resolution);
//                 const roundedHigh = roundToNearest(high, resolution);
//                 const priceStep = resolution;

//                 for (let price = roundedLow; price <= roundedHigh; price += priceStep) {
//                     if (!priceLevels[price]) {
//                         priceLevels[price] = 0;
//                     }
//                     priceLevels[price] += volume / ((roundedHigh - roundedLow) / resolution);
//                 }

//                 minPrice = Math.min(minPrice, roundedLow);
//                 maxPrice = Math.max(maxPrice, roundedHigh);
//             });

//             const prices = Object.keys(priceLevels).map(price => parseFloat(price));
//             const volumes = Object.values(priceLevels);
//             const totalVolume = volumes.reduce((a, b) => a + b, 0);

//             let pocIndex = 0;
//             let maxVolume = -Infinity;
//             volumes.forEach((vol, i) => {
//                 if (vol > maxVolume) {
//                     maxVolume = vol;
//                     pocIndex = i;
//                 }
//             });

//             let sumVolume = volumes[pocIndex];
//             let vahIndex = pocIndex;
//             let valIndex = pocIndex;

//             while (sumVolume < totalVolume * valueAreaPercent) {
//                 const aboveVolume = vahIndex + 1 < volumes.length ? volumes[vahIndex + 1] : 0;
//                 const belowVolume = valIndex - 1 >= 0 ? volumes[valIndex - 1] : 0;

//                 if (aboveVolume > belowVolume) {
//                     vahIndex = Math.min(vahIndex + 1, volumes.length - 1);
//                     sumVolume += aboveVolume;
//                 } else {
//                     valIndex = Math.max(valIndex - 1, 0);
//                     sumVolume += belowVolume;
//                 }

//                 if (vahIndex === volumes.length - 1 && valIndex === 0) {
//                     break;
//                 }
//             }

//             candle.poc = prices[pocIndex];
//             candle.vah = prices[vahIndex];
//             candle.val = prices[valIndex];
//         }

//         return candle;
//     });

//     return updatedData;
// };

// module.exports = { calculatePOC_VAH_VAL };


const roundToNearest = (value, tickSize) => {
    return Math.round(value / tickSize) * tickSize;
};

const calculatePOC_VAH_VAL = (data, resolution = 1, valueAreaPercent = 0.68) => {
    const dailyProfiles = {};
    
    // Aggregate the data into daily profiles
    data.forEach(candle => {
        const date = new Date(candle.time * 1000).toISOString().split('T')[0];
        if (!dailyProfiles[date]) {
            dailyProfiles[date] = [];
        }
        dailyProfiles[date].push(candle);
    });

    // Store the POC, VAH, and VAL for each day
    const dailyLevels = {};

    // Calculate POC, VAH, and VAL for each day's profile
    Object.keys(dailyProfiles).forEach(date => {
        const profile = dailyProfiles[date];
        if (profile && profile.length) {
            const priceLevels = {};
            let minPrice = Infinity;
            let maxPrice = -Infinity;

            profile.forEach(candle => {
                const { high, low, volume } = candle;
                const roundedLow = roundToNearest(low, resolution);
                const roundedHigh = roundToNearest(high, resolution);
                const priceStep = resolution;

                for (let price = roundedLow; price <= roundedHigh; price += priceStep) {
                    if (!priceLevels[price]) {
                        priceLevels[price] = 0;
                    }
                    priceLevels[price] += volume / ((roundedHigh - roundedLow) / resolution);
                }

                minPrice = Math.min(minPrice, roundedLow);
                maxPrice = Math.max(maxPrice, roundedHigh);
            });

            const prices = Object.keys(priceLevels).map(price => parseFloat(price));
            const volumes = Object.values(priceLevels);
            const totalVolume = volumes.reduce((a, b) => a + b, 0);

            let pocIndex = 0;
            let maxVolume = -Infinity;
            volumes.forEach((vol, i) => {
                if (vol > maxVolume) {
                    maxVolume = vol;
                    pocIndex = i;
                }
            });

            let sumVolume = volumes[pocIndex];
            let vahIndex = pocIndex;
            let valIndex = pocIndex;

            while (sumVolume < totalVolume * valueAreaPercent) {
                const aboveVolume = vahIndex + 1 < volumes.length ? volumes[vahIndex + 1] : 0;
                const belowVolume = valIndex - 1 >= 0 ? volumes[valIndex - 1] : 0;

                if (aboveVolume > belowVolume) {
                    vahIndex = Math.min(vahIndex + 1, volumes.length - 1);
                    sumVolume += aboveVolume;
                } else {
                    valIndex = Math.max(valIndex - 1, 0);
                    sumVolume += belowVolume;
                }

                if (vahIndex === volumes.length - 1 && valIndex === 0) {
                    break;
                }
            }

            dailyLevels[date] = {
                poc: prices[pocIndex],
                vah: prices[vahIndex],
                val: prices[valIndex]
            };
        }
    });

    // Map the calculated levels to the next day's candles
    const updatedData = data.map(candle => {
        const date = new Date(candle.time * 1000).toISOString().split('T')[0];
        const previousDate = new Date(candle.time * 1000 - 86400000).toISOString().split('T')[0]; // One day earlier

        if (dailyLevels[previousDate]) {
            candle.poc = dailyLevels[previousDate].poc;
            candle.vah = dailyLevels[previousDate].vah;
            candle.val = dailyLevels[previousDate].val;
        }

        return candle;
    });

    return updatedData;
};

module.exports = { calculatePOC_VAH_VAL };

