const calculateERSignal = (data, BodySize = 0.525, BarsBack = 50, BodyMultiplier = 2) => {
    // Helper function to calculate averages
    const calculateAverages = (data, BarsBack) => {
        let totalBodySize = 0;
        let totalCandleSize = 0;

        for (let i = 0; i < BarsBack; i++) {
            const myBodySize = Math.abs(data[i].close - data[i].open);
            totalBodySize += myBodySize;

            const myCandleSize = data[i].high - data[i].low;
            totalCandleSize += myCandleSize;
        }

        return {
            averageBody: totalBodySize / BarsBack,
            averageCandle: totalCandleSize / BarsBack,
        };
    };

    // Process each item and add ERSignal
    const results = data.map((current, index, array) => {
        if (index < BarsBack) {
            // Not enough data to calculate
            return {
                ...current,
                ERSignal: null,
            };
        }

        // Calculate averages based on BarsBack period
        const { averageBody, averageCandle } = calculateAverages(array.slice(index - BarsBack + 1, index + 1), BarsBack);

        // Get the previous data point
        const previous = array[index - 1];

        // Calculate current body size and candle size
        const myBodySize = Math.abs(current.close - current.open);
        const myCandleSize = current.high - current.low;

        // Determine ERSignal
        let signal = null;
        if (
            (previous.open - previous.close) >= (BodySize * (previous.high - previous.low)) &&
            (previous.high - previous.low) > (averageCandle * BodyMultiplier) &&
            (previous.open - previous.close) > averageBody &&
            (current.close > current.open)
        ) {
            signal = "Long";
        } else if (
            (previous.close - previous.open) >= (BodySize * (previous.high - previous.low)) &&
            (previous.high - previous.low) > (averageCandle * BodyMultiplier) &&
            (previous.close - previous.open) > averageBody &&
            (current.open > current.close)
        ) {
            signal = "Short";
        }

        return {
            ...current,
            ERSignal: signal,
        };
    });

    return results;
};




module.exports = { calculateERSignal };
