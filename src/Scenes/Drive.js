class Drive extends Phaser.Scene {
    constructor() {
        super("driveScene");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 350;
        this.speed = 0;
        this.DRAG = 350;    // DRAG < ACCELERATION = icy slide
        //this.SCALE = 3.75;
        this.SCALE = 4.5;
        this.timing = false;
        this.timer = 0;
        this.active = true;
    }

    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        //this.map = this.add.tilemap("level", 18, 18, 45, 80);
        this.map = this.add.tilemap("map", 8, 8, 240, 440);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("city-tileset", "tilemap_tiles");

        // Create a layer
        this.roadLayer = this.map.createLayer("road", this.tileset, 0, 0);
        

        // Make it collidable
        this.roadLayer.setCollisionByProperty({
            solid: true
        });

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(30, 200, "cars", "car_blue_1.png");
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.setScale(0.1);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.roadLayer);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        this.rKey = this.input.keyboard.addKey('R');

        //end vfx
        my.vfx.end = this.add.particles(0, 0, "kenny-particles", {
            frame: ['star_04.png', 'star_01.png', 'star_02.png', 'star_03.png'],
            scale: {start: 0.04, end: 0.08},
            lifespan: 400,
            alpha: {start: 1, end: 0.5},
        });

        my.vfx.end.stop();

        // TODO: add camera code here
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); 
        this.cameras.main.setDeadzone(0, 0);
        this.cameras.main.setZoom(this.SCALE);

        this.physics.world.drawDebug = false;
        my.sprite.player.body.setDrag(this.DRAG);
        my.vfx.end.startFollow(my.sprite.player, my.sprite.player.displayWidth/2, my.sprite.player.displayHeight/2, false);

    }

    update() {
        if(this.active){

            //timer
            if(this.timing){
                this.timer += 1;
            }
            
            const body = my.sprite.player.body;

            
            //turning
            my.sprite.player.setAngularVelocity(0);
            if(cursors.left.isDown) {
                my.sprite.player.setAngularVelocity(-250);
            } else if(cursors.right.isDown) {
                my.sprite.player.setAngularVelocity(250);
            } 
            
            //driving
            if (cursors.up.isDown) {
                this.timing = true;
                // Accelerate forward
                const angle = my.sprite.player.rotation - Math.PI / 2;
                const accelX = Math.cos(angle) * this.ACCELERATION;
                const accelY = Math.sin(angle) * this.ACCELERATION;
                body.setAcceleration(accelX, accelY);
            } else if (cursors.down.isDown) {
                this.timing = true;
                // Accelerate backward
                const angle = my.sprite.player.rotation - Math.PI / 2;
                const accelX = Math.cos(angle) * -this.ACCELERATION;
                const accelY = Math.sin(angle) * -this.ACCELERATION;
                body.setAcceleration(accelX, accelY);
            } else {
                // No input, let drag slow the player down
                body.setAcceleration(0, 0);
            }
            const currentSpeed = Math.sqrt(my.sprite.player.body.velocity.x * my.sprite.player.body.velocity.x + my.sprite.player.body.velocity.y * my.sprite.player.body.velocity.y);

            //max speed
            if (currentSpeed > 150) {
                const scale = 150 / currentSpeed;
                my.sprite.player.body.velocity.x *= scale;
                my.sprite.player.body.velocity.y *= scale;
            }

            if(Phaser.Input.Keyboard.JustDown(this.rKey)) {
                this.scene.restart();
            }
            //win detection
            if(my.sprite.player.body.y<53 && my.sprite.player.body.x>335){
                console.log(`you win: ${this.timer}`)
                this.active = false;
                this.registry.set("runTime", this.timer);
                this.timer = 0;
                body.setAcceleration(0, 0);
                my.vfx.end.start();
            }
        }else{
            my.sprite.player.setAngularVelocity(0);
            this.timer += 1;
            my.vfx.end.stop();
            if(this.timer > 120){
                this.scene.start("End");
            }
        }
    }
}