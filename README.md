# ng-three-starter-kit
 
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=Exomus_ng-three-starter-kit)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Exomus_ng-three-starter-kit&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Exomus_ng-three-starter-kit)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Exomus_ng-three-starter-kit&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Exomus_ng-three-starter-kit)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Exomus_ng-three-starter-kit&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Exomus_ng-three-starter-kit)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Exomus_ng-three-starter-kit&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Exomus_ng-three-starter-kit)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Exomus_ng-three-starter-kit&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Exomus_ng-three-starter-kit)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Exomus_ng-three-starter-kit&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Exomus_ng-three-starter-kit)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Exomus_ng-three-starter-kit&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Exomus_ng-three-starter-kit)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Exomus_ng-three-starter-kit&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Exomus_ng-three-starter-kit)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Exomus_ng-three-starter-kit&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Exomus_ng-three-starter-kit)

# Stack

- Angular v14
- Threejs (r141)
- @types/three (r141)

# Special Thanks

Huge thanks to [Bruno Simon](https://twitter.com/bruno_simon) for all the inspiration and the lessons
he provides kindly.

This project is highly inspired by the [Threejs Journey](https://threejs-journey.com/) (Highly recommend it by the way).

I reworked the whole thing, so that it would fit in an Angular 14 project, with Typescript, obviously.

# Features

- Boilerplate code to set up the Threejs Scene, ready to use.
- 3D Assets to test that the template is working for you with the loaders.
    - GLTF Loader: You should see the
      famous [GLTF Fox](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Fox) on startup (animated)
    - Texture Loader: You should see the floor with both color and normal textures.
    - Cube Texture Loader: You should also see that the environment map is loaded and applied on the scene.
- Architecture of the project in many folders to keep it organized

# Documentation

## Engine

Heart of the viewer.
It orchestrates the instantiation of the core ThreeJS ecosystem's components (scene, renderer, ...).
It is listening to some handlers to communicate the behaviour to follow to its "children".

## Holders

A holder is a class wrapping a ThreeJS instance. It contains the instantiation of the ThreeJS component with the
settings considered for.

### Camera Holder

Holder of the perspective camera chosen for the template. Can be easily switched to other camera types.

### Control Holder

Holder for the OrbitControls chosen for the template. Can be switched to other types. Damping is enabled.

### Renderer Holder

- Physically correct lights enabled
- Output encoding to sRGB
- Reinhard tone mapping ON
- Shadow map (PCF Shadow Map) enabled
- The screen resize and the pixel ratio are handled

## Handlers

A handler takes care of the "Util" part of the viewer.

### ScreenSizeHandler

Util to handle the screen size.
Updates on viewport resizing.
It emits an event that contains the new size and pixel ratio on resize via an Observable.

### TimeHandler

Util to handle the common tick loop.
It emits an empty event that is triggered in each loop via an Observable.

### ResourceHandler

Util to handle GLTF models, textures, and cube textures.
(It is extensible as you wish)
Loads all the content of the `sources-list.ts`.
It uses a Loading manager (different from the default one).

## Interfaces

Useful contracts to process your objects in mass (via a for loop for instance),
depending on the behaviour you want for them.

### IDestroyable

Contract that marks the class that implements it as destroyable (need to dispose of elements (geometries,
material...)). Add your objects in your Engine "destroyableList" and a loop will take care to call each `destroy()`
method when the `ngOnDestroy()` is triggered by the viewer component.

### IListenable

Contract that marks the class that implements it as listenable.
The listen method returns an Observable.
Mostly used for the handler to notify other objects via their EventEmitter.

### IResizable

Contract that marks the class that implements it as resizable.
Add your objects in your Engine "resizableList" and a loop will take care to call each `resize()`
when the SizeHandler notifies the Engine.

### IUpdatable
Contract that marks the class that implements it as updatable.
Add your objects in your Engine "updatableList" and a loop will take care to call each `update()`
when the TimeHandler loop notifies the Engine of a new frame.

## World
Handles the floor, the fox, the environment.

# Incoming Features

- Jest integration for unit testing (over Karma/Jasmine)
- Draco Compression option handling for the GLTF loader
- **Code documentation :') (WIP)**

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

# Twitter

You can reach me on Twitter: [@axiom_3d](https://twitter.com/axiom_3d)
