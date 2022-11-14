import { Injectable, NgZone, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { Consumer } from '../type/Consumer';

/**
 * Service that handles the pointermove event outside of Angular and executes the engine callback
 */
@Injectable({
  providedIn: 'root'
})
export class PointerService implements OnDestroy {


  private unlisten: Function | undefined;

  /**
   * Constructor
   * Listens on the pointermove event and executes the callback of the engine (if set) outside of Angular to prevent
   * Change Detection triggering
   */
  constructor(private readonly ngZone: NgZone, rendererFactory: RendererFactory2) {
    const renderer2 = rendererFactory.createRenderer(null, null);
    this.ngZone.runOutsideAngular(
      () => {
        this.unlisten = renderer2.listen(window, 'pointermove', (pointerEvent) => {
          NgZone.assertNotInAngularZone();
          this.engineConsumer(pointerEvent);
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.unlisten) this.unlisten();
  }

  /**
   * Sets the consumer that will be used by the engine to determine its pointermove behaviour based on event.
   * @param consumer Callback that needs to be executed outside the NgZone to avoid heavy change detection processes.
   */
  setConsumer(consumer: Consumer<PointerEvent>) {
    this.engineConsumer = consumer;
  }

  /**
   * Slot to keep track of the engine consumer to execute out of the NgZone on pointermove
   */
  private engineConsumer: Consumer<PointerEvent> = () => {};
}
