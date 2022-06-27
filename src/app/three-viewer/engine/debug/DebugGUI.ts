import GUI from 'lil-gui';
import { IDestroyable } from '../interface/IDestroyable';

/**
 * Debug tool panel from lil-gui to tweak the project
 */
export class DebugGUI implements IDestroyable {
  /**
   * lil-gui UI instance
   */
  readonly ui: GUI | undefined;
  /**
   * Status of the GUI based on the URL of the project (add #debug and reload to show the panel)
   * @private
   */
  private readonly active = window.location.hash === '#debug';

  /**
   * Constructor
   */
  constructor() {
    if (this.active) {
      this.ui = new GUI();
    }
  }

  /**
   * Destroys the instance of lil-gui UI
   */
  destroy(): void {
    if (this.active && this.ui) {
      this.ui.destroy();
    }
  }
}
