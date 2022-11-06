class DotAnimation extends Animation
{
  constructor()
  {
    super(function(animation){
      var dots = 4;
      var dotSize = 10;
      var totalTime = animation.position/animation.length;
      var tippingPoint = 0.8;
      var multiplier = totalTime*tippingPoint;
      multiplier = root_map(multiplier,0,totalTime*tippingPoint,0,multiplier);
      fill(255);
      noStroke();
      for (var i = 0; i < constrain(dots,0,3); i++)
      {
        var x = i*15;
        var w = constrain(dots*multiplier-i,0,1)*dotSize;
        var h = (totalTime > tippingPoint)?power_map(totalTime,tippingPoint,1,dotSize,0):dotSize;
        ellipse(x,0,w,h);
      }
    },40);
  }
}

function power_map(a,b,c,d,e)
{
  return map(a*a,b*b,c*c,d,e);
}

function root_map(a,b,c,d,e)
{
  return map(sqrt(a),sqrt(b),sqrt(c),d,e);
}
