import { Syringe } from 'mana-syringe';

export const MatterJSPluginOptions = Syringe.defineToken('MatterJSPluginOptions');
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface MatterJSPluginOptions {
  debug: boolean;
  debugContainer: HTMLElement;
  debugCanvasWidth: number;
  debugCanvasHeight: number;
  gravity: [number, number];
  gravityScale: number;
  timeStep: number;
  velocityIterations: number;
  positionIterations: number;
}
