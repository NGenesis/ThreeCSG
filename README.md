# ThreeCSG

**ThreeCSG** provides a javascript implementation of Constructive Solid Geometry (CSG) concepts, optimized for [three.js](https://github.com/mrdoob/three.js) support.


Constructive Solid Geometry (CSG) is a modeling technique that uses Boolean operations like union and intersection to combine 3D solids. This library implements CSG operations on meshes elegantly and concisely using BSP trees, and is meant to serve as an easily understandable implementation of the algorithm. All edge cases involving overlapping coplanar polygons in both solids are correctly handled.

## Notes
Tested against three.js [r83](https://github.com/mrdoob/three.js/releases/tag/r83).

This fork provides support for BufferGeometry, and preserves vertex normal and UV (channel 1) data between operations.

## Author Attribution
* [chandlerprall](https://github.com/chandlerprall) ([ThreeCSG](https://github.com/chandlerprall/ThreeCSG))
* [evanw](https://github.com/evanw) ([csg.js](https://github.com/evanw/csg.js))

## License
* ThreeCSG is provided under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
* csg.js is Copyright (c) 2011 Evan Wallace (http://madebyevan.com/), and provided under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
