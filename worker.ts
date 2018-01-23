addEventListener('message', (d) => {
    const imageData = d.data;
    const width = d.data.width;
    const height = d.data.height;
    for (let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            imageData.data[index] = imageData.data[index] * 2.12;
        }
    }
    this.postMessage(imageData, [imageData.data.buffer]);
});