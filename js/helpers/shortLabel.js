const shortLabel = (labels) => {
    let newLabels = {};
    labels.forEach(label => {
        if (label.length > 5) {
            var intitals = "";
            label.split(" ").forEach((word) => {
                intitals += word[0];
            });
            newLabels[intitals] = label;
        } else {
            newLabels[label] = label;
        }
    });
    return newLabels;
}
export default shortLabel;