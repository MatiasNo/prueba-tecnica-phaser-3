// ============================================================
//  EL RECOLECTOR - Proyecto base
//  Esto es todo lo que te damos hecho. El resto es tuyo.
// ============================================================
import Player from "./jugador/jugasdor.js";
import Caja from "./caja/caja.js"
import { AnimacionCaja } from "./caja/caja_anim.js";
const VELOCIDAD_JUGADOR = 400;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1d1d2b',
  physics: {
    default: 'arcade',
    arcade: {
      
        gravity:{y:400},
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
let jugador;
let teclas;

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



}

// ------------------------------------------------------------
// create: se ejecuta UNA vez, al arrancar la escena.
// Acá se crean las cosas.
// ------------------------------------------------------------
function create() {
  // Un rectángulo celeste como jugador. Podés reemplazarlo por un sprite.
  this.jugador = new Player(this,400, 550, 70, 20, 0x66ccff);
  this.jugador.body.setImmovable(true)
  // Le damos un cuerpo de física para poder detectar colisiones más adelante.
  this.physics.add.existing(jugador);

  this.caja = new Caja(this,400,650,'caja')
  new AnimacionCaja(this);
  this.caja.anims.play('destroy')


  // Las flechas del teclado.
  teclas = this.input.keyboard.createCursorKeys();
}

// ------------------------------------------------------------
// update: se ejecuta ~60 veces por segundo, siempre.
// Acá va lo que cambia con el tiempo.
// ------------------------------------------------------------
function update() {
 jugador.update();
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
