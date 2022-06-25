import { ResourceHandler } from '../handler/resource/ResourceHandler';
import { TimeHandler } from '../handler/time/TimeHandler';
import { AnimationMixer, Group, Mesh, Scene } from 'three';
import { DebugGUI } from '../debug/DebugGUI';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import GUI from 'lil-gui';
import { AnimationAction } from 'three/src/animation/AnimationAction';
import { IUpdatable } from '../interface/IUpdatable';

class AnimationHolder {
  readonly actions: {
    [animationName: string]: AnimationAction
  } = {};

  constructor(readonly mixer: AnimationMixer,
              readonly current?: AnimationAction) {}

  play(name: string) {
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

export class Fox implements IUpdatable {
  private readonly gltf: GLTF;
  private readonly modelGroup: Group;
  private readonly animationHolder: AnimationHolder;

  private debugFolder: GUI | undefined;

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

  configureModel() {
    this.modelGroup.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.modelGroup);

    this.modelGroup.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
  }

  configureAnimation() {

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

  update() {
    this.animationHolder.mixer.update(this.timeHandler.getDeltaTime() * 0.001);
  }
}
