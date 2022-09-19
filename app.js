const trianglify = require('trianglify');
const ColorScheme = require('color-scheme');
const invert = require('invert-color');
const Color = require('color');
const path = require('path');
const fs = require('fs');

const scheme = new ColorScheme;

const configPath = path.resolve(process.argv[2]);
if (!configPath) {
  console.log( "Must provide a path to config file" );
  console.log( "See README.md" );
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath));

const baseHex = config.baseColor;
const width = config.width
const height= config.height

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
  cellSize: config.cellSize,
  variance: config.variance,
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
  colorFunction: trianglify.colorFunctions.sparkle(config.intensity),
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
  colorFunction: trianglify.colorFunctions.sparkle(config.intensity),
  strokeWidth: 0,
  points: base.points
});

const outputDIR = config.path || path.join(__dirname, 'output')

fs.mkdir(outputDIR, (err) => {
  if (err) {
    console.log("Unable to create DIR");
    console.error(err);
    process.exit(1);
  }
});

const darkCanvas = dark.toCanvas()
const darkFile = fs.createWriteStream(`${outputDIR}/dark.png`)
darkCanvas.createPNGStream().pipe(darkFile)

const lightCanvas = light.toCanvas()
const lightFile = fs.createWriteStream(`${outputDIR}/light.png`)
lightCanvas.createPNGStream().pipe(lightFile)
