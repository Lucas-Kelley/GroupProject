import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

class Tiles extends Shape {
    constructor(tile_locations=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]) {
        super("position", "normal",);
        this.arrays.position = Vector3.cast(
            [1,2,-1],[2,2,-1],[1,2,1],[2,2,1],  [0,2,-1],[1,2,-1],[0,2,1],[1,2,1],  [-1,2,-1],[0,2,-1],[-1,2,1],[0,2,1], [-2,2,-1],[-1,2,-1],[-2,2,1],[-1,2,1], // TOP
            [2,-2,-1],[1,-2,-1],[2,-2,1],[1,-2,1],  [1,-2,-1],[0,-2,-1],[1,-2,1],[0,-2,1],  [0,-2,-1],[-1,-2,-1],[0,-2,1],[-1,-2,1],  [-1,-2,-1],[-2,-2,-1],[-1,-2,1],[-2,-2,1], // BOTTOM
            [-2,-2,1],[-2,-2,-1],[-2,-1,1],[-2,-1,-1],  [-2,-1,1],[-2,-1,-1],[-2,0,1],[-2,0,-1],  [-2,0,1],[-2,0,-1],[-2,1,1],[-2,1,-1],  [-2,1,1],[-2,1,-1],[-2,2,1],[-2,2,-1], // LEFT
            [2,-2,1],[2,-2,-1],[2,-1,1],[2,-1,-1],  [2,-1,1],[2,-1,-1],[2,0,1],[2,0,-1],  [2,0,1],[2,0,-1],[2,1,1],[2,1,-1],  [2,1,1],[2,1,-1],[2,2,1],[2,2,-1], // RIGHT
        ); 
        this.arrays.normal = Vector3.cast(
            [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0],  [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0],  [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0],  [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0], // TOP
            [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0], // BOTTOM
            [1,0,0],[1,0,0],[1,0,0],[1,0,0],  [1,0,0],[1,0,0],[1,0,0],[1,0,0],  [1,0,0],[1,0,0],[1,0,0],[1,0,0],  [1,0,0],[1,0,0],[1,0,0],[1,0,0], // LEFT
            [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],  [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],  [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],  [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0], // RIGHT
        );

        let indexes = [[0,1,2,1,3,2], [4,5,6,5,7,6], [8,9,10,9,11,10], [12,13,14,13,15,14],
        [16,17,18,17,19,18],  [20,21,22,21,23,22],  [24,25,26,25,27,26],  [28,29,30,29,31,30],
        [32,33,34,33,35,34],  [36,37,38,37,39,38],  [40,41,42,41,43,42],  [44,45,46,45,47,46],
        [48,49,50,49,51,50],  [52,53,54,53,55,54],  [56,57,58,57,59,58],  [60,61,62,61,63,62],
        ];

        for (let i = 0; i < tile_locations.length; i++) {
            if (tile_locations[i] == 1) {
                for (let j = 0; j < 6; j++) {
                    this.indices.push(indexes[i][j]);
                }
            }
        }
    }
}

class Tile_Base extends Shape {
    constructor(tile_locations=[1,1,1,1]) {
        super("position", "normal",);
        this.arrays.position = Vector3.cast(
            [2,-2,-1],[1,-2,-1],[2,-2,1],[1,-2,1],  [1,-2,-1],[0,-2,-1],[1,-2,1],[0,-2,1],  [0,-2,-1],[-1,-2,-1],[0,-2,1],[-1,-2,1],  [-1,-2,-1],[-2,-2,-1],[-1,-2,1],[-2,-2,1],
        );
        this.arrays.normal = Vector3.cast(
            [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0],  [0,1,0],[0,1,0],[0,1,0],[0,1,0],
        );
        
        let indexes = [[0,1,2,1,3,2], [4,5,6,5,7,6], [8,9,10,9,11,10], [12,13,14,13,15,14]];

        for (let i = 0; i < tile_locations.length; i++) {
            if (tile_locations[i] == 1) {
                for (let j = 0; j < 6; j++) {
                    this.indices.push(indexes[i][j]);
                }
            }
        }
    }
}

