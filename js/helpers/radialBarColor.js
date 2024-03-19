function getRadialBarColor(series) {
    if (series > 30 && series < 60) {
        return "#E9E906";
    } else if (series < 30 && series > 10) {
        return "#CC3333";
    } else if (series < 10 && series > 0) {
        return "#2F4858";
    } else if (series > 60 && series < 100) {
        return "#00ff00";
    }
}

export default getRadialBarColor;