var ImageEditor = (function () {
    function ImageEditor() {
        this.fileReader = new FileReader();
        this.image = new Image();
        this.getCanvasElement();
        this.inputReader();
    }
    ImageEditor.prototype.imageLoader = function () {
        var _this = this;
        this.image.addEventListener('load', function (event) {
            _this.imageCtx.canvas.width = _this.image.width;
            _this.imageCtx.canvas.height = _this.image.height;
            console.log(_this.imageCtx);
            _this.imageCtx.drawImage(_this.image, 0, 0);
        });
    };
    ImageEditor.prototype.readFile = function (file) {
        var _this = this;
        this.fileReader.readAsDataURL(file);
        this.fileReader.addEventListener('load', function (event) {
            var base64 = event.target['result'];
            _this.image.src = base64;
            _this.imageLoader();
        });
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
            _this.readFile(file);
        });
    };
    return ImageEditor;
}());
window.onload = function () {
    return new ImageEditor();
};
