## Terrian Generation

### Astoroid shape generation:
#### p5.js
- [X] with Perlin noise - p5.noise()
- [ ] closed shapes (vertex at TWO_PI)
  - is the "center" needed as a vertex (Axis of Rotation)?
- [ ] with [openSimplex](https://www.npmjs.com/package/open-simplex-noise) 

### Dust/Gas cloud generation
- [ ] Marching squares / Meta balls (P5.js | Paper.js)   
#### Paper.js
- [ ] Create path
- [ ] path to SVG (state storage)
#### Matter.js
- [ ] populate bodies within path


### Dust Partical generation
#### Paper.js
- sticking / condensing to walls?
  - Body wall path making the normal cloud effect
  - visualy small area with "stuck"
- dust / gas cloud mixtures
  - meta ball with color blending 
#### Matter.js
- partical physics
  - Noncontact avoidence distance
    - Ideal Gas ??
  - Body contacted distance 
    - Per specice properties ??
    - Settling / Condensing
      - static friction
      - mass
     

### Terrian Destruction
#### Matter.js
- [ ] New / Old body tracking
Paper.js
- [ ] New / Old path rendering

