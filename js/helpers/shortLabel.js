const shortLabel = (labels, name = false) => {
    let newLabels = {};
    if (!name) {
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
    } else {
        labels.forEach(label => {
            if (label.length > 5) {
                var intitals = "";
                var labelWords = label.split(" ");
                for (let i = 0; i < labelWords.length; i++) {
                    if (labelWords[i].length < 8 && i == 0) {
                        intitals += labelWords[i]
                        break
                    } else {
                        intitals += labelWords[i][0]
                    }
                }
                newLabels[intitals] = label;
            } else {
                newLabels[label] = label;
            }
        });
    }
    return newLabels;
}
export default shortLabel;