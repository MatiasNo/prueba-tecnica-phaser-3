export default class Caja extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        
        // Añadir el objeto a la escena y activar físicas si lo deseas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5, 1);
        
        // Propiedades de tu prota
        this.body.setCollideWorldBounds(true);
        this.speed = 10
        this.invulnerable = false;
        this.body.maxVelocity.y = 900; // el 900 es un techo, ajustalo probando

        this.body.setSize(42, 38);      // ancho y alto del hitbox
        this.body.setOffset(11, 11);    // desplazamiento (x, y) desde la esquina del frame
        const hitboxesPorFrame = {
            0: { w: 42, h: 38, x: 11, y: 11 },
            1: { w: 42, h: 38, x: 11, y: 11 },
            2: { w: 42, h: 38, x: 11, y: 11 },
            3: { w: 42, h: 29, x: 11, y: 20 },
            4: { w: 42, h: 19, x: 11, y: 30 },
        };

        this.on('animationupdate', (anim, frame) => {
            const hb = hitboxesPorFrame[frame.index];
            if (hb) {
                this.body.setSize(hb.w, hb.h);
                this.body.setOffset(hb.x, hb.y);
            }
        });


         

    }
    volverseInvulnerable() {
        if (this.invulnerable) return;
        this.invulnerable = true;
        this.body.setImmovable(true); // deja de "flotar" con la física de otros cuerpos
            this.body.setVelocity(0, 0);   // 👈 corta cualquier movimiento residual
    this.body.allowGravity = false; // 👈 deja de acumular caída

        this.setTint(0xaaaaaa); //debug      // feedback visual opcional, sacalo si no lo querés
    }

    // Método para manejar el movimiento del prota
    update() {
        
        if (!this.invulnerable && !this.destruyendo && (this.body.blocked.down || this.body.touching.down)) {
        this.volverseInvulnerable();
    }

        
    }
}