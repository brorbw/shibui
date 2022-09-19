const trianglify = require('trianglify');
const ColorScheme = require('color-scheme');
const invert = require('invert-color');
const Color = require('color');

const scheme = new ColorScheme;
const fs = require('fs');

const baseHex = '212337';

// const width = 5_573
// const height= 2_654

const width = 6000
const height= 3000

const hue = Math.floor(Math.random() * 360)
const lightColors = scheme.from_hex(baseHex)
                          .scheme('mono')
                          .variation('soft')
                          .colors().slice(1);

const darkColors = lightColors.map( color => {
  return Color(`#${color}`).darken(0.7).hex()
});

const base = trianglify({
  width: width,
  height: height,
  cellSize: 70,
  variance: 1,
  seed: null,
  fill: false,
  colorSpace: 'lab',
  strokeWidth: 0,
  points: null
});

const dark = trianglify({
  width: width,
  height: height,
	xColors: darkColors, // colors.map( color =>  invert(color) ),
	// xColors: ['191a29', '212336', '2b2e47', '616883'],
  fill: true,
  colorSpace: 'lab',
  colorFunction: trianglify.colorFunctions.sparkle(0.1),
  strokeWidth: 0,
  points: base.points
});

const light = trianglify({
  width: width,
  height: height,
	xColors: lightColors, // colors,
	// xColors: ['e5e9f0', 'd8dee9', '88c0d0', '81a1c1', '414858'],
  fill: true,
  colorSpace: 'lab',
  colorFunction: trianglify.colorFunctions.sparkle(0.1),
  strokeWidth: 0,
  points: base.points
});

const darkCanvas = dark.toCanvas()
const darkFile = fs.createWriteStream('dark.png')
darkCanvas.createPNGStream().pipe(darkFile)

const lightCanvas = light.toCanvas()
const lightFile = fs.createWriteStream('light.png')
lightCanvas.createPNGStream().pipe(lightFile)
