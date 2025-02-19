import { Circle, Line, Path, Polyline, Canvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import * as lil from 'lil-gui';
import Stats from 'stats.js';

/**
 * ported from https://animista.net/play/entrances/scale-in
 */

// create a renderer
const canvasRenderer = new CanvasRenderer();
const webglRenderer = new WebGLRenderer();
const svgRenderer = new SVGRenderer();

// create a canvas
const canvas = new Canvas({
  container: 'container',
  width: 600,
  height: 500,
  renderer: canvasRenderer,
});

const offsetPathLine = new Line({
  style: {
    x1: 100,
    y1: 100,
    x2: 300,
    y2: 100,
  },
});
const offsetPathPolyline = new Polyline({
  style: {
    stroke: 'black',
    points: [
      [50, 50],
      [100, 50],
      [100, 100],
      [150, 100],
      [150, 150],
      [200, 150],
      [200, 200],
      [250, 200],
      [250, 250],
      [300, 250],
      [300, 300],
      [350, 300],
      [350, 350],
      [400, 350],
      [400, 400],
      [450, 400],
    ],
  },
});

const offsetPathPath = new Path({
  style: {
    path:
      'M 100,300' +
      'l 50,-25' +
      'a25,25 -30 0,1 50,-25' +
      'l 50,-25' +
      'a25,50 -30 0,1 50,-25' +
      'l 50,-25' +
      'a25,75 -30 0,1 50,-25' +
      'l 50,-25' +
      'a25,100 -30 0,1 50,-25' +
      'l 50,-25' +
      'l 0, 200,' +
      'z',
  },
});

const circle1 = new Circle({
  style: {
    x: 200,
    y: 200,
    r: 60,
    fill: '#1890FF',
    stroke: '#F04864',
    lineWidth: 4,
    offsetPath: offsetPathLine,
  },
});
const circle2 = new Circle({
  style: {
    x: 200,
    y: 200,
    r: 10,
    fill: '#1890FF',
    stroke: '#F04864',
    lineWidth: 4,
    offsetPath: offsetPathPolyline,
  },
});
const circle3 = new Circle({
  style: {
    x: 200,
    y: 300,
    r: 60,
    fill: '#1890FF',
    stroke: '#F04864',
    lineWidth: 4,
    offsetPath: offsetPathPath,
  },
});

canvas.appendChild(offsetPathPolyline);
canvas.appendChild(circle1);
canvas.appendChild(circle2);
canvas.appendChild(circle3);

circle1.animate([{ offsetDistance: 0 }, { offsetDistance: 1 }], {
  duration: 2500,
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  iterations: Infinity,
  direction: 'alternate',
});
const animation = circle2.animate([{ offsetDistance: 0 }, { offsetDistance: 1 }], {
  duration: 3500,
  easing: 'linear',
  iterations: Infinity,
  direction: 'alternate',
});

circle3.animate([{ offsetDistance: 0 }, { offsetDistance: 1 }], {
  duration: 4500,
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  iterations: Infinity,
  direction: 'alternate',
});

// stats
const stats = new Stats();
stats.showPanel(0);
const $stats = stats.dom;
$stats.style.position = 'absolute';
$stats.style.left = '0px';
$stats.style.top = '0px';
const $wrapper = document.getElementById('container');
$wrapper.appendChild($stats);
canvas.on('afterrender', () => {
  if (stats) {
    stats.update();
  }
});

// GUI
const gui = new lil.GUI({ autoPlace: false });
$wrapper.appendChild(gui.domElement);
const rendererFolder = gui.addFolder('renderer');
const rendererConfig = {
  renderer: 'canvas',
  currentTime: 0,
};
rendererFolder.add(rendererConfig, 'renderer', ['canvas', 'webgl', 'svg']).onChange((renderer) => {
  canvas.setRenderer(
    renderer === 'canvas' ? canvasRenderer : renderer === 'webgl' ? webglRenderer : svgRenderer,
  );
});
rendererFolder.add(rendererConfig, 'currentTime', 0, 3500).onChange((currentTime) => {
  animation.currentTime = currentTime;
});
rendererFolder.open();
