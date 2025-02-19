import type { ParsedBaseStyleProps, DisplayObject } from '@antv/g';
import { Syringe } from 'mana-syringe';

export const StyleRendererFactory = Syringe.defineToken('StyleRendererFactory');
export const StyleRenderer = Syringe.defineToken('StyleRenderer');
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface StyleRenderer {
  hash: (parsedStyle: ParsedBaseStyleProps) => string;
  render: (
    context: CanvasRenderingContext2D,
    parsedStyle: ParsedBaseStyleProps,
    object: DisplayObject,
  ) => void;
}
