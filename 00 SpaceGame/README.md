# Space Game
## Lore
### Factions
United Planetary Organization / Solar Congress (Terrian Control) 
UN / NATO (Terrian)


Jovian People's Republic
Main Belt Trade:
- MBTC
  - Coopertive
  - Consolidation
- MBTO
  - Organization
- MBTA
  - Alliance 
  - Association
- MBTP
  - Partnership

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
  - reactor / thruster ( [detials](#thruster) )
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

#### Thruster
[Epstien Drive Calculations](https://toughsf.blogspot.com/2019/10/the-expanses-epstein-drive.html)
- Trust to Wieght Ratio (TWR)
- Propelent Type
  - Steam
  - Pressure Regulation Gas
  - Production Offgas

#### Reactor
Fuel Types
  - reactor ignition pellets
  - thruster DT Fuel

Magnetic Field Visiualizaiton
  - Visualization included with [matter-attractors](https://github.com/liabru/matter-attractors) plugin?
  - [Graph](https://www.geogebra.org/m/up3x66fz)

### Menu System

#### Data Pad
Desktop / App Launcher
- Moveable Windows
- Data search / Wiki
- Sticky notes 

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

### Crafting System

#### Grid Tile Recipes

##### Component Recipes
> Player "READ ONLY" tiles in game
- Hulls
- Bulkheads
- Airlock Gates & Doors
- Living / Comfort / Rest Areas
- Phyiscal Storage

##### Module Recipes

Ship Systems Recipes
  - Navigation
  - Communication
  - Life Support
  - Propulsion

Production Systems Recipes
  - Energy Generation
  - Mining Equipment
  - Material Transport
  - Material Reactors
  - Material Smelters
  - 

### Materials & Resource System

#### Material Production Modes

##### Catalytic Reaction
> Available mid game with basic energy capture/production methods

Methane Reforming
Haber Process / Ammonia Production

##### Direct Fusion Synthesis
> Available late game after ending energy scarsity 


## Code Architecture
World -> Claim -> Grid -> Subgrid

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
class Grid {
  constructor(rows = 2, cols = 2, w = width, h = height, mode = "TOP_LEFT") {

    this.boarder = true;
    this.lines = true;
    this.stroke = 0;
    this.strokeWeight = 1;
    this.xOffset = 0;
    this.yOffset = 0;

    this.w = constrain(w, 4, width - this.xOffset - 2 * this.strokeWeight);
    this.h = constrain(h, 4, height - this.yOffset - 2 * this.strokeWeight);

    this.rows = rows;

    this.cols = cols;

    this.mode = mode // Grid alignment property
    this.size = constrain(this.h / this.rows, 2)
    this.cells = [] // create empty cells array

    this.align()
    this.build()
    this.display()
```

`Grid` Type `STATIC` (eg Station, Berth)

Must be must be in a players `Claim` to generate or expand
> The player may lease or rent a berth in game to use and build upon. Mechanically the *berth* is a static grid within the larger static grid the station is built upon. 

Grid Type `DYNAMIC` (eg Ship)
    
Must be in a static grid to generate or expand
> A player's ship in game would be dynamic grid built within an exsisting static grid. That is the stationary grid must have enough unoccupied area for the intended dynamic grid.

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

##### Grid Editor MODE
- edit
  - directly edit inside a stationary grid
- design
  - Load / Save / Share Blueprints
  - 

#### Grid Tiles
> Moveable, connectable parts constructed on a grid

```javascript
class Tile {
  constructor (myGrid, )
  this.size = myGrid.unit
  this.ports = [...{}] // Connects to matching sockets YELLOW, RED, GREEN, BLUE 
  this.sockets = [...{}] // Connects to matching ports yellow, red, green, blue
}
myPart.size = myGrid.unit // Must have dimentions in grid units ( 2 x 3 ect.)

```
Player Interactions
- Move
- Place
- Remove
- Rotate


##### Modules
> Player EDIT Access in game
```javascript
class Module {} // functional block 

//Module Types
const OPERATIONAL = symbol("Operational Grid Block") // adds ship or staition systems
const THRUSTER = symbol("Thruster Grid Block") // applys force to a dynamic grid
const PRODUCTION = symbol("Production Grid Block") // makes, moves, converts and/or stores materials
```


 ##### Components
 > Player READ_ONLY access in game
```javascript
class Component {} //Insulates & Isolates the Enviroment on a Grid

//Component Types
const HULL = symbol("Hull Grid Block")
const BULK = symbol("Bulkhead Grid Block")
const DOOR = symbol("Door Grid lock")
```

  
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