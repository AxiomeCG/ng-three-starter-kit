import { IUpdatable } from '../interface/IUpdatable';
import { ResourceHandler } from '../handler/resource/ResourceHandler';
import { Subscription } from 'rxjs';
import { IDestroyable } from '../interface/IDestroyable';
import { sourceList } from '../handler/resource/sources-list';
import { Environment } from './Environment';
import { DebugGUI } from '../debug/DebugGUI';
import { Scene } from 'three';
import { Fox } from './Fox';
import { TimeHandler } from '../handler/time/TimeHandler';
import { Floor } from './Floor';

export class World implements IUpdatable, IDestroyable {
  private readonly subscription: Subscription;
  private readonly resourceHandler = new ResourceHandler(sourceList);

  private floor: Floor | undefined;
  private fox: Fox | undefined;
  private environment: Environment | undefined;

  constructor(private readonly scene: Scene,
              private readonly timeHandler: TimeHandler,
              private readonly debugGUI: DebugGUI) {
    this.subscription = this.resourceHandler.listen()
                            .subscribe(() => {
                              console.log('Resources are ready');
                              this.floor = new Floor(scene, this.resourceHandler);
                              this.fox = new Fox(scene,
                                this.resourceHandler,
                                this.timeHandler,
                                debugGUI);
                              this.environment = new Environment(scene, this.resourceHandler, debugGUI);
                            });
  }

  update(): void {
    if (this.fox) {
      this.fox.update();
    }
  }

  destroy(): void {
    this.subscription.unsubscribe();
  }
}
