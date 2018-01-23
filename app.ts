class ImageEditor {
    public imageCanvas;
    public imageCtx;
    public worker = new Worker('worker.js');
    constructor() {
        this.getCanvasElement();
        this.inputReader();
    }
    private applyFilter(image) {
        let imageData = this.imageCtx.getImageData(0, 0, image.width, image.height);
        this.worker.postMessage(imageData, [imageData.data.buffer]);
        this.listenToWorker();
    }


    private listenToWorker() {
        this.worker.addEventListener('message', (d) => {
            const imageData = d.data;
            this.imageCtx.putImageData(imageData, 0, 0);
        })
    }

    private imageLoader(image): void {
            this.imageCtx.canvas.width = image.width;
            this.imageCtx.canvas.height = image.height;
            this.imageCtx.drawImage(image, 0,0);
            this.applyFilter(image);
    }

    public getCanvasElement(): void {
        this.imageCanvas = <HTMLCanvasElement> document.querySelector('#image-canvas');
        this.imageCtx = this.imageCanvas.getContext('2d');
    }

    public inputReader(): void {
        let input = document.getElementById('image-uploader');
        input.addEventListener('change', (event) => {
            let file = event.target['files'][0];
            createImageBitmap(file).then((bitmap) => {
                this.imageLoader(bitmap);
            })
        })
    }
}

window.onload = (): ImageEditor => {
   return new ImageEditor();
};