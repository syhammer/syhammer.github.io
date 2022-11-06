class LoadingPage extends Page
{
  constructor()
  {
    super('Loading',0,function(page){
      push();
      background(51);
      var totalSize = width*0.75;
      var progress = game.getProcessor('Asset Manager').loadingProgress();
      fill(30);
      noStroke();
      rectMode(CENTER);
      rect(width/2,height/2,totalSize,5,2.5);
      fill(69, 164, 204);
      rect(width/2,height/2,progress*totalSize,5,2.5);
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
      fill(30);
      stroke(69, 164, 204);
      strokeWeight(progress*5);
      rect(-button.hoverValue*10*(progress==1),0,button.size.x+button.hoverValue*20*(progress==1),button.size.y,17.5);
      fill(255);
      noStroke();
      textSize(20);
      textAlign(CENTER,CENTER);
      textFont('Exo');
      if (progress == 1)
      {
        text('Continue',button.size.x/2,button.size.y/2+2);
        button.size.x = lerp(button.size.x,160,0.15);
      } else
      {
        text(round(progress*100)+'%',button.size.x/2,button.size.y/2+2);
        button.size.x = lerp(button.size.x,100,0.15);
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
    this.addElement(button);
    this.active = true;
    this.dots.play();
    this.dots.looping = true;
  }
}
