export function AnimacionCaja(scene) {

    scene.anims.create({
               key:'destroy', 
               frames: scene.anims.generateFrameNumbers('caja', { start: 0, end: 4 }),
               frameRate: 30,
               repeat: -1,
           })
          
   
           
       }