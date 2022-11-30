import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture
} = tiny;

// Tiles shape object
class Tiles extends Shape {
    constructor(tile_locations=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]) {
        super("position", "normal",);
        this.arrays.position = Vector3.cast(
            [2,-2,-1],[1,-2,-1],[2,-2,1],[1,-2,1],  [1,-2,-1],[0,-2,-1],[1,-2,1],[0,-2,1],  [0,-2,-1],[-1,-2,-1],[0,-2,1],[-1,-2,1],  [-1,-2,-1],[-2,-2,-1],[-1,-2,1],[-2,-2,1], // BOTTOM
            [-2,-2,1],[-2,-2,-1],[-2,-1,1],[-2,-1,-1],  [-2,-1,1],[-2,-1,-1],[-2,0,1],[-2,0,-1],  [-2,0,1],[-2,0,-1],[-2,1,1],[-2,1,-1],  [-2,1,1],[-2,1,-1],[-2,2,1],[-2,2,-1], // LEFT
            [-2,2,-1],[-1,2,-1],[-2,2,1],[-1,2,1],  [-1,2,-1],[0,2,-1],[-1,2,1],[0,2,1],  [0,2,-1],[1,2,-1],[0,2,1],[1,2,1],  [1,2,-1],[2,2,-1],[1,2,1],[2,2,1], // TOP
            [2,1,1],[2,1,-1],[2,2,1],[2,2,-1],  [2,0,1],[2,0,-1],[2,1,1],[2,1,-1],  [2,-1,1],[2,-1,-1],[2,0,1],[2,0,-1],  [2,-2,1],[2,-2,-1],[2,-1,1],[2,-1,-1], // RIGHT
        ); 
        
        this.arrays.normal = Vector3.cast(
            [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0], // BOTTOM
            [1,0,0],[1,0,0],[1,0,0],[1,0,0],  [1,0,0],[1,0,0],[1,0,0],[1,0,0],  [1,0,0],[1,0,0],[1,0,0],[1,0,0],  [1,0,0],[1,0,0],[1,0,0],[1,0,0], // LEFT
            [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0],  [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0],  [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0],  [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0], // TOP
            [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],  [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],  [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],  [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0], // RIGHT
        );

        this.indices.push(0,1,2,1,3,2, 4,5,6,5,7,6, 8,9,10,9,11,10, 12,13,14,13,15,14,
            16,17,18,17,19,18,  20,21,22,21,23,22,  24,25,26,25,27,26,  28,29,30,29,31,30,
            32,33,34,33,35,34,  36,37,38,37,39,38,  40,41,42,41,43,42,  44,45,46,45,47,46,
            48,49,50,49,51,50,  52,53,54,53,55,54,  56,57,58,57,59,58,  60,61,62,61,63,62,)
    }

    setVertices(tile_locations=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]) {
        this.arrays.position = Vector3.cast(
            [2,-2,-1],[1,-2,-1],[2,-2,1],[1,-2,1],  [1,-2,-1],[0,-2,-1],[1,-2,1],[0,-2,1],  [0,-2,-1],[-1,-2,-1],[0,-2,1],[-1,-2,1],  [-1,-2,-1],[-2,-2,-1],[-1,-2,1],[-2,-2,1], // BOTTOM
            [-2,-2,1],[-2,-2,-1],[-2,-1,1],[-2,-1,-1],  [-2,-1,1],[-2,-1,-1],[-2,0,1],[-2,0,-1],  [-2,0,1],[-2,0,-1],[-2,1,1],[-2,1,-1],  [-2,1,1],[-2,1,-1],[-2,2,1],[-2,2,-1], // LEFT
            [-2,2,-1],[-1,2,-1],[-2,2,1],[-1,2,1],  [-1,2,-1],[0,2,-1],[-1,2,1],[0,2,1],  [0,2,-1],[1,2,-1],[0,2,1],[1,2,1],  [1,2,-1],[2,2,-1],[1,2,1],[2,2,1], // TOP
            [2,1,1],[2,1,-1],[2,2,1],[2,2,-1],  [2,0,1],[2,0,-1],[2,1,1],[2,1,-1],  [2,-1,1],[2,-1,-1],[2,0,1],[2,0,-1],  [2,-2,1],[2,-2,-1],[2,-1,1],[2,-1,-1], // RIGHT
        ); 
        
        this.arrays.normal = Vector3.cast(
            [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0], // BOTTOM
            [1,0,0],[1,0,0],[1,0,0],[1,0,0],  [1,0,0],[1,0,0],[1,0,0],[1,0,0],  [1,0,0],[1,0,0],[1,0,0],[1,0,0],  [1,0,0],[1,0,0],[1,0,0],[1,0,0], // LEFT
            [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0],  [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0],  [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0],  [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0], // TOP
            [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],  [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],  [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],  [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0], // RIGHT
        );
        for (let i = 0; i < tile_locations.length; i ++) {
            if (tile_locations[i] == 0) {
                let index = i*4;
                for (let j = 0; j < 4; j++) {
                    this.arrays.position[index] = Vector3.from([0,0,0]);
                    this.arrays.normal[index] = Vector3.from([0,0,0]);
                    index++;
                }
            }
        }
        
    }
}

