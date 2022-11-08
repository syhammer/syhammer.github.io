class Popup extends Page
{
  constructor(id,position,size,layer,render,variables={})
  {
    super(id,layer,render,variables);
    this.position = position;
    this.size = size;
    this.anchorSystem = new AnchoringSystem(this);
    this.active = true;
    var exit = new Button(this,createVector(),createVector(35,35),function(button){
      var redColor = game.getProcessor('Color Manager')['red-team-1'];
      push();
      button.update();
      var pageManager = game.getProcessor('Page Manager');
      fill(red(redColor),green(redColor),blue(redColor),255*button.hoverValue);
      stroke(redColor);
      strokeWeight(5*pageManager.scale);
      rectMode(CENTER);
      rect(0,0,button.size.x,button.size.y);
      stroke(lerpColor(redColor,color(255),button.hoverValue));
      strokeWeight(2*pageManager.scale);
      line(-10*pageManager.scale,-10*pageManager.scale,10*pageManager.scale,10*pageManager.scale);
      line(-10*pageManager.scale,10*pageManager.scale,10*pageManager.scale,-10*pageManager.scale);
      pop();
    },function(button){
      button.parent.close();
      return true;
    });
    exit.anchorSystem.parentAnchor = this;
    exit.anchorSystem.anchorToPoint(1,0);
    exit.anchorSystem.setOffset(-0.5,0.5);
    exit.anchorSystem.setMargin(-10,10);
    exit.hoverDelta = 1;
    this.addElement(exit);
  }

  mousePressed()
  {
    this.elementsCheckClick();
  }

  keyPressed()
  {
    this.elementsCheckTyped();
  }

  close()
  {
    this.active = false;
  }
}
