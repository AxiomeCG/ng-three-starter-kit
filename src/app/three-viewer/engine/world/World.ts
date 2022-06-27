import { IUpdatable } from '../interface/IUpdatable';
import { ResourceLoader } from '../resource/ResourceLoader';
import { Subscription } from 'rxjs';
import { IDestroyable } from '../interface/IDestroyable';
import { sourceList } from '../resource/sources-list';
import { Environment } from './Environment';
import { DebugGUI } from '../debug/DebugGUI';
import { Scene } from 'three';
import { Fox } from './Fox';
import { Floor } from './Floor';
import { IExperienceTime } from '../service/time/IExperienceTime';

/**
 * Holds all the 3D elements that are instantiated in the 3D world.
 */
export class World implements IUpdatable, IDestroyable {
  /**
   * Reference to the resource loader subscription that needs to be destroyed when the World instance is garbage
   * collected.
   * @private
   */
  private readonly subscription: Subscription;
  /**
   * Resource loader that loads the sources described in the corresponding file.
   * @private
   */
  private readonly resourceLoader = new ResourceLoader(sourceList);

  /**
   * Floor that is displayed in the 3D experience.
   * @private
   */
  private floor: Floor | undefined;
  /**
   * Fox that is displayed in the 3D experience.
   * @private
   */
  private fox: Fox | undefined;
  /**
   * Environment instance that handles lights and environment map of the 3D world.
   * @private
   */
  private environment: Environment | undefined;

  /**
   * Constructor
   * @param scene Scene to which add the 3D object present in the world
   * @param debugGUI Panel to tweak the world object.
   */
  constructor(private readonly scene: Scene,
              private readonly debugGUI: DebugGUI) {
    this.subscription = this.resourceLoader.listen()
                            .subscribe(() => {
                              console.log('Resources are ready');
                              this.floor = new Floor(scene, this.resourceLoader);
                              this.fox = new Fox(scene,
                                this.resourceLoader,
                                debugGUI);
                              this.environment = new Environment(scene, this.resourceLoader, debugGUI);
                            });
  }

  /**
   * Updates the element that needs to be updated on each tick.
   * @param experienceTime Bundle of time information about the frame
   */
  update(experienceTime: IExperienceTime): void {
    if (this.fox) {
      this.fox.update(experienceTime);
    }
  }

  /**
   * Destroys the world and dispose of resources to avoid memory leaks and so on.
   */
  destroy(): void {
    this.subscription.unsubscribe();

    this.resourceLoader.destroy();

    this.floor?.destroy();
    this.fox?.destroy();
    this.environment?.destroy();
  }
}
