export default class Flecha extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.setCollideWorldBounds(true);
        this.speed = 20;

        // Calculamos el ángulo UNA SOLA VEZ, al crearse
        const mira = scene.miraEspada;
        this.angle_ = Phaser.Math.Angle.Between(this.x, this.y, mira.x, mira.y);
        this.rotation = this.angle_;
        this.body.allowGravity = false;
    }

    update() {
        // Se mueve en esa misma dirección, cada frame
        this.x += Math.cos(this.angle_) * this.speed;
        this.y += Math.sin(this.angle_) * this.speed;
    }
}