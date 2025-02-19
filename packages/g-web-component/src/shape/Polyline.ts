import type { PolylineStyleProps } from "@antv/g";
import { Polyline } from "@antv/g";
import { BaseShape } from "./BaseShape";

export class PolylineShape extends BaseShape {
  getElementInstance() {
    const shape = new Polyline({
      style: this.getAttrsData() as PolylineStyleProps,
    });
    return shape;
  }
}

