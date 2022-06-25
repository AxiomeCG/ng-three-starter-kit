# ng-three-starter-kit

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

# Techno
- Angular v14
- Threejs (r141)
- @types/three (r141)

# Features
- Boilerplate code to set up the scene, ready to use.
- 3D Assets to test that the template is working for you with the loaders.
    - GLTF Loader: You should see the famous [GLTF Fox](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Fox) on startup
    - Texture Loader: You should see the floor with both color and normal textures. 
    - Cube Texture Loader: You should also see that the environment map is loaded and applied on the scene.
- Architecture of the project in many folders to keep it organized

# Incoming Features
- Jest integration for unit testing (over Karma/Jasmine)
- Draco Compression option handling for the GLTF loader

# Note
You don't need to use the "THREE" namespace in the project as usual.
You can simply put the name of the type you want to use and put the right import.

```typescript
import * as THREE from 'three';

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const mesh = new THREE.Mesh(geometry, material);
//...
```

becomes

```typescript
import { BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three';

const geometry = new BoxBufferGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0xff0000 });

const mesh = new Mesh(geometry, material);
//...
```

It's, in my opinion, a more angular-friendly way of writing our code. 

# Special Thanks
Huge thanks to [Bruno Simon](https://twitter.com/bruno_simon) for all the inspiration and the lessons he provides kindly.

This project is highly inspired by the [Threejs Journey](https://threejs-journey.com/) (Highly recommend it by the way).

I reworked the whole thing, so that it would fit in an Angular 14 project, with Typescript obviously.

# Twitter
You can reach me on Twitter: [@axiom_3d](https://twitter.com/axiom_3d)
