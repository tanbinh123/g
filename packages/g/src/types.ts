import type { vec2, vec3 } from 'gl-matrix';
import type { ParsedPathStyleProps, ParsedPolylineStyleProps } from './display-objects';
import type { DisplayObject } from './display-objects';
import type { ParsedColorStyleProperty, ParsedElement } from './property-handlers';
import type { IRenderer } from './AbstractRenderer';

export enum Shape {
  GROUP = 'g',
  CIRCLE = 'circle',
  ELLIPSE = 'ellipse',
  IMAGE = 'image',
  RECT = 'rect',
  LINE = 'line',
  POLYLINE = 'polyline',
  POLYGON = 'polygon',
  TEXT = 'text',
  PATH = 'path',
  HTML = 'html',
}

type ColorType = string | null;

export interface EventPosition {
  clientX: number;
  clientY: number;
  viewportX: number;
  viewportY: number;
  x: number;
  y: number;
}

export enum LineCap {
  BUTT = 'butt',
  ROUND = 'round',
  SQUARE = 'square',
}

export enum LineJoin {
  BEVEL = 'bevel',
  ROUND = 'round',
  MITER = 'miter',
}

export enum TextTransform {
  CAPITALIZE = 'capitalize',
  UPPERCASE = 'uppercase',
  LOWERCASE = 'lowercase',
  NONE = 'none',
}

export enum TextAlign {
  START = 'start',
  CENTER = 'center',
  END = 'end',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface BaseStyleProps {
  class?: string;
  /**
   * x in local space
   */
  x?: number;

  /**
   * y in local space
   */
  y?: number;

  /**
   * z in local space
   */
  z?: number;

  /**
   * the origin of rotation and scaling, default to (0, 0)
   */
  origin?: vec2 | vec3;

  /**
   * how do we define the 'position' of a shape?
   * eg. the default anchor of a Rect is top-left, we can change it to its' center [0.5, 0.5].
   */
  anchor?: vec2 | vec3;

  /**
   * visibility in CSS
   */
  visibility?: 'visible' | 'hidden';

  /**
   * z-index in CSS
   */
  zIndex?: number;

  /**
   * the cursor style when the target is active
   */
  cursor?: Cursor;

  /**
   * clip path
   * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path
   */
  clipPath?: DisplayObject | null;
  clipPathTargets?: DisplayObject[];

  /**
   * offset path
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Motion_Path
   */
  offsetPath?: DisplayObject | null;
  offsetPathTargets?: DisplayObject[];

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform
   */
  transform?: string;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
   */
  transformOrigin?: string;

  stroke?: ColorType;
  /** 描边透明度 */
  strokeOpacity?: number;
  /** 填充颜色 */
  fill?: ColorType;
  /** 填充透明度 */
  fillOpacity?: number;
  /** 整体透明度 */
  opacity?: number;
  /** 线宽 */
  lineWidth?: string | number;
  /** 指定如何绘制每一条线段末端 */
  lineCap?: LineCap;
  /** 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略） */
  lineJoin?: LineJoin;
  /**
   * 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。这个属性取决于浏览器是否支持 setLineDash() 函数。
   */
  lineDash?: number[] | null;
  lineDashOffset?: number;

  // padding?: number[] | number;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur
   */
  shadowBlur?: number;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor
   */
  shadowColor?: ColorType;
  /** 阴影 x 方向偏移量 */
  shadowOffsetX?: number;
  /** 阴影 y 方向偏移量 */
  shadowOffsetY?: number;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/filter
   */
  filter?: string;

  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform
   */
  textTransform?: TextTransform;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit
   */
  miterLimit?: number;
}

export interface ParsedBaseStyleProps
  extends Omit<
    BaseStyleProps,
    'fill' | 'stroke' | 'path' | 'points' | 'lineWidth' | 'shadowColor'
  > {
  fill?: ParsedColorStyleProperty;
  stroke?: ParsedColorStyleProperty;
  path?: ParsedPathStyleProps;
  points?: ParsedPolylineStyleProps;
  x?: number;
  y?: number;
  // width?: ParsedElement;
  // height?: ParsedElement;
  lineWidth?: ParsedElement;
  /**
   * x according to definition, eg. Line's x1/x2, Polyline's points
   */
  defX?: number;
  defY?: number;
  /**
   * offset relative to initial definition
   */
  offsetX?: number;
  offsetY?: number;
  shadowColor?: ParsedColorStyleProperty;
}

// Cursor style
// See: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
export type Cursor =
  | 'auto'
  | 'default'
  | 'none'
  | 'context-menu'
  | 'help'
  | 'pointer'
  | 'progress'
  | 'wait'
  | 'cell'
  | 'crosshair'
  | 'text'
  | 'vertical-text'
  | 'alias'
  | 'copy'
  | 'move'
  | 'no-drop'
  | 'not-allowed'
  | 'grab'
  | 'grabbing'
  | 'all-scroll'
  | 'col-resize'
  | 'row-resize'
  | 'n-resize'
  | 'e-resize'
  | 's-resize'
  | 'w-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'ew-resize'
  | 'ns-resize'
  | 'nesw-resize'
  | 'nwse-resize'
  | 'zoom-in'
  | 'zoom-out';

export interface RendererConfig {
  /**
   * enable dirty rectangle rendering
   */
  enableDirtyRectangleRendering: boolean;