// Player shape object
class Player extends Shape {
    constructor() {
        super("position", "normal",);
        this.arrays.position = Vector3.cast(
            [-0.125,-0.25,-0.125],[0.125,-0.25,-0.125],[-0.125,-0.25,0.125],[0.125,-0.25,0.125], // BOTTOM
            [0.125,0.25,-0.125],[-0.125,0.25,-0.125],[0.125,0.25,0.125],[-0.125,0.25,0.125], // TOP
            [-0.125,-0.25,-0.125],[-0.125,-0.25,0.125],[-0.125,0.25,-0.125],[-0.125,0.25,0.125], // LEFT
            [0.125,-0.25,0.125],[0.125,-0.25,-0.125],[0.125,0.25,0.125],[0.125,0.25,-0.125], // RIGHT
            [-0.125,-0.25,0.125],[0.125,-0.25,0.125],[-0.125,0.25,0.125],[0.125,0.25,0.125], // FRONT
            [0.125,-0.25,-0.125],[-0.125,-0.25,-0.125],[0.125,0.25,-0.125],[-0.125,0.25,-0.125], // BACK
        ); 
        this.arrays.normal = Vector3.cast(
            [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0], // BOTTOM
            [0,1,0],[0,1,0],[0,1,0],[0,1,0], // TOP
            [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0], // LEFT
            [1,0,0],[1,0,0],[1,0,0],[1,0,0], // RIGHT
            [0,0,1],[0,0,1],[0,0,1],[0,0,1], // FRONT
            [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1], // BACK
        );
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0,1,2,1,3,2,  4,5,6,5,7,6,  8,9,10,9,11,10,  12,13,14,13,15,14,
            16,17,18,17,19,18,  20,21,22,21,23,22,
            );
    }
}

