class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");


        // Load characters spritesheet

        this.load.atlasXML("cars", "race/Spritesheets/spritesheet_vehicles.png", "race/Spritesheets/spritesheet_vehicles.xml");

        // Load tilemap information
        this.load.image("tilemap_tiles", "city/Tilemap/tilemap.png"); 
        this.load.tilemapTiledJSON("map", "city/Tiled/map.tmj");   // Tilemap in JSON

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "city/Tilemap/tilemap_packed.png", {
            frameWidth: 8,
            frameHeight: 8
        });

        // Oooh, fancy. A multi atlas is a texture atlas which has the textures spread
        // across multiple png files, so as to keep their size small for use with
        // lower resource devices (like mobile phones).
        // kenny-particles.json internally has a list of the png files
        // The multiatlas was created using TexturePacker and the Kenny
        // Particle Pack asset pack.
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {
         // ...and pass to the next Scene
         this.scene.start("driveScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}