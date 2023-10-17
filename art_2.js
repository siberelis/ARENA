    
    
    
    var hydra = new Hydra({detectAudio: false, canvas: synth})

    hydra.setResolution(500, 500);
  
   
  //lines by t3os

shape(2,0.92,0.3).repeat(1, 14)
  .modulateScale(shape(100,[0,1].smooth(),1))
  .mult(

shape(2,0.92,0.3).repeat(1, 14).rotate(1.570796)
  .modulateScale(shape(100,[0,1].smooth().offset(0.5),1)))
  .invert(1)
// .contrast(1)
//  .brightness(1)
    .out()
