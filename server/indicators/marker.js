const markers_inc = (data) => {

    data = data.map((d, i, arr) => {
        const long =
            arr[i]?.sma1 > arr[i]?.sma2 && arr[i - 1]?.sma1 < arr[i - 1]?.sma2
            ? true
            : false;
        const short =
            arr[i]?.sma1 < arr[i]?.sma2 && arr[i - 1]?.sma1 > arr[i - 1]?.sma2
            ? true
            : false;
        return { ...d, long, short };
    });
    return data;
};
module.exports = { markers_inc };
