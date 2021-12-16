/*Downloaded from https://www.codeseek.co/erikrahm/x-ray-effect-with-a-css-mask-ywrmH */
$(document).ready(function(){
  var currentMousePos = { x: -1, y: -1 };
  $('#flesh3').mousemove(function(e) {
      currentMousePos.x = e.pageX;
      currentMousePos.y = e.pageY;
    
    $('#bone3').css('-webkit-mask-position-x', currentMousePos.x - 700);
    $('#bone3').css('-webkit-mask-position-y', currentMousePos.y - 250)
  });
});