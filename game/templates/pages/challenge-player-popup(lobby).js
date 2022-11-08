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
    var size = this.size.copy();
    size.x*=0.8;
    size.y = 35;
    var userID = new Textbox(this,createVector(),size,function(textbox){
      push();
      textbox.update();
      var pageManager = game.getProcessor('Page Manager');
      var hoverValue = textbox.selected || textbox.hoverValue;
      fill(255*hoverValue);
      stroke(255);
      strokeWeight(5*pageManager.scale);
      rectMode(CENTER);
      rect(0,0,textbox.size.x,textbox.size.y);
      fill(255-255*hoverValue);
      stroke(255-255*hoverValue);
      if (textbox.text == '')
      {
        fill(255-120*hoverValue);
        stroke(255-120*hoverValue);
      }
      strokeWeight(hoverValue);
      textSize(20*pageManager.scale);
      textAlign(LEFT,CENTER);
      textFont('Exo');
      var l = (textbox.selected && round(frameCount/20)%2)?'|':'';
      text(((textbox.text == '')?textbox.defaultText:textbox.text),-textbox.size.x/2+5*pageManager.scale,2*pageManager.scale);
      fill(0);
      text(l,-textbox.size.x/2+5*pageManager.scale+textWidth(textbox.text),2*pageManager.scale);
      pop();
    },function(textbox){

    });
    userID.anchorSystem.parentAnchor = this;
    userID.anchorSystem.anchorToPoint(0.5,0.5);
    userID.hoverDelta = 1;
    userID.defaultText = 'User ID';
    this.addElement(userID);
  }
}
