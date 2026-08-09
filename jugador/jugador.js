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
    saltando() {
        if (this.body.blocked.down || this.body.touching.down) {
         for(let i = 0; i < 20; i++)
             this.body.setVelocityY(-this.speed*2);
        
    }}
    // Método para manejar el movimiento del prota
    update() {
        this.body.setVelocityX(0);
        const cursors = this.scene.teclas
        const akey = this.scene.akey;
        const dkey = this.scene.dkey;
        const wkey = this.scene.wkey;
        const skey = this.scene.skey;   
        let cursorsactive = false;
        let wasdactive = false;
        if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown) {
            cursorsactive = true;
        }
        if (akey.isDown || dkey.isDown || wkey.isDown || skey.isDown) {
            wasdactive = true;
        }
        if(cursorsactive === true){
        if (cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        }
        if (cursors.up.isDown) {
           this.saltando();
        } }
if(wasdactive === true){
        if (akey.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (dkey.isDown) {
            this.body.setVelocityX(this.speed);
        }
        if (wkey.isDown) {
            this.saltando();
        }
}
}
}