# p5.js
[Grid Code Example](https://atbrunson.github.io/p5-js/gameDev/Grid/) | 
[editor](https://github.dev/atbrunson/p5-js/blob/main/gameDev/Grid/sketch.js)

- Astroid Belt Game Ideas
    - Ship Systems Management
        - cargo management
        - reactor ignition pellets
        - thruster DT Fuel
    - Ship Disgn and Upgrades
        - Minimum ship modules
            - hull
                - small (5x5)
                - medium (11x11)
                - large (19x15)
            - ship control / navigation
            - reactor / thruster
                - small (3x5) (- 3x2 hull)
                - medium (5x10) (- 5x4 hull)
                - large (10x20) (- 10x12 hull)
            - life support
                - air per crew member
                - nutrition per crew member
                - cooling per crew member
        - Upgrade modules
            - ice melter
            - gas condenser / separator
            - liquid / gas storage
    -Mining System
        - Asteroid class
            - embeded Block class
            - shape generation from SVG?
            - vertex shader
                - INPUT: rectange info as line primatives
                    - xPos, yPos, w, h
                        - top: (xPos,yPos),(xPos + w, yPos)
                        - right:(xPos + w, yPos),(xPos + w, yPos + h)
                        - bottom: (xPos + w, yPos + h),(xPos, yPos + h)
                        - left: (xPos, yPos + h),(xPos, yPos)
            - geometry shader
                - INPUT: bounding box information -> generate astroid from line primitives
                    - wrapping alogrythm (nubmer of triangles determined how?)
            - compute shader
                - INPUT: astroid object - generate composition
                    - mineral compoision determend by rearity
                    - metal determined by size & rearity
                    - Ices by rearity size
        - Astroid Composition
            - [Astroid Belt wiki](https://en.wikipedia.org/wiki/Asteroid_belt#:~:text=The%20absolute%20magnitudes%20of%20most,asteroids%20might%20be%20even%20closer.)
            - Spacing
            
        - Belt Map
            - Trip Computer
                - Select Acceration (set the trip lenght) -> reactor efficiency (fuel propeled at some % of light) -> calculation of thrust
                - Select Astriod
                - Select Crew
                    - Crew Stats
                        - O_2_ rate
                - Select Returning Delta Mass
        - Mass and ENgergy Balances

##Code Architecture
###Ship Builder
- Global Object Manager Class
    - Grid Class (Ship Build Area)
        - Berth Size (Grid size)
    - Grid Class (Available Component Area)
    - Block Class (Ship components)
    - Player Class (Character's Ship)
    - 
