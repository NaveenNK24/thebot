const Wick_Multiplier = 2.5;
const Body_Percentage = 0.25;

const getSignal = (C, O, H, L) => {
    if ((C > O && (O - L) >= ((C - O) * Wick_Multiplier) && (H - C) <= ((H - L) * Body_Percentage)) ||
        (C < O && (C - L) >= ((O - C) * Wick_Multiplier) && (H - C) <= ((H - L) * Body_Percentage)) ||
        (C === O && C !== H && (H - L) >= ((H - C) * Wick_Multiplier) && (H - C) <= ((H - L) * Body_Percentage)) ||
        (O === H && C === H && (H - L) >= getAverageHL(H, L))) {
        return "Long";
    } else if ((C < O && (H - O) >= ((O - C) * Wick_Multiplier) && (C - L) <= ((H - L) * Body_Percentage)) ||
               (C > O && (H - C) >= ((C - O) * Wick_Multiplier) && (C - L) <= ((H - L) * Body_Percentage)) ||
               (C === O && C !== L && (H - L) >= ((C - L) * Wick_Multiplier) && (C - L) <= ((H - L) * Body_Percentage)) ||
               (O === L && C === L && (H - L) >= getAverageHL(H, L))) {
        return "Short";
    }

    return null;
};

const getAverageHL = (H, L) => ((H - L) + 50)/2;

const calculateWRSignals = (data) => data.map(({ close, open, high, low, ...rest }) => ({
    ...rest,
    close,
    open,
    high,
    low,
    WRSignal: getSignal(close, open, high, low),
}));

module.exports = { calculateWRSignals };
