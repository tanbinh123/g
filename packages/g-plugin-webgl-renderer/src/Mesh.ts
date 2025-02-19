import { DisplayObject } from '@antv/g';
import type { ParsedBaseStyleProps, BaseStyleProps, DisplayObjectConfig } from '@antv/g';
import type { BufferGeometry } from './geometries';
import type { Material } from './materials';

export interface MeshStyleProps extends BaseStyleProps {
  geometry: BufferGeometry;
  material: Material;
}

export interface ParsedMeshStyleProps extends ParsedBaseStyleProps {
  geometry: BufferGeometry;
  material: Material;
}

export class Mesh<GeometryProps = any> extends DisplayObject<GeometryProps & MeshStyleProps> {
  static tag = 'mesh';

  constructor({ style, ...rest }: DisplayObjectConfig<GeometryProps & MeshStyleProps>) {
    super({
      type: Mesh.tag,
      style: {
        lineWidth: 0,
        ...style,
      },
      ...rest,
    });

    this.cullable.enable = false;

    this.style.geometry.meshes.push(this);
    this.style.material.meshes.push(this);
  }

  // getVertexBufferData(bufferIndex: number) {
  //   return this.style.geometry.vertexBuffers[bufferIndex];
  // }

  // setVertexBufferData(descriptor: {
  //   bufferIndex: number;
  //   byteOffset: number;
  //   data: ArrayBufferView;
  // }) {}

  destroy() {
    super.destroy();

    // detach from geometry
    let meshes = this.style.geometry.meshes;
    let index = meshes.indexOf(this);
    meshes.splice(index, 1);

    // detach from material
    meshes = this.style.material.meshes;
    index = meshes.indexOf(this);
    meshes.splice(index, 1);
  }
}
