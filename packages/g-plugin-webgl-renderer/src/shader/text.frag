#pragma glslify: import('@antv/g-shader-components/scene.both.glsl')
#pragma glslify: import('@antv/g-shader-components/text.both.glsl')

#pragma glslify: import('@antv/g-shader-components/batch.declaration.frag')

uniform sampler2D u_SDFMap;

#define SDF_PX 8.0

in vec2 v_UV;
in float v_GammaScale;

out vec4 outputColor;

void main() {
  #pragma glslify: import('@antv/g-shader-components/batch.frag')

  float dist = texture(SAMPLER_2D(u_SDFMap), v_UV).a;

  float EDGE_GAMMA = 0.105 / u_DevicePixelRatio;
  float fontScale = u_FontSize / 24.0;
  highp float gamma = EDGE_GAMMA / (fontScale * u_GammaScale);
  lowp vec4 color = u_Color;
  lowp float buff = (256.0 - 64.0) / 256.0;
  float opacity = u_FillOpacity;
  if (u_HasStroke > 0.5 && u_StrokeWidth > 0.0) {
    color = u_StrokeColor;
    gamma = (u_StrokeBlur * 1.19 / SDF_PX + EDGE_GAMMA) / (fontScale * u_GammaScale);
    buff = (6.0 - u_StrokeWidth / fontScale / 2.0) / SDF_PX;
    opacity = u_StrokeOpacity;
  }

  highp float gamma_scaled = gamma * v_GammaScale;
  highp float alpha = smoothstep(buff - gamma_scaled, buff + gamma_scaled, dist);

  opacity *= alpha * u_Opacity;

  if (u_IsPicking > 0.5) {
    outputColor = vec4(v_PickingResult.xyz, 1.0);
  } else {

    if (opacity < 0.001) {
      discard;
    }

    outputColor = color;
    outputColor.a *= opacity;
  }
}