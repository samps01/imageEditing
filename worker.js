var _this = this;
addEventListener('message', function (d) {
    var imageData = d.data;
    var width = d.data.width;
    var height = d.data.height;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var index = (x + y * width) * 4;
            imageData.data[index] = imageData.data[index] * 2.12;
        }
    }
    _this.postMessage(imageData, [imageData.data.buffer]);
});