class Player extends Shape {
    constructor(hole_locations=0) {
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

export class Assignment3 extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        let arr = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

        this.shapes = {
            tile: new defs.Square(),
            player: new Player(),
            tiles: new Tiles(arr),
            tiles1: [], // Array of different tile objects to be added to randomly
        };

        // *** Materials
        this.materials = {
            tile_material: new Material(new defs.Phong_Shader(),
                {ambient: 0.4, diffusivity: 0.4, specularity: 0, color: hex_color("0076ff")}),
            player_material: new Material(new defs.Phong_Shader(),
                {ambient: 0.4, diffusivity: 0.4, specularity: 0, color: hex_color("ffffff")}),
            void_material: new Material(new defs.Phong_Shader(),
                {ambient: 1, diffusivity: 1, specularity: 1, color: hex_color("000000")}),
        }

        this.start = new Boolean(true); // If the game has just started
        this.game_speed = 10; // Speed at which the tiles move toward the player
        this.num_platforms = 24; // Number of platforms (effectively render distance)
        this.tile_transforms = []; // Array to store the transforms of each tile object
        this.tile_creators = []; // Array to store each array of inputs that created a set tile object in this.shapes.tiles1 of the same index

        let temp; // Temp variable for creating base transforms
        for (let i = 0; i < this.num_platforms; i++) { // For 0 to the number of platforms
            if (i == 0) { // If it is the first iteration (first tile object)
                temp = Mat4.identity().times(Mat4.translation(0,0,5)); // Create the first transform as the identity matrix translated back 5 units
            } else if (i != 0) { // If it is not the first iteration (not first tile object)
                temp = temp.times(Mat4.translation(0,0,-2)); // Make the tile transform the previous tile transform multiplied by a translation 2 units forward
            }
            this.tile_transforms[i] = temp; // Add the tile transform to the array at its respective index
        }

        this.pause = new Boolean(false); // Flag for pausing the game
        this.t1 = 0; // Time variable used for creating smooth rotations
        this.player_rotation = 0; // Number of player rotations to make sure the player is rotated the correct way for whichever side it is on
        this.player_position = 0.0; // Position variable to keep track of if the player has reached either side to rotate the stage
        this.player_height = 0.0;
        this.start_rotation = 0; // If a rotation has been started (player went to far to either side)
        this.movement = vec3(0,0,0); // Vector to store motion from controls for player movement
        this.movement_speed = 5; // Movement speed variable for player strafing
        this.initial_camera_location = Mat4.identity().times(Mat4.translation(0,1,-20)); // Initial camera location (unused unless //TODO)
    }

