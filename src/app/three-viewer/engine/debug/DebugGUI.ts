import GUI from 'lil-gui';
import { IDestroyable } from '../interface/IDestroyable';

export class DebugGUI implements IDestroyable {
  readonly ui: GUI | undefined;
  private readonly active = window.location.hash === '#debug';

  constructor() {
    if (this.active) {
      this.ui = new GUI();
    }
  }

  destroy(): void {
    if (this.active && this.ui) {
      this.ui.destroy();
    }
  }
}
