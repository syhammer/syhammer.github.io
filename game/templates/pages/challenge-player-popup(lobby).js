class ChallengePlayerPopup extends Popup
{
  constructor()
  {
    super('Challenge Player',createVector(),createVector(400,400),0,function(popup){
      push();
      popup.anchorSystem.applyTransforms();
      var pageManager = game.getProcessor('Page Manager');
      fill(0);
      stroke(255);
      strokeWeight(5*pageManager.scale);
      rectMode(CENTER);
      rect(0,0,popup.size.x,popup.size.y);
      fill(255);
      noStroke();
      textAlign(LEFT,CENTER);
      textFont('Exo');
      textSize(25*pageManager.scale);
      text('Challenge Player',-popup.size.x/2+10*pageManager.scale,-popup.size.y/2+27.5*pageManager.scale);
      pop();
    });
    this.anchorSystem.anchorToPoint(0.5,0.5);
    this.blockPages = true;
  }
}