    make_control_panel() { // Movement controls arrow keys for strafing and up arrow for jump down arrow for pause
        this.key_triggered_button("Left", ["ArrowLeft"], () => {this.movement[0] = -1}, undefined, () => this.movement[0] = 0);
        this.key_triggered_button("Right", ["ArrowRight"], () => {this.movement[0] = 1}, undefined, () => this.movement[0] = 0);
        this.key_triggered_button("Jump", ["ArrowUp"], () => {this.movement[1] = 1}, undefined, );
        this.key_triggered_button("Pause", ["ArrowDown"], () => {this.pause = this.pause*-1}, undefined);
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

        if (this.start) { // If the game has just started
            for (let i = 0; i < this.num_platforms; i++) { // For 0 to the number of platforms
                let input = []; // Temp array to store values then be passed through to the Tiles() shape function
                for (let j = 0; j < 16; j++) { // For 0 to 16
                    input.push(Math.round(Math.random())); // Generate a random int from 0 to 1 (not float) because the Tiles shape takes an array of 16 1's or 0's as input 
                }
                let temp = new Tiles(input); // Create a new Tiles shape with the input and store it as temp
                this.shapes.tiles1.push(temp); // Push temp to the tiles1 shape array
                this.tile_creators.push(input); // Push the array of 1's and 0's to the tile_creators array to be used for collision detection
            }
            this.start = Boolean(false); // Make it so start is false and this was only executed once
        }

        this.shapes.tile.draw(context, program_state, Mat4.identity().times(Mat4.scale(45,45,1)).times(Mat4.translation(0,0,-1*this.num_platforms*2)), this.materials.void_material.override({color: color(1,1,0,1)}));

        let an = Math.PI/2; // Angle of rotation (pi/2 = 90 degrees)
        let cur_rotation = 0; // Keeping track of the current fraction of rotation for smooth rotating
        let rotation_speed = 6; // Rotation speed variable to change how quickly the character rotates when switching sides of the tiles
        let platform_speed = this.game_speed*t; // Variable used to translate the tiles at the this.game_speed rate over time
        let border = 1.75; // Variable that determines where the border is of the two sides to accurately decide when to rotate the player

        if (this.movement[0] != 0) { // If the player is strafing
            this.player_position = this.player_position + (this.movement[0]*dt*this.movement_speed); // The players position becomes its previous position plus the direction of movement times the change in time times a movement constant
        }
        if (this.movement[1] != 0) {
            this.player_height = Math.min(this.player_height+dt*4, 1.5);
            if (this.player_height == 1.5) {
                this.movement[1] = 0;
            }
        } else if (this.movement[1] == 0) {
            if (this.player_height != 0) {
                this.player_height = Math.max(0, this.player_height-dt*4);
            }
        }

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
            this.start_rotation = 0;
            this.t1 = 0;
            if (this.player_height == 0) {
                this.player_position = -1*border;
            } else if (this.player_height != 0) {
                this.player_position = (-1*border)+this.player_height;
                this.player_height = 0;
            }
        } else if (this.t1 == -1) {
            this.player_rotation -=1;
            this.start_rotation = 0;
            this.t1 = 0;
            if (this.player_height == 0) {
                this.player_position = border;
            } else if (this.player_height != 0) {
                this.player_position = border-this.player_height;
                this.player_height = 0;
            }
        }

        if (t%(2/this.game_speed) >= (2/this.game_speed)-dt) {
            this.tile_transforms.shift();
            this.tile_transforms.push(this.tile_transforms[this.tile_transforms.length-1].times(Mat4.translation(0,0,-2)));
            this.shapes.tiles1.shift();
            this.tile_creators.shift();
            let input = [];
            for (let j = 0; j < 16; j++) {
                input.push(Math.round(Math.random()));
            }
            let temp = new Tiles(input);
            this.shapes.tiles1.push(temp);
            this.tile_creators.push(input);
        }

        for (let i = 0; i < this.num_platforms; i++) {
            // if (platform_speed > 2) {
            // }
            this.shapes.tiles1[i].draw(context, program_state, this.tile_transforms[i].times(Mat4.translation(0,0,platform_speed)), this.materials.tile_material);
        }

        let player_transform;
        if(this.player_rotation %4 == 0) {
            player_transform = Mat4.identity().times(Mat4.translation(this.player_position,-1.75+this.player_height,0).times(Mat4.rotation((this.player_rotation*an)+cur_rotation,0,0,1)));
        } else if(this.player_rotation %4 == 1 || this.player_rotation %4 == -3) {
            player_transform = Mat4.identity().times(Mat4.translation(1.75-this.player_height,this.player_position,0).times(Mat4.rotation((this.player_rotation*an)+cur_rotation,0,0,1)));
        } else if(this.player_rotation %4 == 2 || this.player_rotation %4 == -2) {
            player_transform = Mat4.identity().times(Mat4.translation(-1*this.player_position,1.75-this.player_height,0).times(Mat4.rotation((this.player_rotation*an)+cur_rotation,0,0,1)));
        } else if(this.player_rotation %4 == 3 || this.player_rotation %4 == -1) {
            player_transform = Mat4.identity().times(Mat4.translation(-1.75+this.player_height,-1*this.player_position,0).times(Mat4.rotation((this.player_rotation*an)+cur_rotation,0,0,1)));
        }
        this.shapes.player.draw(context, program_state, player_transform, this.materials.player_material);

        let desired = Mat4.inverse(player_transform.times(Mat4.translation(0,1,4)));
        program_state.set_camera(desired);
    }
}

class Gouraud_Shader extends Shader {
    // This is a Shader using Phong_Shader as template
    // TODO: Modify the glsl coder here to create a Gouraud Shader (Planet 2)