export class RunGame extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        this.shapes = {
            void: new defs.Square(),
            player: new Player(),
            tiles: [], // Array of different tile objects to be added to randomly
        };

        // *** Materials
        this.materials = {
            tile_material: new Material(new defs.Phong_Shader(),
                {ambient: 0.4, diffusivity: 0.4, specularity: 0, color: hex_color("0076ff")}),
            player_material: new Material(new defs.Phong_Shader(),
                {ambient: 0.4, diffusivity: 0.4, specularity: 0, color: hex_color("ffffff")}),
            void_material: new Material(new defs.Textured_Phong(), { // Texture for cube 1 using "nearest neighbor" with max ambient for true colors
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/void.png", "NEAREST") // Void as texture (located in assets)
            }),
        }

        this.tile_creators = []; // Array to store each array of inputs that created a set tile object in this.shapes.tiles of the same index
        this.num_platforms = 16; // Number of platforms (effectively render distance)
        let tile_creator = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        for (let i = 0; i < this.num_platforms; i++) {
            let temp_tile = new Tiles(tile_creator);
            this.shapes.tiles.push(temp_tile);
            this.tile_creators.push(tile_creator);
        }

        this.start = true; // If the game has just started
        this.game_speed = 8; // Speed at which the tiles move toward the player
        this.tile_transforms = []; // Array to store the transforms of each tile object

        let temp_tile_transform; // Temp variable for creating base transforms
        for (let i = 0; i < this.num_platforms; i++) { // For 0 to the number of platforms
            if (i == 0) { // If it is the first iteration (first tile object)
                temp_tile_transform = Mat4.identity().times(Mat4.translation(0,0,5)); // Create the first transform as the identity matrix translated back 5 units
            } else if (i != 0) { // If it is not the first iteration (not first tile object)
                temp_tile_transform = temp_tile_transform.times(Mat4.translation(0,0,-2)); // Make the tile transform the previous tile transform multiplied by a translation 2 units forward
            }
            this.tile_transforms[i] = temp_tile_transform; // Add the tile transform to the array at its respective index
        }

        this.reset_flag = false;
        this.difficulty = 0;
        this.pause = true; // Flag for pausing the game
        this.game_over = false;
        this.t1 = 0; // Time variable used for creating smooth rotations
        this.time = 0;
        this.jt = 0;
        this.player_rotation = 0; // Number of player rotations to make sure the player is rotated the correct way for whichever side it is on
        this.void_rotation = 0;
        this.player_position = 0.0; // Position variable to keep track of if the player has reached either side to rotate the stage
        this.player_height = 0.0;
        this.start_rotation = 0; // If a rotation has been started (player went to far to either side)
        this.movement = vec3(0,0,0); // Vector to store motion from controls for player movement
        this.movement_speed = 5; // Movement speed variable for player strafing
        this.initial_camera_location = Mat4.identity().times(Mat4.translation(0,1,-20)); // Initial camera location (unused unless //TODO)
    }

    make_control_panel() { // Movement controls arrow keys for strafing and up arrow for jump down arrow for start/pause and brackets to increase and decrease the game speed before starting the game
        this.key_triggered_button("Left", ["ArrowLeft"], () => {if (!this.game_over && !this.pause) {
            this.movement[0] = -1}}, undefined, () => {if (!this.game_over && !this.pause) {
                this.movement[0] = 0}});
        this.key_triggered_button("Right", ["ArrowRight"], () => {if (!this.game_over && !this.pause) {
            this.movement[0] = 1}}, undefined, () => {if (!this.game_over && !this.pause) {
                this.movement[0] = 0}});
        this.key_triggered_button("Jump", ["ArrowUp"], () => {if (!this.game_over && !this.pause) {
            this.movement[1] = 1}}, undefined);
        this.key_triggered_button("Start/Pause the game", ["ArrowDown"], () => {if (!this.game_over) {
            this.pause = !this.pause
            this.start = false}}, undefined);
        this.live_string(box => {
            box.textContent = "Score: " + (this.time*(this.game_speed/2)).toFixed(2)
        });
        this.key_triggered_button("Increase Game Speed", ["]"], () => {if (this.start) {this.game_speed += 1}}, undefined);
        this.live_string(box => {
            box.textContent = "Game Speed: " + this.game_speed.toFixed(2)
        });
        this.key_triggered_button("Decrease Game Speed", ["["], () => {if (this.start) {this.game_speed -= 1}}, undefined);
        this.key_triggered_button("Decrease Difficulty" , ["Shift", "ArrowDown"], () => {if (this.start && this.difficulty < 0.5) {
            this.difficulty += 0.01}}, undefined);
        this.live_string(box => {
            box.textContent = "Game Difficulty: " + Number.parseInt((-100*((this.difficulty.valueOf()+0.50))+100).toFixed(3))
        });
        this.key_triggered_button("Increase Difficulty" , ["Shift", "ArrowUp"], () => {if (this.start && this.difficulty > -0.5) {
            this.difficulty -= 0.01}}, undefined);
        this.key_triggered_button("Reset", ["r"], () => {this.reset_flag = true}, undefined);

    }

    reset(context) {
        this.time = 0;
        let temp_tile_transform; // Temp variable for creating base transforms
        for (let i = 0; i < this.num_platforms; i++) { // For 0 to the number of platforms
            if (i == 0) { // If it is the first iteration (first tile object)
                temp_tile_transform = Mat4.identity().times(Mat4.translation(0,0,5)); // Create the first transform as the identity matrix translated back 5 units
            } else if (i != 0) { // If it is not the first iteration (not first tile object)
                temp_tile_transform = temp_tile_transform.times(Mat4.translation(0,0,-2)); // Make the tile transform the previous tile transform multiplied by a translation 2 units forward
            }
            this.tile_transforms[i] = temp_tile_transform; // Add the tile transform to the array at its respective index
        }
        let tile_creator = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        for (let i = 0; i < this.num_platforms; i++) {
            this.tile_creators.shift();
            this.tile_creators.push(tile_creator);
            this.shapes.tiles[i].setVertices(tile_creator);
            this.shapes.tiles[i].copy_onto_graphics_card(context.context)
        }
        this.pause = true; 
        this.game_over = false;
        this.t1 = 0; 
        this.time = 0;
        this.jt = 0;
        this.player_rotation = 0; 
        this.void_rotation = 0;
        this.player_position = 0.0; 
        this.player_height = 0.0;
        this.start_rotation = 0; 
        this.movement = vec3(0,0,0); 
    }

    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            program_state.set_camera(this.initial_camera_location);
        }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);

        const light_position = vec4(0, 0, 0, 1); // Light location at origin to light up the stage
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        program_state.lights = [new Light(light_position, color(1,1,1,1), 1000)];

        // CREATING VARIABLES // 
        let an = Math.PI/2; // Angle of rotation (pi/2 = 90 degrees)
        let cur_rotation = 0; // Keeping track of the current fraction of rotation for smooth rotating
        let rotation_speed = 6; // Rotation speed variable to change how quickly the character rotates when switching sides of the tiles
        let platform_speed = this.game_speed*this.time; // Variable used to translate the tiles at the this.game_speed rate over time
        let border = 1.75; // Variable that determines where the border is of the two sides to accurately decide when to rotate the player


        if (this.reset_flag || this.player_height < -10) {
            this.reset_flag = false;
            this.start = true;
            this.reset(context);
        }

        // PLAYER MOVEMENT //
        if (!this.game_over && !this.pause) {
            if (this.movement[0] != 0) { // If the player is strafing
                this.player_position = this.player_position + (this.movement[0]*dt*this.movement_speed); // The players position becomes its previous position plus the direction of movement times the change in time times a movement constant
            }
            if (this.movement[1] != 0) {
                this.player_height = Math.abs(1.5*Math.sin((this.jt+dt)*4));
                this.jt += dt;
                if (this.jt >= Math.PI/4) {
                    this.player_height = 0;
                    this.movement[1] = 0;
                    this.jt = 0;
                }
            }
        }


        // GAME PAUSING //
        if (!this.pause) {
            this.time += dt;
        }


        // PLAYER ROTATION HANDLING //
        if (!this.game_over) {
            if (this.player_position > border) {
                this.player_position = border;
                this.start_rotation = 1;
            } else if (this.player_position < -1*border) {
                this.player_position = -1*border;
                this.start_rotation = -1;
            }

            if (this.start_rotation == 1) {
                this.t1 = Math.min(1, this.t1+(dt*rotation_speed));
                cur_rotation = this.t1*an;
            } else if (this.start_rotation == -1){
                this.t1 = Math.max(-1, this.t1-(dt*rotation_speed));
                cur_rotation = this.t1*an;
            }

            if (this.t1 == 1) {
                this.player_rotation += 1;
                this.void_rotation += 1;
                this.start_rotation = 0;
                this.t1 = 0;
                if (this.player_height == 0) {
                    this.player_position = -1*border;
                } else if (this.player_height != 0) {
                    this.player_position = (-1*border)+this.player_height;
                    this.player_height = 0;
                    this.movement[1] = 0;
                    this.jt = 0;
                }
            } else if (this.t1 == -1) {
                this.player_rotation -=1;
                this.void_rotation -=1;
                this.start_rotation = 0;
                this.t1 = 0;
                if (this.player_height == 0) {
                    this.player_position = border;
                } else if (this.player_height != 0) {
                    this.player_position = border-this.player_height;
                    this.player_height = 0;
                    this.movement[1] = 0;
                    this.jt = 0;
                }
            }
        }


        // TILE UPDATING AND RANDOMIZING //
        if (!this.game_over) {
            let tester = this.tile_transforms[0].times(Mat4.translation(0,0,platform_speed));
            if (tester[2][3] > 4.875) {
                this.tile_transforms.shift();
                this.tile_transforms.push(this.tile_transforms[this.tile_transforms.length-1].times(Mat4.translation(0,0,-2)));
                let input = [];
                for (let j = 0; j < 16; j++) {
                    input.push(Math.round(Math.random()+this.difficulty));
                }
                this.shapes.tiles[0].setVertices(input);
                this.shapes.tiles[0].copy_onto_graphics_card(context.context);
                this.shapes.tiles.push(this.shapes.tiles.shift());
                this.tile_creators.shift(); 
                this.tile_creators.push(input);
            }
        }


        // COLLISION DETECTION //
        if (this.movement[1] == 0 && this.start_rotation == 0) {
            if (this.player_rotation %4 == 0) {
                if (this.player_position >= 1 && this.tile_creators[2][0] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= 0 && this.player_position < 1 && this.tile_creators[2][1] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= -1 && this.player_position < 0 && this.tile_creators[2][2] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= -1*border && this.player_position < -1 && this.tile_creators[2][3] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                }
            } else if (this.player_rotation %4 == 3 || this.player_rotation %4 == -1) {
                if (this.player_position >= 1 && this.tile_creators[2][4] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= 0 && this.player_position < 1 && this.tile_creators[2][5] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= -1 && this.player_position < 0 && this.tile_creators[2][6] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= -1*border && this.player_position < -1 && this.tile_creators[2][7] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                }
            } else if (this.player_rotation %4 == 2 || this.player_rotation %4 == -2) {
                if (this.player_position >= 1 && this.tile_creators[2][8] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= 0 && this.player_position < 1 && this.tile_creators[2][9] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= -1 && this.player_position < 0 && this.tile_creators[2][10] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= -1*border && this.player_position < -1 && this.tile_creators[2][11] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                }
            } else if (this.player_rotation %4 == 1 || this.player_rotation %4 == -3) {
                if (this.player_position >= 1 && this.tile_creators[2][12] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= 0 && this.player_position < 1 && this.tile_creators[2][13] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= -1 && this.player_position < 0 && this.tile_creators[2][14] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                } else if (this.player_position >= -1*border && this.player_position < -1 && this.tile_creators[2][15] == 0) {
                    this.player_height -= dt*this.game_speed;
                    this.pause = true;
                    this.game_over = true;
                }
            } 
        }


        // PLAYER TRANSFORM // 
        // Depending on the rotation of the player change the players transform matrix
        let player_transform;
        let void_transform;
        if(this.player_rotation %4 == 0) {
            player_transform = Mat4.identity().times(Mat4.translation(this.player_position,-1.75+this.player_height,-0.125).times(Mat4.rotation((this.player_rotation*an)+cur_rotation,0,0,1)));
        } else if(this.player_rotation %4 == 1 || this.player_rotation %4 == -3) {
            player_transform = Mat4.identity().times(Mat4.translation(1.75-this.player_height,this.player_position,-0.125).times(Mat4.rotation((this.player_rotation*an)+cur_rotation,0,0,1)));
        } else if(this.player_rotation %4 == 2 || this.player_rotation %4 == -2) {
            player_transform = Mat4.identity().times(Mat4.translation(-1*this.player_position,1.75-this.player_height,-0.125).times(Mat4.rotation((this.player_rotation*an)+cur_rotation,0,0,1)));
        } else if(this.player_rotation %4 == 3 || this.player_rotation %4 == -1) {
            player_transform = Mat4.identity().times(Mat4.translation(-1.75+this.player_height,-1*this.player_position,-0.125).times(Mat4.rotation((this.player_rotation*an)+cur_rotation,0,0,1)));
        }
        // VOID TRANSFORM //
        void_transform = Mat4.identity().times(Mat4.scale(45,45,1)).times(Mat4.translation(0,0,-1*this.num_platforms*2)).times(Mat4.rotation((this.void_rotation*an)+cur_rotation,0,0,1));


        // SHAPE DRAWING //
        // Void
        this.shapes.void.draw(context, program_state, void_transform, this.materials.void_material);
        // Player
        this.shapes.player.draw(context, program_state, player_transform, this.materials.player_material);
        // All tiles
        for (let i = 0; i < this.shapes.tiles.length; i++) {
            this.shapes.tiles[i].draw(context, program_state, this.tile_transforms[i].times(Mat4.translation(0,0,platform_speed)), this.materials.tile_material);
        }
        

        // CAMERA // 
        // Desired camera transform is the player transform but back 4 and up 1
        let desired = Mat4.inverse(player_transform.times(Mat4.translation(0,1,4)));
        program_state.set_camera(desired);
    }
}

// class Controls extends Scene
