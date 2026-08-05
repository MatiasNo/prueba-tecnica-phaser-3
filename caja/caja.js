export default class Caja extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        
        // Añadir el objeto a la escena y activar físicas si lo deseas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Propiedades de tu prota
        this.body.setCollideWorldBounds(true);
        this.speed = 10
    }

    // Método para manejar el movimiento del prota
    update(cursors) {
        this.body.setVelocity(0);

        
    }
}