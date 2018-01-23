class ImageEditor {
    private fileReader = new FileReader();
    private image = new Image();
    public imageCanvas;
    public imageCtx;
    constructor() {
        this.getCanvasElement();
        this.inputReader();
    }

    private imageLoader() {
        this.image.addEventListener('load', (event) => {
            this.imageCtx.canvas.width = this.image.width;
            this.imageCtx.canvas.height = this.image.height;
            console.log(this.imageCtx);
            this.imageCtx.drawImage(this.image, 0,0);
        });
    }

    private readFile(file) {
        this.fileReader.readAsDataURL(file);
        this.fileReader.addEventListener('load', (event) => {
            let base64 = event.target['result'];
            this.image.src = base64;
            this.imageLoader();
        })
    }

    public getCanvasElement() {
        this.imageCanvas = <HTMLCanvasElement> document.querySelector('#image-canvas');
        this.imageCtx = this.imageCanvas.getContext('2d');
    }

    public inputReader() {
        let input = document.getElementById('image-uploader');
        input.addEventListener('change', (event) => {
            let file = event.target['files'][0];
            this.readFile(file);
        })
    }
}

window.onload =function () {
   return new ImageEditor();
};