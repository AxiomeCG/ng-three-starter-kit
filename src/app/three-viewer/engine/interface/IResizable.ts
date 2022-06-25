import { WindowSize } from '../handler/size/IWindowSize';

export interface IResizable {
  resize(size: WindowSize): void;
}