    constructor(num_lights = 2) {
        super();
        this.num_lights = num_lights;
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return ` 
        precision mediump float;
        const int N_LIGHTS = ` + this.num_lights + `;
        uniform float ambient, diffusivity, specularity, smoothness;
        uniform vec4 light_positions_or_vectors[N_LIGHTS], light_colors[N_LIGHTS];
        uniform float light_attenuation_factors[N_LIGHTS];
        uniform vec4 shape_color;
        uniform vec3 squared_scale, camera_center;

        // Specifier "varying" means a variable's final value will be passed from the vertex shader
        // on to the next phase (fragment shader), then interpolated per-fragment, weighted by the
        // pixel fragment's proximity to each of the 3 vertices (barycentric interpolation).
        varying vec3 N, vertex_worldspace;
        varying vec3 vcolor;

        // ***** PHONG SHADING HAPPENS HERE: *****                                       
        vec3 phong_model_lights( vec3 N, vec3 vertex_worldspace ){                                        
            // phong_model_lights():  Add up the lights' contributions.
            vec3 E = normalize( camera_center - vertex_worldspace );
            vec3 result = vec3( 0.0 );
            for(int i = 0; i < N_LIGHTS; i++){
                // Lights store homogeneous coords - either a position or vector.  If w is 0, the 
                // light will appear directional (uniform direction from all points), and we 
                // simply obtain a vector towards the light by directly using the stored value.
                // Otherwise if w is 1 it will appear as a point light -- compute the vector to 
                // the point light's location from the current surface point.  In either case, 
                // fade (attenuate) the light as the vector needed to reach it gets longer.  
                vec3 surface_to_light_vector = light_positions_or_vectors[i].xyz - 
                                               light_positions_or_vectors[i].w * vertex_worldspace;                                             
                float distance_to_light = length( surface_to_light_vector );

                vec3 L = normalize( surface_to_light_vector );
                vec3 H = normalize( L + E );
                // Compute the diffuse and specular components from the Phong
                // Reflection Model, using Blinn's "halfway vector" method:
                float diffuse  =      max( dot( N, L ), 0.0 );
                float specular = pow( max( dot( N, H ), 0.0 ), smoothness );
                float attenuation = 1.0 / (1.0 + light_attenuation_factors[i] * distance_to_light * distance_to_light );
                
                vec3 light_contribution = shape_color.xyz * light_colors[i].xyz * diffusivity * diffuse
                                                          + light_colors[i].xyz * specularity * specular;
                result += attenuation * light_contribution;
            }
            return result;
        } `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        return this.shared_glsl_code() + `
            attribute vec3 position, normal;                            
            // Position is expressed in object coordinates.
            
            uniform mat4 model_transform;
            uniform mat4 projection_camera_model_transform;
    
            void main(){                                                                   
                // The vertex's final resting place (in NDCS):
                gl_Position = projection_camera_model_transform * vec4( position, 1.0 );
                // The final normal vector in screen space.
                N = normalize( mat3( model_transform ) * normal / squared_scale);
                vertex_worldspace = ( model_transform * vec4( position, 1.0 ) ).xyz;
                vcolor = shape_color.xyz * ambient;
                vcolor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
            } `;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // A fragment is a pixel that's overlapped by the current triangle.
        // Fragments affect the final image or get discarded due to depth.
        return this.shared_glsl_code() + `
            void main(){                                                           
                // Compute an initial (ambient) color:
                gl_FragColor = vec4( vcolor, shape_color.w );
                // Compute the final color with contributions from lights:
                // gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
            } `;
    }

    send_material(gl, gpu, material) {
        // send_material(): Send the desired shape-wide material qualities to the
        // graphics card, where they will tweak the Phong lighting formula.
        gl.uniform4fv(gpu.shape_color, material.color);
        gl.uniform1f(gpu.ambient, material.ambient);
        gl.uniform1f(gpu.diffusivity, material.diffusivity);
        gl.uniform1f(gpu.specularity, material.specularity);
        gl.uniform1f(gpu.smoothness, material.smoothness);
    }

