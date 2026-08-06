// ============================================================
//  EL RECOLECTOR - Proyecto base
//  Esto es todo lo que te damos hecho. El resto es tuyo.
// ============================================================
import Player from "./jugador/jugador.js";
import Caja from "./caja/caja.js";
import { AnimacionCaja } from "./caja/caja_anim.js";
import MiraEspada from "./jugador/mira_Espada.js";
import Flecha from "./jugador/flecha.js";
const VELOCIDAD_JUGADOR = 400;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1d1d2b',
  physics: {
    default: 'arcade',
    arcade: {
      
        gravity:{y:2000},
        debug: false
    }
      // Poné esto en true para ver las cajas de colisión. Te va a servir.
      
    }
  ,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Variables del juego. Van a crecer.



new Phaser.Game(config);

// ------------------------------------------------------------
// preload: acá se cargan imágenes, sonidos, spritesheets.
// Por ahora está vacío porque usamos formas geométricas.
// ------------------------------------------------------------
function preload() {
  this.load.spritesheet('caja', 'assets/caja.png', { 
    frameWidth: 64, 
    frameHeight: 64, 

});
this.load.image('miraEspada','assets/mira_espada.png')
this.load.image('flecha','assets/flecha.png')


}
let flechas = [];
let cajas = [];
let tiempot = 0
let tiempoc = 1000/(tiempot/5000 + 2);
let cajaTimer; // referencia global al timer

// ------------------------------------------------------------
// create: se ejecuta UNA vez, al arrancar la escena.
// Acá se crean las cosas.
// ------------------------------------------------------------
function create() {
//animations
 new AnimacionCaja(this)

this.time.addEvent({
  delay: 1000,
  callback: () => tiempot += 1000,
  loop: true
  });



  this.fkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);//fullscreen
  this.input.setDefaultCursor('none');//desactivar mouse
this.input.mouse.disableContextMenu();//desactivar menu click derecho
  // Un rectángulo celeste como jugador. Podés reemplazarlo por un sprite.
  this.jugador = new Player(this,400, 550, 70, 20, 0x66ccff);
  this.jugador.body.allowGravity = false;
  this.jugador.body.setImmovable(true);
  // Le damos un cuerpo de física para poder detectar colisiones más adelante.


  


  // Las flechas del teclado.
 this.teclas = this.input.keyboard.createCursorKeys();
 this.miraEspada = new MiraEspada(this,400,300,'miraEspada')
 this.miraEspada.body.allowGravity = false;

    this.input.on('pointerdown', (pointer) => {
        if (pointer.leftButtonDown()) {
            crearFlecha(this);
        }
    });//flechas
 this.physics.add.overlap(flechas, cajas, onFlechaGolpeaCaja, null, this);//collider de flechas y cajas 

 cajaTimer = this.time.addEvent({
        delay: tiempoc,
        callback: () => {
            crearCaja(this);
            tiempoc = calcularTiempoCaja(tiempot); // recalculás
            cajaTimer.delay = Math.max(tiempoc, 32);;              // y se lo asignás al timer real
        },
        loop: true
    });


}//funciones 
function calcularTiempoCaja(tiempot) {
    return 1000 / (tiempot / 5000 + 2);
}

function crearCaja(scene) {
    const xRandom = Phaser.Math.Between(0, 800); // 0 a config.width
    const caja = new Caja(scene, xRandom, 0, 'caja');
   
    cajas.push(caja);}


function crearFlecha(scene) {
    const flecha = new Flecha(scene, scene.jugador.x, scene.jugador.y, 'flecha');
    
    flechas.push(flecha);
}
function onFlechaGolpeaCaja(flecha, caja) {
    // Evita procesar la misma caja dos veces si ya está siendo destruida
    if (caja.destruyendo) return;
    caja.destruyendo = true;

    // Destruir la flecha inmediatamente
    flecha.destroy();
    const indexFlecha = flechas.indexOf(flecha);
    if (indexFlecha !== -1) flechas.splice(indexFlecha, 1); // ✅ modifica el array original

    // Reproducir la animación de destrucción en la caja
    caja.anims.play('destroy', true);

    // Cuando la animación termine, esperar 2 segundos y destruir la caja
    caja.once('animationcomplete', () => {
        caja.scene.time.delayedCall(2000, () => {
            caja.destroy();
            const indexCaja = cajas.indexOf(caja);
            if (indexCaja !== -1) cajas.splice(indexCaja, 1); // ✅ modifica el array original
        });
    });
}
// ------------------------------------------------------------
// update: se ejecuta ~60 veces por segundo, siempre.
// Acá va lo que cambia con el tiempo.
// ------------------------------------------------------------
function update() {
 this.jugador.update();
 this.miraEspada.update(); 
  flechas.forEach(flecha => flecha.update());
  cajas.forEach(caja => caja.update());

 if (Phaser.Input.Keyboard.JustDown(this.fkey)) {
  if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
  } else {
      this.scale.startFullscreen();
  }
}

//fullscreen
}

// ============================================================
//  PARA CORRERLO:
//  - VS Code: extensión Live Server, botón "Go Live"
//  - Terminal: npx serve  (y abrí la URL que te muestra)
//
//  Abrir index.html con doble clic puede parecer que funciona
//  ahora, pero te va a romper cuando cargues imágenes o audio.
//
//  DOCUMENTACIÓN: https://docs.phaser.io/
//  EJEMPLOS CON CÓDIGO: https://labs.phaser.io/
// ============================================================
