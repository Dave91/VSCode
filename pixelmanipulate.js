const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 450;

const image1 = new Image();
image1.src = 'space.jpg';
context.drawImage(image1, 0, 0);
image1.addEventListener('load', function() {
	context.drawImage(image1, 0, 0, canvas.width, canvas.height);
	const scannedImage = context.getImageData(0, 0, canvas.width, canvas.height);
	// console.log(scannedImage);
	// 1st pixel rgba values (4 num), 2nd pixels, etc..
	const scannedData = scannedImage.data;
	for (let i = 0; i < scannedData.length; i += 4) {
		const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2];
		const avgColorVal = total / 3;
		scannedData[i] = avgColorVal;
		scannedData[i + 1] = avgColorVal;
		scannedData[i + 2] = avgColorVal;
	}
	scannedImage.data = scannedData;
	context.putImageData(scannedImage, 0, 0);
});
