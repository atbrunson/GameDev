# Space Game


## Astroid Belt Game Ideas

- Ship Systems Management
- cargo management

- Ship Design and Upgrades
  - classes
    - ultra light
    - light
    - heavy
    - ultra heavy
- Minimum ship modules
  - hull - 0.5m external parameter 
    - small (4x4)
    - medium (10x10)
    - large (14x18)
  - ship control / navigation
  - reactor / thruster
    - small (3x5) - (3x2 exterior area)
    - medium (5x10) - (5x4 exterior area)
    - large (10x20) - (10x12 exterior area)
  - life support
  - air per crew member
  - nutrition per crew member
  - cooling per crew member
- Upgrade modules
  - ice melter
  - gas condenser / separator
  - liquid / gas storage
- Mining System
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
  - Mechanics
    - Background
      - Regolith
        - Crabs // Flys // Swarms move to foreground
      - Rock
        - Drill Crabs process into Regolith
      - Metal / Dense Rock
        - Laser Crabs process into Regolith
      - Rears
        - Crab Carriers remove to ship
    - Foreground
      - Regolith
        - Crew Inventory
      - Rock
        - Crew Inventory
      - Rear
      - Crew Inventory
    - 
- Belt Map
  - Trip Computer
    - Select Acceleration (set the trip length) -> reactor efficiency (fuel propelled at some % of light) -> calculation of thrust
    - Select Astroid
    - Select Crew
      - Crew Stats
      - O_2_ rate
    - Select Returning Delta Mass
      - Mass and Energy Balances

- Crew System
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
## Thrust | Reactor | Drive
  - [Epstien Drive Calculations](https://toughsf.blogspot.com/2019/10/the-expanses-epstein-drive.html)
  - Trust to Wieght Ratio (TWR)
  - Fuel Types
    - reactor ignition pellets
    - thruster DT Fuel

## Code Architecture

### Ship Builder
- Native Map as a master level ("claim") object
  ```javascript
  myClaim = new Map();

  ```
  - stores all Asteroid object data,
  - will keep objectes ordered by insertion
- Global Object Manager Class
  - Grid Class (Ship Build Area)
    - Berth Size (Grid size)
  - Grid Class (Available Component Area)
  - Block Class (Ship components)
  - Player Class (Character's Ship)
  -
  - Asteroid class (new Map)
    - Types: CHONDRITE , STONEY , METALIC
    - embedded Block class
    - embedded Material Class
      -  Chemical Speices
      -  Generated depth
      -  Rarity
      -  
    - shape generation from SVG?
    - vertex shader
      - INPUT: rectangle info as line primitives
        - xPos, yPos, w, h
          - top: (xPos,yPos),(xPos + w, yPos)
          - right:(xPos + w, yPos),(xPos + w, yPos + h)
          - bottom: (xPos + w, yPos + h),(xPos, yPos + h)
          - left: (xPos, yPos + h),(xPos, yPos)
    - vertex shader (Rock Textures)
      - Generate astroid texture from mesh data (generate 3d mesh from normal map)
    - fragment shader (Render Mineral Compostion)
      - render color based on material
        - mineral composition determined by rarity
        - metal determined by size & rarity
        - Ices by rarity size
  - Astroid Composition
    - [Astroid Belt wiki](https://en.wikipedia.org/wiki/Asteroid_belt#:~:text=The%20absolute%20magnitudes%20of%20most,asteroids%20might%20be%20even%20closer.)
    - Spacing
  - Belt Map
    - Trip Computer
      - Select Acceleration (set the trip length) -> reactor efficiency (fuel propelled at some % of light) -> calculation of thrust
      - Select Asteroid
      - Select Crew
        - Crew Stats
          - O_2_ rate
      - Select Returning Delta Mass
  - Mass and Energy Balances
