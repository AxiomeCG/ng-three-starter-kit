import GUI from 'lil-gui';

/**
 * Debug tool panel from lil-gui to tweak the project
 */
export class DebugGUI {
  /**
   * lil-gui UI singleton instance
   */
  private static instance: GUI | undefined;

  /**
   * Instantiates the UI if none is found, and returns it.
   * @returns A singleton instance of the lil-gui library
   */
  static getUI(): GUI | undefined {
    if (window.location.hash !== '#debug') {
      return undefined;
    }
    if (!DebugGUI.instance) {
      DebugGUI.instance = new GUI();
    }
    return DebugGUI.instance;
  }

  /**
   * Gives the state of the DebugGUI, which is by default, accessible only if in the URL of the application there is
   * "#debug"
   * @returns true if the DebugGUI is active, else false
   */
  static isActive(): boolean {
    return !!this.instance && window.location.hash !== '#debug';
  }

  /**
   * Destroys the instance of lil-gui UI
   */
  static destroy(): void {
    if (this.instance) {
      this.instance.destroy();
    }
  }
}