    send_gpu_state(gl, gpu, gpu_state, model_transform) {
        // send_gpu_state():  Send the state of our whole drawing context to the GPU.
        const O = vec4(0, 0, 0, 1), camera_center = gpu_state.camera_transform.times(O).to3();
        gl.uniform3fv(gpu.camera_center, camera_center);
        // Use the squared scale trick from "Eric's blog" instead of inverse transpose matrix:
        const squared_scale = model_transform.reduce(
            (acc, r) => {
                return acc.plus(vec4(...r).times_pairwise(r))
            }, vec4(0, 0, 0, 0)).to3();
        gl.uniform3fv(gpu.squared_scale, squared_scale);
        // Send the current matrices to the shader.  Go ahead and pre-compute
        // the products we'll need of the of the three special matrices and just
        // cache and send those.  They will be the same throughout this draw
        // call, and thus across each instance of the vertex shader.
        // Transpose them since the GPU expects matrices as column-major arrays.
        const PCM = gpu_state.projection_transform.times(gpu_state.camera_inverse).times(model_transform);
        gl.uniformMatrix4fv(gpu.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        gl.uniformMatrix4fv(gpu.projection_camera_model_transform, false, Matrix.flatten_2D_to_1D(PCM.transposed()));

        // Omitting lights will show only the material color, scaled by the ambient term:
        if (!gpu_state.lights.length)
            return;

        const light_positions_flattened = [], light_colors_flattened = [];
        for (let i = 0; i < 4 * gpu_state.lights.length; i++) {
            light_positions_flattened.push(gpu_state.lights[Math.floor(i / 4)].position[i % 4]);
            light_colors_flattened.push(gpu_state.lights[Math.floor(i / 4)].color[i % 4]);
        }
        gl.uniform4fv(gpu.light_positions_or_vectors, light_positions_flattened);
        gl.uniform4fv(gpu.light_colors, light_colors_flattened);
        gl.uniform1fv(gpu.light_attenuation_factors, gpu_state.lights.map(l => l.attenuation));
    }

    update_GPU(context, gpu_addresses, gpu_state, model_transform, material) {
        // update_GPU(): Define how to synchronize our JavaScript's variables to the GPU's.  This is where the shader
        // recieves ALL of its inputs.  Every value the GPU wants is divided into two categories:  Values that belong
        // to individual objects being drawn (which we call "Material") and values belonging to the whole scene or
        // program (which we call the "Program_State").  Send both a material and a program state to the shaders
        // within this function, one data field at a time, to fully initialize the shader for a draw.

        // Fill in any missing fields in the Material object with custom defaults for this shader:
        const defaults = {color: color(0, 0, 0, 1), ambient: 0, diffusivity: 1, specularity: 1, smoothness: 40};
        material = Object.assign({}, defaults, material);

        this.send_material(context, gpu_addresses, material);
        this.send_gpu_state(context, gpu_addresses, gpu_state, model_transform);
    }
}

class Ring_Shader extends Shader {
    update_GPU(context, gpu_addresses, graphics_state, model_transform, material) {
        // update_GPU():  Defining how to synchronize our JavaScript's variables to the GPU's:
        const [P, C, M] = [graphics_state.projection_transform, graphics_state.camera_inverse, model_transform],
            PCM = P.times(C).times(M);
        context.uniformMatrix4fv(gpu_addresses.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        context.uniformMatrix4fv(gpu_addresses.projection_camera_model_transform, false,
            Matrix.flatten_2D_to_1D(PCM.transposed()));
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return `
        precision mediump float;
        varying vec4 point_position;
        varying vec4 center;
        `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        // TODO:  Complete the main function of the vertex shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        attribute vec3 position;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_model_transform;
        
        void main(){
            center = vec4(0,0,0,1) * model_transform;
            gl_Position = projection_camera_model_transform * vec4(position, 1.0);
            point_position = vec4(position, 1.0);
        }`;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // TODO:  Complete the main function of the fragment shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        uniform vec4 shape_color; 
        void main(){
            float factor = 0.1 + 0.9 * sin(57.0 * distance(center, point_position));
            gl_FragColor = vec4(176.0/255.0, 128.0/255.0, 64.0/255.0, factor);
        }`;
    }
}

