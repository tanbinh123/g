import type { InteractivePointerEvent, RenderingPlugin, RenderingService } from '@antv/g';
import { ContextService, RenderingPluginContribution } from '@antv/g';
import { inject, singleton } from 'mana-syringe';
/**
 * listen to mouse/touch/pointer events on DOM wrapper, trigger pointer events
 */
@singleton({ contrib: RenderingPluginContribution })
export class MobileInteractionPlugin implements RenderingPlugin {
  static tag = 'MobileInteractionPlugin';

  @inject(ContextService)
  private contextService: ContextService<CanvasRenderingContext2D>;

  apply(renderingService: RenderingService) {
    // 获取小程序上下文
    const canvasEl = this.contextService.getDomElement();

    const onPointerDown = (ev: InteractivePointerEvent) => {
      renderingService.hooks.pointerDown.call(ev);
    };

    const onPointerUp = (ev: InteractivePointerEvent) => {
      renderingService.hooks.pointerUp.call(ev);
    };

    const onPointerMove = (ev: InteractivePointerEvent) => {
      // 触发 G 定义的标准 pointerMove 事件
      renderingService.hooks.pointerMove.call(ev);
    };

    const onPointerOver = (ev: InteractivePointerEvent) => {
      renderingService.hooks.pointerOver.call(ev);
    };

    const onPointerOut = (ev: InteractivePointerEvent) => {
      renderingService.hooks.pointerOut.call(ev);
    };

    renderingService.hooks.init.tap(MobileInteractionPlugin.tag, () => {
      // 基于小程序上下文的事件监听方式，绑定事件监听，可以参考下面基于 DOM 的方式
      canvasEl.addEventListener('touchstart', onPointerDown, true);
      canvasEl.addEventListener('touchend', onPointerUp, true);
      canvasEl.addEventListener('touchmove', onPointerMove, true);

      canvasEl.addEventListener('mousemove', onPointerMove, true);
      canvasEl.addEventListener('mousedown', onPointerDown, true);
      canvasEl.addEventListener('mouseout', onPointerOut, true);
      canvasEl.addEventListener('mouseover', onPointerOver, true);
      canvasEl.addEventListener('mouseup', onPointerUp, true);
    });

    renderingService.hooks.destroy.tap(MobileInteractionPlugin.tag, () => {
      // 基于小程序上下文的事件监听方式，移除事件监听
      canvasEl.removeEventListener('touchstart', onPointerDown, true);
      canvasEl.removeEventListener('touchend', onPointerUp, true);
      canvasEl.removeEventListener('touchmove', onPointerMove, true);

      canvasEl.removeEventListener('mousemove', onPointerMove, true);
      canvasEl.removeEventListener('mousedown', onPointerDown, true);
      canvasEl.removeEventListener('mouseout', onPointerOut, true);
      canvasEl.removeEventListener('mouseover', onPointerOver, true);
      canvasEl.removeEventListener('mouseup', onPointerUp, true);
    });
  }
}
