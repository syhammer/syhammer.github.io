class LoadingPage extends Page
{
  constructor()
  {
    super('Loading',0,function(page){
      push();
      background(0);
      var totalSize = width*0.75;
      var progress = game.getProcessor('Asset Manager').loadingProgress();
      var blueColor = game.getProcessor('Color Manager')['blue-team-1'];
      var redColor = game.getProcessor('Color Manager')['red-team-1'];
      var size = progress*totalSize*0.5;
      fill(100);
      noStroke();
      rectMode(CENTER);
      rect(width/2,height/2,totalSize,5);
      fill(blueColor);
      rect(width/2-size/2,height/2,size,5);
      fill(redColor);
      rect(width/2+size/2,height/2,size,5);
      fill(255);
      noStroke();
      textAlign(CENTER,CENTER);
      textFont('Dosis');
      textSize(80);
      text('LOADING',width/2,height/2-100);
      push();
      translate(width/2+145,height/2-80);
      page.animationPlayer.run(page.dots);
      pop();
      pop();
    },{animationPlayer:new AnimationPlayer(),dots:new DotAnimation()});
    var button = new Button(createVector(width/2,height/2),createVector(100,35),function(button){
      push();
      button.update();
      var progress = game.getProcessor('Asset Manager').loadingProgress();
      fill(255*button.hoverValue);
      stroke(255);
      strokeWeight(progress*5);
      rect(0,0,button.size.x,button.size.y);
      fill(255-255*button.hoverValue);
      noStroke();
      textSize(20);
      textAlign(CENTER,CENTER);
      textFont('Exo');
      if (progress == 1)
      {
        text('Continue',button.size.x/2,button.size.y/2+2);
      } else
      {
        text(round(progress*100)+'%',button.size.x/2,button.size.y/2+2);
      }
      pop();
    },function(button){
      var progress = game.getProcessor('Asset Manager').loadingProgress();
      if (progress == 1)
      {
        return true;
      }
      return false;
    });
    button.anchorToPoint(0.5,0.5);
    button.hoverDelta = 1;
    this.addElement(button);
    this.active = true;
    this.dots.play();
    this.dots.looping = true;
  }
}
