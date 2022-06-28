import { Injectable, NgZone } from '@angular/core';
import { Consumer } from '../type/Consumer';

@Injectable({
  providedIn: 'root'
})
export class PointerService {

  /**
   * Constructor
   * Listens on the pointermove event and executes the callback of the engine (if set) outside of Angular to prevent
   * Change Detection triggering
   * @param ngZone
   */
  constructor(private readonly ngZone: NgZone) {
    this.ngZone.runOutsideAngular(
      () => {
        window.addEventListener('pointermove', (pointerEvent) => {
          this.engineConsumer(pointerEvent);
        });
      }
    );
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
