class LobbyPage extends Page
{
  constructor()
  {
    super('Lobby',1,function(page){
      var pageManager = game.getProcessor('Page Manager');
      push();
      background(0);
      fill(10);
      noStroke();
      textAlign(CENTER,CENTER);
      textFont('Dosis');
      textSize(240*pageManager.scale);
      text('LOBBY',width/2,height/2);
      pop();
    });
    var challengePlayer = new Button(this,createVector(width/2,height/2),createVector(200,35),function(button){
      push();
      button.update();
      var pageManager = game.getProcessor('Page Manager');
      fill(255*button.hoverValue);
      stroke(255);
      strokeWeight(5*pageManager.scale);
      rectMode(CENTER);
      rect(0,0,button.size.x,button.size.y);
      fill(255-255*button.hoverValue);
      stroke(255-255*button.hoverValue);
      strokeWeight(button.hoverValue);
      textSize(20*pageManager.scale);
      textAlign(CENTER,CENTER);
      textFont('Exo');
      text('Challenge Player',0,2);
      pop();
    },function(button){
      var pageManager = game.getProcessor('Page Manager');
      if (!pageManager.getPopup('Challenge Player'))
      {
        pageManager.addPopup(new ChallengePlayerPopup());
        return true;
      }
      return false;
    });
    challengePlayer.anchorSystem.anchorToPoint(0,0);
    challengePlayer.anchorSystem.setOffset(0.5,0.5);
    challengePlayer.anchorSystem.setMargin(10,10);
    challengePlayer.hoverDelta = 1;
    this.addElement(challengePlayer);
  }

  mousePressed()
  {
    this.elementsCheckClick();
  }
}
