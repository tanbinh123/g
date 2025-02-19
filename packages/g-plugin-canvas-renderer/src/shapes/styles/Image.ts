import type { ParsedImageStyleProps } from '@antv/g';
import { Shape } from '@antv/g';
import { inject, singleton } from 'mana-syringe';
import { isString } from '@antv/util';
import { ImagePool } from '../ImagePool';
import { StyleRenderer } from './interfaces';

@singleton({
  token: { token: StyleRenderer, named: Shape.IMAGE },
})
export class ImageRenderer implements StyleRenderer {
  @inject(ImagePool)
  private imagePool: ImagePool;

  hash(parsedStyle: ParsedImageStyleProps): string {
    return '';
  }

  render(context: CanvasRenderingContext2D, parsedStyle: ParsedImageStyleProps) {
    const { widthInPixels, heightInPixels, img } = parsedStyle;

    let image: HTMLImageElement;
    let iw = widthInPixels;
    let ih = heightInPixels;

    if (isString(img)) {
      // image has been loaded in `mounted` hook
      image = this.imagePool.getImageSync(img);
    } else {
      iw ||= img.width;
      ih ||= img.height;
      image = img;
    }

    if (image) {
      context.drawImage(image, 0, 0, iw, ih);
    }
  }
}
