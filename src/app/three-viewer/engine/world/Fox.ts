import { ResourceHandler } from '../handler/resource/ResourceHandler';
import { TimeHandler } from '../handler/time/TimeHandler';
import { AnimationMixer, Group, Mesh, Scene } from 'three';
import { DebugGUI } from '../debug/DebugGUI';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import GUI from 'lil-gui';
import { AnimationAction } from 'three/src/animation/AnimationAction';
import { IUpdatable } from '../interface/IUpdatable';
import { IDestroyable } from '../interface/IDestroyable';

/**
 * Bundle for the animation information
 */
class AnimationHolder {
  /**
   * Dictionary of loaded GLTF animation actions
   */
  readonly actions: {
    [animationName: string]: AnimationAction
  } = {};

  /**
   * Constructor
   * @param mixer Mixer of the animation
   * @param current Initial animation
   */
  constructor(readonly mixer: AnimationMixer,
              readonly current?: AnimationAction) {}

  /**
   * Plays the animation corresponding to the name.
   * @param name Name of the animation action to play. Should exist in the list of available actions.
   */
  play(name: string): void {
    console.log('Play', name);
    const newAction = this.actions[name];
    const oldAction = this.actions['current'];

    console.log(newAction);
    console.log(oldAction);
    newAction.reset();
    newAction.play();
    newAction.crossFadeFrom(oldAction, 1, false);
    this.actions['current'] = newAction;
  }
}

/**
 * Holds the information about the GLTF Fox loaded
 */
export class Fox implements IUpdatable, IDestroyable {
  /**
   * GLTF loader product of the fox
   * @private
   */
  private readonly gltf: GLTF;
  /**
   * Root group of the Fox model
   * @private
   */
  private readonly modelGroup: Group;
  /**
   * Information of the animation for the Fox
   * @private
   */
  private readonly animationHolder: AnimationHolder;
  /**
   * Debug tool to tweak the Fox and change its animations
   * @private
   */
  private readonly debugFolder: GUI | undefined;

  /**
   * Constructor
   * @param scene Scene to add the fox
   * @param resourceHandler Resource handler that loads the GLTF file of the fox
   * @param timeHandler Time handler to update the Fox while playing the animation
   * @param debugGUI Tool to tweak the fox animations
   */
  constructor(private readonly scene: Scene,
              private readonly resourceHandler: ResourceHandler,
              private readonly timeHandler: TimeHandler,
              private readonly debugGUI: DebugGUI) {

    if (this.debugGUI.ui) {
      this.debugFolder = this.debugGUI.ui.addFolder('fox');
    }

    this.gltf = this.resourceHandler.items.get('foxModel') as GLTF;
    this.modelGroup = this.gltf.scene;

    this.animationHolder = new AnimationHolder(
      new AnimationMixer(this.modelGroup)
    );

    this.configureModel();
    this.configureAnimation();
  }

  /**
   * Sets up the Fox in the Scene.
   * Configure the capability of casting shadow for meshes composing the fox.
   */
  configureModel(): void {
    this.modelGroup.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.modelGroup);

    this.modelGroup.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
  }

  /**
   * Sets up the animations of the Fox loaded from the gltf file.
   * Switching between animations is available in the GUI panel.
   */
  configureAnimation(): void {

    this.animationHolder.actions['idle'] = this.animationHolder.mixer.clipAction(this.gltf.animations[0]);
    this.animationHolder.actions['walking'] = this.animationHolder.mixer.clipAction(this.gltf.animations[1]);
    this.animationHolder.actions['running'] = this.animationHolder.mixer.clipAction(this.gltf.animations[2]);

    this.animationHolder.actions['current'] = this.animationHolder.actions['idle'];
    this.animationHolder.actions['current'].play();

    if (this.debugGUI.ui) {
      const debugObject = {
        playIdle: () => {
          this.animationHolder.play('idle');
        },
        playWalking: () => {
          this.animationHolder.play('walking');
        },
        playRunning: () => {
          this.animationHolder.play('running');
        }
      };

      this.debugFolder?.add(debugObject, 'playIdle');
      this.debugFolder?.add(debugObject, 'playWalking');
      this.debugFolder?.add(debugObject, 'playRunning');
    }
  }

  /**
   * Updates the animation mixer to animate the fox on each frame.
   */
  update(): void {
    this.animationHolder.mixer.update(this.timeHandler.getDeltaTime() * 0.001);
  }

  /**
   * Removes the fox from the scene
   */
  destroy(): void {
    this.scene.remove(this.modelGroup);
  }
}
