let inverted = true;

    var hydra = new Hydra({detectAudio: false, canvas: synth})

    hydra.setResolution(500, 500);
  
   
  //lines by t3os

shape(2,0.95,() => inverted ? 0.2 : 0.05).repeat(1, 14)
  .modulateScale(shape(100,[0,1].smooth(),1))
  .mult(

shape(2,0.95,() => inverted ? 0.2 : 0.05).repeat(1, 14).rotate(1.570796)
  .modulateScale(shape(100,[0,1].smooth().offset(0.5),1)))
  .invert(() => inverted ? 1 : 0)
  .out();


  const toggleButton = document.getElementById('toggleButton');
  toggleButton.addEventListener('click', () => {
      inverted = !inverted;});

  