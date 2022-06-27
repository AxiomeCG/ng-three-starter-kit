import { ISize } from '../service/size/ISize';

/**
 * Contract that symbolizes an object that handles resize and needs to be resized on DOM resize event.
 */
export interface IResizable {
  /**
   * Resizes the object with the new size of the viewport, and the new pixel ratio.
   * @param size Information about the new size after resizing. (Width, height and pixel ratio)
   */
  resize(size: ISize): void;
}
