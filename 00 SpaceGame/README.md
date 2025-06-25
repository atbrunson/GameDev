# Space Game

## Game Mechanics

### Ship Systems & Management
- cargo management
- Ship Design and Upgrades
  - Vessel Classes
    - ultra light
    - light
    - heavy
    - ultra heavy
- Minimum ship [modules](#component)
  - hull - 0.5m external parameter 
    - small (4x4)
    - medium (10x10)
    - large (14x18)
  - ship control / navigation
  - reactor / thruster ( [detials](#thrust--reactor--drive) )
    - small (3x5) - (3x2 exterior area)
    - medium (5x10) - (5x4 exterior area)
    - large (10x20) - (10x12 exterior area)
  - life support [create](#life-support)
    - air per crew member
    - nutrition per crew member
    - cooling per crew member
- Production Modules (functional)
  - ice melter
  - gas condenser / separator
  - liquid / gas storage

### Thrust | Reactor Systems 
- [Epstien Drive Calculations](https://toughsf.blogspot.com/2019/10/the-expanses-epstein-drive.html)
- Trust to Wieght Ratio (TWR)
- Fuel Types
  - reactor ignition pellets
  - thruster DT Fuel
- Fagnetic Field Visiualizaiton
  - Visualization included with [matter-attractors](https://github.com/liabru/matter-attractors) plugin?
  - [Graph](https://www.geogebra.org/m/up3x66fz)

### Mining System
  - Level Planning
    - Open Reseach Expoloration Contracts
      - Trade Union approved prospecting for SSAA (Solar System Astronomical Assciation)
      - Estbilshed Mining Claims MBTU (Main Belt Trade Union)
        - Submitt plans for additional minerals
        - Small one time deposits <= 100kg (bulk material) can be approved _ex post facto_
          - trade union will apply essential material rates (++) to open orders first
          - standard rates (+) apply after open orders are filled
          - special rates apply for SSAA research claims (+++) & toll contracts (+-)
  - Asteroid class
    - mineral composition determined by rarity
    - 
    - metal determined by size & rarity
    - Ices by rarity size
    - [shape generation](../02%20TerrianGen/readme.md)
      - SVG / Path encoding & decoding for state saves 
    - vertex shader
      - INPUT: rectangle info as line primitives
        - xPos, yPos, w, h
        - top: (xPos,yPos),(xPos + w, yPos)
        - right:(xPos + w, yPos),(xPos + w, yPos + h)
        - bottom: (xPos + w, yPos + h),(xPos, yPos + h)
        - left: (xPos, yPos + h),(xPos, yPos)
    - geometry shader
      - INPUT: bounding box information -> generate astroid from line primitives
      - wrapping algorithm (number of triangles determined how?)
    - Astroid Composition
      - [Abundance Data](https://en.wikipedia.org/wiki/Abundances_of_the_elements_(data_page)#Sun_and_Solar_System)
      ![Abundace Chart](https://upload.wikimedia.org/wikipedia/commons/6/6a/Elements_abundance-bars.svg)
      - [Astroid Belt wiki](https://en.wikipedia.org/wiki/Asteroid_belt#:~:text=The%20absolute%20magnitudes%20of%20most,asteroids%20might%20be%20even%20closer.)
        - mineral composition determined by rarity
        - metal determined by size & rarity
        - Ices by rarity size 
  - Mining Mechanics
    - Background
      - Regolith
        - Crabs // Flys // Swarms move to foreground
      - Rock
        - Drill Crabs process into Regolith
      - Metal / Dense Rock
        - Laser Crabs process into Regolith
      - Rare
        - Crab Carriers remove to ship
    - Foreground
      - Regolith
        - Crew Inventory
      - Rock
        - Crew Inventory
      - Rare
        - Crew Inventory

### Belt Map System
Trip Computer
  - Select Acceleration (set the trip length) -> reactor efficiency (fuel propelled at some % of light) -> calculation of thrust
  - Select Astroid
  - Select Crew
    - Crew Stats
    - O_2_ rate
  - Select Returning Delta Mass
    - Mass and Energy Balances

### Crew System
  - Player Creation (zeroth crew member)
  - Bio-stats
    - Mass
    - VO2max
    - Carry Capacity
    - Gravity tolerance
    - Conributing Factors
      - Origin
      - Gender
      - Age

## Code Architecture
World -> Claim -> Grid

### Object Classes

#### Claim
Native JS Map as a master level ("claim") object
  ```javascript
  let myClaim = new Map();
  ```
  - will keep objectes ordered by insertion (help with z fighting?)
  - has position and area within World
  - contains all grids within it's bounds
  - Player may exploit resources within it's bounds

#### Grid
>Grids allow the player to build ship and stations in game.

```javascript
  Class Grid //Ship, Station, or Berth
```
`Grid` Type `STATIC` (eg Station, Berth)

Must be must be in a players `Claim` to generate or expand
> The player may lease or rent a berth in game to use and build upon. Mechanically the *berth* is a static grid within the larger static grid the station is built upon. 

Grid Type `DYNAMIC` (eg Ship)
    
Must be in a static grid to generate or expand
>A player's ship in game would be dynamic grid built within an exsisting static grid. That is the stationary grid must have enough unoccupied area for the intended dynamic grid.

##### Grid Cell
...The units of Grids
- Temp ...used for energy balace
- Pressure ...including partial pressures
- Materials ...vapor, liquid0, liquid1, solid0, solid1 
  - Equation of state determines the phase of each material
  - ...Dusts and Gases treated the same? (dusts heated to combine, gasses cooled to combine)
  - Create detailed [Materials](#materials)
- Occupancy ...type of block if occupied
- 

##### Grid MODE
- edit
  - directly edit inside a stationary grid
- design
  - Load / Save / Share Blueprints
  - 

#### Grid Blocks
> Group of moveable, connectable parts on the grid

##### Modules & Components
```javascript
Class Module // functional block 
Class Component //strctural block
```
```javascript
Class Structure //Insulates Grid Enviroment
```
Type `HULL` , `BULK` , `DOOR`

```javascript
Class Funtional //(any functional component)
```

- Type `Operational` (adds ship or staition systems)
- Type `Thruster` (moves grid)
- Type `Production` (makes/moves/converts materials)
  
#### Player
> Controlable Object in the game.

``` javascript
Class Player //Character's Ship
```

> Player -> `Grid` with type `dynamic`??

#### Astroid
```javascript
Class Astroid()

Types ``CHONDRITE , STONEY , METALIC``
```
  - embedded Material Classs
    -  Chemical Speices
    -  Generated depth
    -  Rarity
  - ~~shape generation from SVG?~~
  - vertex shader (Rock Textures)
    - Generate astroid texture from mesh data (generate 3d mesh from normal map)
  - fragment shader (Render Mineral Compostion)
    - render color based on material
      - mineral composition determined by rarity
      - metal determined by size & rarity
      - Ices by rarity size
  - ~~embedded Block class~~
- Astroid Composition
  - [Astroid Belt wiki](https://en.wikipedia.org/wiki/Asteroid_belt#:~:text=The%20absolute%20magnitudes%20of%20most,asteroids%20might%20be%20even%20closer.)
- Belt Map
  - Astroid Distribution
  - Trip Computer
    - Select Acceleration (set the trip length) -> reactor efficiency (fuel propelled at some % of light) -> calculation of thrust
    - Select Asteroid
    - Select Crew
      - Crew Stats
        - O_2_ rate
    - Select Returning Delta Mass
- Mass and Energy Balances

### Grid Editor
- Drag & Drop
- Component Validation
  - size
  - orintation

### Materials
- Details on Material phase calculations & equation of state
  - ..on Material containing mixtures
  - ..on each chemical species
  - ..on partical size
- Details on rendering calculations and shader inputs
  - Each Material will be proceduraly rendered