  enableDirtyRectangleRenderingDebug: boolean;

  /**
   * enable auto rendering
   */
  enableAutoRendering: boolean;

  /**
   * enable TAA in WebGL
   */
  enableTAA: boolean;
}

export const CanvasConfig = 'CanvasConfig';
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface CanvasConfig {
  /**
   * Renderer
   */
  renderer: IRenderer;

  /**
   * 容器
   */
  container?: string | HTMLElement;

  /**
   * support OffscreenCanvas
   */
  canvas?: HTMLCanvasElement | OffscreenCanvas;

  /**
   * window.devicePixelRatio
   */
  devicePixelRatio?: number;

  /**
   * rAF
   */
  requestAnimationFrame?: (callback: FrameRequestCallback) => number;
  cancelAnimationFrame?: (id: number) => void;

  /**
   * replace `new window.Image()`
   */
  createImage?: () => HTMLImageElement;

  /**
   * 画布宽度
   */
  width?: number;
  /**
   * 画布高度
   */
  height?: number;

  /**
   * 画布背景色
   */
  background?: ColorType;

  /**
   * 画布的 cursor 样式
   */
  cursor?: Cursor;

  [key: string]: any;
}

type A = ['a' | 'A', number, number, number, number, number, number, number];
type C = ['c' | 'C', number, number, number, number, number, number];
type O = ['o' | 'O', number, number];
type H = ['h' | 'H', number];
type L = ['l' | 'L', number, number];
type M = ['m' | 'M', number, number];
type R = ['r' | 'R', number, number, number, number];
type Q = ['q' | 'Q', number, number, number, number];
type S = ['s' | 'S', number, number, number, number, number, number, number];
type T = ['t' | 'T', number, number];
type V = ['v' | 'V', number];
type U = ['u' | 'U', number, number, number];
type Z = ['z' | 'Z'];
export type PathCommand = A | C | O | H | L | M | R | Q | S | T | V | U | Z;

export type InteractivePointerEvent = PointerEvent | TouchEvent | MouseEvent | WheelEvent;

// @see https://github.com/zhanba/pailye/blob/master/packages/flex/src/types.ts
export type Tuple4<T> = [T, T, T, T];

export type Tuple4Number = Tuple4<number>;

export type Tuple3<T> = [T, T, T];

export type Tuple3Number = Tuple3<number>;

export type ComninedValue<T> = T | [T] | [T, T] | [T, T, T] | Tuple4<T>;

export type CombinedNumber = ComninedValue<number>;

export type Length = number;

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Percentage = `${Digit}%` | `${Digit}${Digit}%`;

export type LengthOrPercentage = Length | Percentage;
export type LengthOrPercentageOrAuto = Length | Percentage | 'auto';
