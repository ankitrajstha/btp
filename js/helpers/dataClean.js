const reformatData = (data) => {
    if (typeof data) {
        data = parseFloat(data)
    }
    if (data < 0) {
        data = 0;
    }
    return data
}

const reformatLabel = (label) => {
    let words = label.split(' ');

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(' ');
}

export { reformatData, reformatLabel };