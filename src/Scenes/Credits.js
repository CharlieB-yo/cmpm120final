class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
        this.my = {sprite: {}};
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {

        WebFont.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                this.add.text(720, 250, `Assets by Kenney.nl`, {
                    fontFamily: '"Press Start 2P"',
                    fontSize: '32px',
                    align: 'center',
                    color: '#ffffff'
                }).setOrigin(0.5, 0.5);

                this.add.text(720, 300, `Game code by Charlie Bliss`, {
                    fontFamily: '"Press Start 2P"',
                    fontSize: '32px',
                    align: 'center',
                    color: '#ffffff'
                }).setOrigin(0.5, 0.5);

                const backButton = this.add.text(720, 450, 'Back', { fontFamily: '"Press Start 2P"', fontSize: '32px', align: 'center', color: '#ffffff'})
                    .setInteractive()
                    .on('pointerdown', () => this.scene.start("loadScene"));
                backButton.setOrigin(0.5, 0.5);
            }
        });       
    }
}