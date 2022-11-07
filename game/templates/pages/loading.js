class LoadingPage extends Page
{
  constructor()
  {
    super('Loading',0,function(page){
      push();
      background(0);
      var pageManager = game.getProcessor('Page Manager');
      var totalSize = width*0.75;
      var progress = game.getProcessor('Asset Manager').loadingProgress();
      var blueColor = game.getProcessor('Color Manager')['blue-team-1'];
      var redColor = game.getProcessor('Color Manager')['red-team-1'];
      var size = progress*totalSize*0.5;
      fill(100);
      noStroke();
      rectMode(CENTER);
      rect(width/2,height/2,totalSize,5*pageManager.scale);
      fill(blueColor);
      rect(width/2-size/2,height/2,size,5*pageManager.scale);
      fill(redColor);
      rect(width/2+size/2,height/2,size,5*pageManager.scale);
      fill(255);
      noStroke();
      textAlign(CENTER,CENTER);
      textFont('Dosis');
      textSize(80*pageManager.scale);
      text('LOADING',width/2,height/2-100*pageManager.scale);
      push();
      translate(width/2+145*pageManager.scale,height/2-80*pageManager.scale);
      scale(pageManager.scale);
      page.animationPlayer.run(page.dots);
      pop();
      pop();
    },{animationPlayer:new AnimationPlayer(),dots:new DotAnimation()});
    var _continue = new Button(this,createVector(width/2,height/2),createVector(100,35),function(button){
      push();
      button.update();
      var pageManager = game.getProcessor('Page Manager');
      var progress = game.getProcessor('Asset Manager').loadingProgress();
      fill(255*button.hoverValue*(progress==1));
      stroke(255);
      strokeWeight(progress*5*pageManager.scale);
      rectMode(CENTER);
      rect(0,0,button.size.x,button.size.y);
      fill(255-255*button.hoverValue*(progress==1));
      stroke(255-255*button.hoverValue*(progress==1));
      strokeWeight(button.hoverValue);
      textSize(20*pageManager.scale);
      textAlign(CENTER,CENTER);
      textFont('Exo');
      if (progress == 1)
      {
        text('Continue',0,2);
      } else
      {
        text(round(progress*100)+'%',0,2);
      }
      pop();
    },function(button){
      var progress = game.getProcessor('Asset Manager').loadingProgress();
      var pageManager = game.getProcessor('Page Manager');
      if (progress == 1)
      {
        var loading = pageManager.getPage('Loading');
        var lobby = pageManager.getPage('Lobby');
        loading.active = false;
        lobby.active = true;
        return true;
      }
      return false;
    });
    _continue.anchorSystem.anchorToPoint(0.5,0.5);
    _continue.hoverDelta = 1;
    this.addElement(_continue);
    this.active = true;
    this.dots.play();
    this.dots.looping = true;
  }

  mousePressed()
  {
    this.elementsCheckClick();
  }
}
