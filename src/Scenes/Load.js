class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

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

        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {
        WebFont.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                this.add.text(720, 250, `RC Racer`, {
                    fontFamily: '"Press Start 2P"',
                    fontSize: '48px',
                    align: 'center',
                    color: '#ffffff'
                }).setOrigin(0.5, 0.5);

                const playButton = this.add.text(720, 450, 'Start Game', { fontFamily: '"Press Start 2P"', fontSize: '32px', align: 'center', color: '#ffffff'})
                    .setInteractive()
                    .on('pointerdown', () => this.scene.start("driveScene"));
                playButton.setOrigin(0.5, 0.5);


                const creditsButton = this.add.text(720, 750, 'Credits', { fontFamily: '"Press Start 2P"', fontSize: '32px', align: 'center', color: '#ffffff'})
                    .setInteractive()
                    .on('pointerdown', () => this.scene.start("creditsScene"));
                creditsButton.setOrigin(0.5, 0.5);
            }
        });
    }
}