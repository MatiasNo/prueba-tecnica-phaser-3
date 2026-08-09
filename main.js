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
      
        gravity:{y:250},
        debug: true
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
this.load.image('gameOver','assets/gameover.png')


}
let flechas = [];
let gameover = false;
let tiempot = 0
let tiempoc = 1000/(tiempot/10000 + 1);
let cajaTimer; // referencia global al timer

// ------------------------------------------------------------
// create: se ejecuta UNA vez, al arrancar la escena.
// Acá se crean las cosas.
// ------------------------------------------------------------
function create() {
    this.cajasGroup = this.physics.add.group({   collideWorldBounds: true});
//animations
 new AnimacionCaja(this)

this.time.addEvent({
  delay: 1000,
  callback: () => tiempot += 1000,
  loop: true
  });



  
  this.input.setDefaultCursor('none');//desactivar mouse
this.input.mouse.disableContextMenu();//desactivar menu click derecho
  // Un rectángulo celeste como jugador. Podés reemplazarlo por un sprite.
  this.jugador = new Player(this,400, 600, 70, 20, 0x66ccff);
  
  this.jugador.body.pushable = false;
  // Le damos un cuerpo de física para poder detectar colisiones más adelante.


  

this.fkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);//fullscreen
  // Las flechas del teclado.
  this.wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);//wasd
  this.skey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);//wasd
  this.akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);//wasd
  this.dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);//wasd
 this.teclas = this.input.keyboard.createCursorKeys();
 this.miraEspada = new MiraEspada(this,400,300,'miraEspada')
 this.miraEspada.body.allowGravity = false;

    this.input.on('pointerdown', (pointer) => {
        if (pointer.leftButtonDown()) {
            crearFlecha(this);
        }
    });//flechas
 this.physics.add.overlap(flechas, this.cajasGroup, onFlechaGolpeaCaja, null, this);//collider de flechas y cajas 
 this.physics.world.on('worldbounds', (body) => {//si flecha toca el borde del mundo
    const flecha = body.gameObject;
    if (!(flecha instanceof Flecha)) return; // por si en el futuro hago otro objeto usa onWorldBounds(no va a pasar)

    const indexFlecha = flechas.indexOf(flecha);
    if (indexFlecha !== -1) flechas.splice(indexFlecha, 1);
    flecha.destroy();
});
 //cajas invulnarables
 this.physics.add.collider(this.cajasGroup, undefined, (cajaA, cajaB) => {
  if (cajaA.invulnerable || cajaB.invulnerable) {
      cajaA.volverseInvulnerable();
      cajaB.volverseInvulnerable();
  }
}, (cajaA, cajaB)  => !cajaA.destruyendo && !cajaB.destruyendo, this);
//cajas invulnerables
this.physics.add.collider(this.jugador, this.cajasGroup, null, (jugador, caja) => caja.invulnerable, this);
//jugador  choca cajas invulnerables
 this.physics.add.overlap(this.jugador, this.cajasGroup, onJugadorGolpeaCaja, null, this);//collider de flechas y cajas 


 cajaTimer = this.time.addEvent({
        delay: tiempoc,
        callback: () => {
            crearCaja(this);
            tiempoc = calcularTiempoCaja(tiempot); // recalculás
            cajaTimer.delay = Math.max(tiempoc, 32);;              // y se lo asignás al timer real
        },
        loop: true
    });
      this.gameOver = this.add.image(400, 300, 'gameOver');
  this.gameOver.setVisible(false);

}//funciones 
function calcularTiempoCaja(tiempot) {
    return 1000 / (tiempot / 5000 + 2);
}

function crearCaja(scene) {
    if(gameover === true)return;
    const xRandom = Phaser.Math.Between(0, 800); // 0 a config.width
    const caja = new Caja(scene, xRandom, 0, 'caja');
   
       scene.cajasGroup.add(caja);}


function crearFlecha(scene) {
    if(gameover === true)return;
    const flecha = new Flecha(scene, scene.jugador.x, scene.jugador.y, 'flecha');
    
    flechas.push(flecha);
}
function onJugadorGolpeaCaja(jugador, caja) {
    if (caja.invulnerable || caja.destruyendo) return;
    gameover = true;
    this.physics.pause(); // Detener la física del juego
    this.jugador.setVisible(false); // Ocultar al jugador
    this.cajasGroup.children.iterate(caja => caja.setVisible(false));
    this.gameOver.setVisible(true);

}
function onFlechaGolpeaCaja(flecha, caja) {
  // Destruir la flecha inmediatamente
    if (caja.destruyendo) return;   // Evita destruir flechas con cajas rotas
    flecha.destroy(); // destruye la flecha en la escena
    const indexFlecha = flechas.indexOf(flecha);
    if (indexFlecha !== -1) flechas.splice(indexFlecha, 1); // ✅ modifica el array original
    if(caja.invulnerable)return;
         // Evita procesar la misma caja dos veces si ya está siendo destruida
       caja.destruyendo = true;
    // Reproducir la animación de destrucción en la caja
    caja.anims.play('destroy', true);

    // Cuando la animación termine, esperar 2 segundos y destruir la caja
    caja.once('animationcomplete', () => {
        caja.scene.time.delayedCall(2000, () => {
            caja.scene.cajasGroup.remove(caja, true, true); // saca del grupo y destruye
           
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
  this.cajasGroup.children.iterate(caja => caja.update());

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
