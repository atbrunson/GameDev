# Space Game

## Lore
---
### Factions
---  
#### United Planetary Organization
...  

##### Solar Congress
Terrian Majority w/ Martian Minority
Sparse participation from Jovian / Main Belt
...
#### UN / UNTA (Terrian)
...  
#### Jovian People's Republic
> Indepentent but closly relies on Main Belt Trade
> Birth Place and Waywared home of all belters

#### Main Belt Trade "..." _TBD_
> Independent from but closely allied with the Jovian's
> Ensures the needs of the Main Belt Stations are met as judiciously & equitably as possible
> Defines / Executes Effort based compenstaion labor laws
> Manages / Executes all import / export transportation in Main Belt Space
> ConServ: Standardized Contract Pipline for all 
Accronyms:
- MBTA (EMBEE-TEE-AY)
  - Alliance
  - ~~Advisory~~
  - ~~Association~~
- MBTB (EMBEE-TEEBEE)
  - Board
- MBTC (EMBEE-TEESEE)
  - Coopertive
  - Combine
  - ~~Consolidation~~
  - ~~Committee~~
- MBTE (EMBEE-TEE-EE)
  - Establishment
  - ~~Endowment~~
- MBTO (EMBEE-TEE-OW)
  - Organization
- MBTP (EMBEE-TEEPEE)
  - Panel
  - ~~Partnership~~
- MBTU (EMBEE-TEE-EW)
  - Union

## Game Mechanics

### Ship Systems & Management
- Cargo management
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
#### Heads Up Diplay
Display
- Grid Mass
- Time & Date

Controls
- Time Scale

#### Hand Terminal Interface
Desktop / App Launcher
- Moveable Windows
- Data search / Wiki
- Sticky notes

### Mining System
#### Mining Mechanics
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

#### Claim System
> The Trade Union Establishes and Governs ALL Mining Claims within the Main Belt

ConServ:
- public contract network and pipeline for all Mainbelt Claims & Contracts

Open Reseach / Expoloration Contracts
- Trade Union approved prospecting for new locations of desired materials. 
Estbilshed Mining Claims
  - Submit plans for additional minerals after exploration
    - Small one time deposits <= 1000kg (bulk material) can be approved _ex post facto_
  - Trade Union Rates Application
    - Essential material rates (++) will first be applied to fill open orders for essential materials
    - Standard material rates (+) will then be applied to open orders standard for standard materials
    - Surplus material rates (-) are applied if there are no open material Orders
    - Special rates apply for SSAA research claims (+++) & toll contracts (+-)
    > Volumes and Rates vary wildly on special orders

##### Material Orders
SSAA Research Contracts
> May allow for extentions to volumes on _ex post facto_ deposits for discovered materials during the contract.
- Subject to prenogotiated rates and volumes
  - Typcially small volumes of rare & hard to mine materials at very high rates
Exploration Contracts
- Unexplored, Derelect, and|or forfited claims
   
##### Labor & Equipment Orders
Toll Contracts 
- Inactive Claim Exploration
> Exploring and Prospecting on behalf of Claim Holder before Inactive Status Expires
Collection Contracts
- Recovering loss value from forfited claims
> Minimum value with a small percentage of surplus value reclaimed
- Very High Reputation Needed
- Completion increases Trade Union reputation & increases likleyhood of future Collection Contracts
Legitiment Salvage Contracts

##### Combine Orders
Toll Manufacturing
- Producing Refined Materials to T



##### Mining Site Generation

- Mineral composition determined by rarity
- Metal determined by size & rarity
- Ices by rarity size
- [Shape generation](../02%20TerrianGen/readme.md)  
    ~~- SVG / Path encoding & decoding for state saves~~
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

###### Astroid Classification
> Notes on the taxonomy of actual Astroids

