
A-FRAME + NGL
================

The purpose of this experimental branch is to show proof-of-concept for how the full NGL viewer could be accessed as an [A-Frame](https://aframe.io/docs/0.8.0/introduction/#what-is-a-frame) component.

The composable architecture of A-Frame would allow for molecular structures to be easily mixed with other components in a shared Three.js scene. This design provides much greater flexibility and extensibility to meet custom use cases, without requiring the NGL team to support additional features beyond the scope of the roadmap.

NGL visualizations could be included in A-Frame scenes, enabling these and other use cases:

- Automatic, cross-platform support for 2D browsers as well as virtual reality and augmented reality headsets.
- Loading of in-scene pictures, videos, and 3D models
- Complex scene and background components such as [3D.io](https://3d.io/), allowing full interior design of 3D virtual chemistry labs for educational or aesthetic purpose.
- Consistent VR/AR interactions as controllers, gestures, and speech inputs evolve.
- Networking components for cross-device multi-user collaboration, e.g. [Mozilla Hubs](https://blog.mozvr.com/introducing-hubs-a-new-way-to-get-together-online/)
- Powerful animation system components, simplifying visual explanations 
- Virtual video capture and export, as well as recording of full 3D motion capture with [A-Frame Motion Capture](https://github.com/dmarcos/aframe-motion-capture-components)

Using the "ngl-mol" Component
================

View and Remix on Glitch:
- [Large Molecules](https://a-ngl.glitch.me/) ([code](https://glitch.com/edit/#!/a-ngl))
- [Small Molecules with Image](https://amino-aframe.glitch.me/) ([code](https://glitch.com/edit/#!/amino-aframe))

Notice that the samples above demonstrate the composable nature of A-Frame by deferring interaction logic to the [Orbit Controls](https://www.npmjs.com/package/aframe-orbit-controls) component.

The simplest usage is a single line of HTML, attaching 'ngl-mol' to an \<a-entity> tag within an \<a-scene> with the necessary [browser files](https://github.com/KJStrand/ngl/tree/AFRAME-NGL/dist):

```
<head>
  <title>Simple NGL A-Frame Component Example</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="https://cdn.rawgit.com/KJStrand/ngl/AFRAME-NGL/dist/Aframe_component.js"></script>
  <script src="https://cdn.rawgit.com/KJStrand/ngl/AFRAME-NGL/dist/ngl.dev.js"></script>
</head>

<body>
  <a-scene>
    <a-camera></a-camera>
    <a-entity ngl-mol = "mol_entry: rcsb://1Igt.mmtf;"></a-entity>
  </a-scene>
<body>
```

The 'mol\_entry' can refer directly to entries in the Protein Data Bank, or to file locations for data files such as PDB or MMTF. Structure representation and coloring may be further specified:

```
<a-entity ngl-mol = "mol_entry: rcsb://1Igt.mmtf;
    representation: ribbon;
    color: chainname; "
</a-entity>
```

As an A-Frame entity, it is simple to apply position, rotation, and scale:

```
<a-entity
    ngl-mol = "mol_entry: rcsb://1Igt.mmtf;"
    position = "1 1 1"
    rotation = "0 90 0"
    scale = "0.004 0.004 0.004"
</a-entity>
```

Multiple molecules can be defined, grouped, and transformed in hierarchies:

```
<a-entity scale="0.003 0.003 0.003">
   <a-entity
      ngl-mol = "mol_entry: rcsb://1Igt.mmtf;"
      position = "1 1 0"
   </a-entity>
   <a-entity
      ngl-mol = "mol_entry: rcsb://4TNA.mmtf;"
      position = "-1 1 0"
      rotation = "0 90 0"
   </a-entity>
</a-entity>
```

KNOWN ISSUES
================

The code has not been tested and has breaking changes.
Major known issues:
- Must be set up as a non-embedded A-Frame scene.
- Text and geometries do not always present correctly to the A-Frame camera.
- Shaders including impostor shader are not configured to use the A-Frame camera.
- Trajectory loading does not interface with the A-Frame update loop.
- VR views require more memory, so large geometries do not always load fully.

