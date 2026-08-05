export default class MiraEspada extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        
        // Registrar el objeto en la escena actual
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(1);
        // Propiedades propias del objeto
        
    }

    // Lógica propia del objeto por cada frame
    update() {
        // Ejemplo de movimiento básico
     
   
    const pointer = this.scene.input.activePointer;
    const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);

    const bounds = this.scene.physics.world.bounds;
    this.x = Phaser.Math.Clamp(worldPoint.x, bounds.x, bounds.right);
    this.y = Phaser.Math.Clamp(worldPoint.y, bounds.y, bounds.bottom);


    }
}