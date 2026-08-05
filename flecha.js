export default class Flecha extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, width, height, fillColor) {
        super(scene, x, y, width, height, fillColor);
        
        // Añadir el objeto a la escena y activar físicas si lo deseas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Propiedades de tu prota
        this.body.setCollideWorldBounds(true);
        this.speed = 200
     
    }
    iniciarAtaque() {
        if (this.isAttacking) return; // no permite reiniciar el ataque a mitad de otro

        this.isAttacking = true;

        const mira = this.scene.miraEspada;
        const baseAngle = Phaser.Math.Angle.Between(this.x, this.y, mira.x, mira.y);
        const speed = this.speed; //speed
        // Rotar hacia la mira
       
            this.x += Math.cos(angle) * speed;
            this.y += Math.sin(angle) * speed;
    
            // Ya llegó, evita que oscile
            this.x = this.scene.miraEspada.x;
            this.y = this.scene.miraEspada.y;
        

        
       
    }

    // Método para manejar el movimiento del prota
    update() {
        const pointer = this.scene.input.activePointer;
        this.body.setVelocity(0);
       
    }
}