- [Abundance Data](https://en.wikipedia.org/wiki/Abundances_of_the_elements_(data_page)#Sun_and_Solar_System)

  ![Abundace Chart](https://upload.wikimedia.org/wikipedia/commons/6/6a/Elements_abundance-bars.svg)

- [Astroid Belt wiki](https://en.wikipedia.org/wiki/Asteroid_belt#:~:text=The%20absolute%20magnitudes%20of%20most,asteroids%20might%20be%20even%20closer.)
 

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
##### Grid Editor MODE
- edit
  - directly edit inside a stationary grid
- design
  - Load / Save / Share Blueprints
  - 

#### Grid Snap

##### Snap Bodies to Grid in Matter.js

In Matter.js, snapping bodies to a grid or specific positions can enhance gameplay and user interaction. This is particularly useful for drag-and-drop mechanics or aligning objects in a game.

Methods to Snap Bodies
Using Positioning Functions
You can set the position of a body directly using the Matter.Body.setPosition method. This allows you to snap a body to specific coordinates.
Grid Snapping Logic
Implement a grid system by rounding the body's position to the nearest grid point. For example, if using a 16x16 grid, you can calculate the nearest grid position as follows:
javascript

```javascript
function snapToGrid(body) {
    const gridSize = 16;
    const x = Math.round(body.position.x / gridSize) * gridSize;
    const y = Math.round(body.position.y / gridSize) * gridSize;
    Matter.Body.setPosition(body, { x: x, y: y });
}
```
Adjusting Anchor Points
To ensure that bodies snap correctly, you may need to adjust their anchor points. This can be done by modifying the body's properties or using the setCentre method to change the center of mass.

Common Issues
Non-Snapping Bodies: If some bodies do not snap as expected, check their collision settings and ensure they are not overlapping with other bodies.
Anchor Point Misalignment: If the visual representation does not match the physics body, adjust the anchor point or the body's vertices.
By implementing these methods, you can effectively manage how bodies snap to desired positions in your Matter.js projects.

#### Grid Tile Recipes

##### Component & Modual Fabrication Costs / Recipes
> Parts printing by volume 1M 2M
> - moduler printers?
>   - assemble a 1x6M printer for long hull spans
>     - could reduce labor costs and increase reliablity late game
- Hulls
- Bulkheads
- Airlocks & Gates & Doors
- Living / Comfort / Rest Areas
- Phyiscal Storage
- Gas & Liquid Storage
- Fluid Service & Conveying Tubing
  - Player built or automatic

##### Module Recipes

Ship Systems Recipes
  - Navigation
  - Communication
  - Life Support
  - Propulsion

Production Systems Recipes
  - Energy Generation
  - Mining Equipment
  - Material Sizing
    - Forge (convert billet to plate / plate to bar / bar to rod / )
  - Material Transport
  - Material Reactors
  - Material Smelters (prints base components?)
  - Component Printers (prints advanced components) 

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
### Dependancies
> List of libraries included

#### matter.js

#### SVG & CSS

Using native SVG elements as functional UI 
- [pointer-events](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pointer-events)


#### react.js

##### React & Matter

Using React hooks as a wrapper around the matter engine
- [React hooks and matter.js](https://www.paulie.dev/posts/2020/08/react-hooks-and-matter-js/)
- [How to use Matter.js in a React functional component](https://www.fabiofranchino.com/blog/how-to-use-matter-js-in-react-functional-component/) 



### Object Classes

#### Claim Class
Native JS Map as a master level ("claim") object
  ```javascript
  let myClaim = new Map();
  ```
  - will keep objectes ordered by insertion (help with z fighting?)
  - has position and area within World
  - contains all grids within it's bounds
  - Player may exploit resources within it's bounds

#### Grid Class
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
    this.cells = let cells = Array.from({length: rows * cols }, (null, i) => new Cell) // create a null array with length rows * cols

    this.align()
    this.build()
    this.display()
    
  }

  cell(row, col){

    let index = (row * this.rows) + col

    return this.cells[index]
  }

  /**
   * TODO:
   * [ ] if exit build mode
   *  - find boundaries of volumes
   *  - find volume connectors 
   * [ ] Calculate material balance on volumes via connectors
   * [ ] Calculate engergy balance on volumes via radiation & convection (limited by the speed of sound)
   * [ ] Update 
  */
  update(){

  }

}
```

`Grid` Type `STATIC` (eg Station, Berth)

Must be must be in a players `Claim` to generate or expand
> The player may lease or rent a berth in game to use and build upon. Mechanically the *berth* is a static grid within the larger static grid the station is built upon. 

Grid Type `DYNAMIC` (eg Ship)
    
Must be in a static grid to generate or expand
> A player's ship in game would be dynamic grid built within an exsisting static grid. That is the stationary grid must have enough unoccupied area for the intended dynamic grid.

#### Cell Class
> The unit of measure for a Grid
> Placeable  parts constructed on a grid

Cell Physical Properties
- Temp ...used for energy balace
- Pressure ...including partial pressures
- Materials ...vapor, liquid0, liquid1, solid0, solid1 
  - Equation of state determines the phase of each material
  - ...Dusts and Gases treated the same? (dusts heated to combine, gasses cooled to combine)
  - Create detailed [Materials](#materials)

Cell Condidtional Properties
- Members ...type of types of constiuent objects
- Active ...if the cell is editable in game
  - isAcitve() method needed


```javascript
class Cell {
  constructor (myGrid, ...options)
  this.;      // Dimentions in Grid Cells ( 2 x 3 ect.)

  this.pos = Array.from({length: 4}, (v, i) => i)   // Initializes an array with [0, 1, 2, 3]
    // One of the four walls in each position
    // 0: TOP
    // 1: RIGHT
    // 2: BOTTOM
    // 3: LEFT


/**
 * Connector IO's
 * Think through mass balance 
*/
  this.ports = [...{}];     // Connects to matching sockets YELLOW, RED, GREEN, BLUE 
  this.sockets = [...{}];   // Connects to matching ports yellow, red, green, blue


}
myWall = new Comp(myGrid, {0,1}, 3);    //wall with zero height and one width 


```

##### Component Class
> Player READ_ONLY access in game


```javascript
class Component {} //Insulates & Isolates the Enviroment on a Grid

//Component Types
const HULL = symbol("Hull Grid Block")
const BULK = symbol("Bulkhead Grid Block")
const DOOR = symbol("Door Grid lock")
```
##### Module Class
> Player EDIT Access in game
```javascript
class Module {} // functional block 

//Module Types
const OPERATIONAL = symbol("Operational Grid Block") // adds ship or staition systems
const THRUSTER = symbol("Thruster Grid Block") // applys force to a dynamic grid
const PRODUCTION = symbol("Production Grid Block") // makes, moves, converts and/or stores materials
```

Grid Placment Testing:

``` javascrtipt

for (let i = -3 < 4){
  let iCell = myGrid.cell(i)
    for (let p = 0 < 4, p++){
      let iPos = iCell.pos
      if (iPos[p].comp == "Hull" && iPos[1].comp == "Deck")

    }
}
```



#### Player Class
> Controlable Object in the game.

``` javascript
Class Player //Character's Ship
```

> Player -> `Grid` with type `dynamic`??

#### Astroid Class
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

#### Material Class
> Class holds material properties of mixture of chemical spieces

- Details on Material phase calculations & equation of state
  - ..on Material containing mixtures
  - ..on each chemical species
  - ..on partical size
- Details on rendering calculations and shader inputs
  - Each Material will be proceduraly rendered

### Grid Editor
- Drag & Drop
- Component Validation
  - size
  - orintation
Player Interactions
- Move
- Place
- Remove
- Rotate