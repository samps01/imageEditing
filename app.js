var ImageEditor = (function () {
    function ImageEditor() {
        this.worker = new Worker('worker.js');
        this.getCanvasElement();
        this.inputReader();
    }
    ImageEditor.prototype.applyFilter = function (image) {
        var imageData = this.imageCtx.getImageData(0, 0, image.width, image.height);
        this.worker.postMessage(imageData, [imageData.data.buffer]);
        this.listenToWorker();
    };
    ImageEditor.prototype.listenToWorker = function () {
        var _this = this;
        this.worker.addEventListener('message', function (d) {
            var imageData = d.data;
            _this.imageCtx.putImageData(imageData, 0, 0);
        });
    };
    ImageEditor.prototype.imageLoader = function (image) {
        this.imageCtx.canvas.width = image.width;
        this.imageCtx.canvas.height = image.height;
        this.imageCtx.drawImage(image, 0, 0);
        this.applyFilter(image);
    };
    ImageEditor.prototype.getCanvasElement = function () {
        this.imageCanvas = document.querySelector('#image-canvas');
        this.imageCtx = this.imageCanvas.getContext('2d');
    };
    ImageEditor.prototype.inputReader = function () {
        var _this = this;
        var input = document.getElementById('image-uploader');
        input.addEventListener('change', function (event) {
            var file = event.target['files'][0];
            createImageBitmap(file).then(function (bitmap) {
                _this.imageLoader(bitmap);
            });
        });
    };
    return ImageEditor;
}());
window.onload = function () {
    return new ImageEditor();
};
