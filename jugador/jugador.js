export default class Player extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, fillColor) {
        super(scene, x, y, width, height, fillColor);
        
        // Añadir el objeto a la escena y activar físicas si lo deseas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Propiedades de tu prota
        this.body.setCollideWorldBounds(true);
        this.speed = 200
    }

    // Método para manejar el movimiento del prota
    update() {
        this.body.setVelocity(0);
        const cursors = this.scene.teclas

        if (cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        }
    }
}