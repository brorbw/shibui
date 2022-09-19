# shibui - a particular aesthetic of simple, subtle, and unobtrusive beauty.

This small project is inspired by [trianglify](https://trianglify.io/). It will generate wallpapers with random patterns from a color palette from a hex.
This project does not have a limit like the web page.

This project will create a light and a dark wallpaper based on the `baseColor`. MacOS users can use a project like [Wallpapper](https://github.com/mczachurski/wallpapper) to create a dynamic wallpaper.

### Prerequisites: 
- node

### Install

``` sh 
git clone https://github.com/brorbw/shibui
cd shibui
npm install
npm run start <path-to-config>
```

#### Example config

``` json
{
	"width": 6000, // width of canvas
	"height": 3000, // height of canvas
	"cellSize": 70, // size of triangles
	"variance": 1, // variance in angles
	"intensity": 0.1, // intensity of the coloring
	"darkenAmount": 0.7, // 
	"baseColor": "212337"
}
```
