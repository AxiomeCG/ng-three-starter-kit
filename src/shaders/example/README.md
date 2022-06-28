# GLSL Files

Some IDE will not recognize the import so you will need either one of the two following solutions.

## First method

You need to add `//@ts-ignore` above the imports of the GLSL files.

For example :

```typescript
//@ts-ignore
import vertexShader from 'src/shaders/example/vertex.glsl'
```

## Second method

You add a file `glsl.d.ts` in the shader folder with inside:

```typescript
declare module '*.glsl' {
  const value: string
  export default value
}
```
