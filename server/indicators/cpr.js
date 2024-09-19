// Aggregates intraday data to daily OHLC data
const aggregateToDailyData = (data) => {
    const dailyData = {};

    data.forEach((entry) => {
        const date = new Date(entry.time * 1000).toISOString().split('T')[0]; // Convert to YYYY-MM-DD

        if (!dailyData[date]) {
            dailyData[date] = {
                high: entry.high,
                low: entry.low,
                close: entry.close,
                entries: [entry], // Store all intraday data for this date
            };
        } else {
            dailyData[date].high = Math.max(dailyData[date].high, entry.high);
            dailyData[date].low = Math.min(dailyData[date].low, entry.low);
            dailyData[date].close = entry.close; // Latest close price of the day
            dailyData[date].entries.push(entry); // Add intraday entry to the date
        }
    });

    return Object.keys(dailyData).map(date => ({
        date,
        ...dailyData[date],
    }));
};

// Calculates daily CPR and other pivot levels based on the previous day's data
const calculatePivotLevels = (data) => {
    if (!data || data.length < 2) return data;

    // Aggregate intraday data to daily OHLC data
    const dailyData = aggregateToDailyData(data);



    // Process each day in the dataset
    return dailyData.flatMap((currentDay, index) => {
        if (index === 0) return currentDay.entries; // Skip the first day since there's no previous day to calculate pivot levels

        const previousDay = dailyData[index - 1];

        const prevHigh = parseFloat(previousDay.high);
        const prevLow = parseFloat(previousDay.low);
        const prevClose = parseFloat(previousDay.close);

        const pivot = (prevHigh + prevLow + prevClose) / 3;
        const bottomPivot = (prevHigh + prevLow) / 2; // Bottom Central Pivot (BC)
        const topPivot = ((pivot-bottomPivot) + pivot); // Top Central Pivot (TC)

        // console.log("diff of CP-TP",pivot - topPivot);
        // console.log("diff of CP-BP",pivot - bottomPivot);
        // console.log("diff of TP-BP",topPivot - bottomPivot);

        // Calculate additional support (S1, S2, S3, S4) and resistance (R1, R2, R3, R4) levels
        const r1 = 2 * pivot - prevLow;
        const s1 = 2 * pivot - prevHigh;
        const r2 = pivot + (prevHigh - prevLow);
        const s2 = pivot - (prevHigh - prevLow);
        const r3 = r1 + (prevHigh - prevLow);
        const s3 = s1 - (prevHigh - prevLow);
        const r4 = r3 + (r2 - r1);
        const s4 = s3 - (s1 - s2);

        // Apply calculated pivot levels to the current day's intraday data
        return currentDay.entries.map(entry => ({
            ...entry,
            pivot,
            toppivot: topPivot,
            bottompivot: bottomPivot,
            s1,
            s2,
            s3,
            s4,
            r1,
            r2,
            r3,
            r4
        }));
    });
};


module.exports = { calculatePivotLevels };
