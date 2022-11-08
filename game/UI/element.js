class Element
{
  constructor(position,size)
  {
    this.position = position;
    this.size = size;
    this.anchorSystem = new AnchoringSystem(this);
  }

  typeEvent(){}

  clickEvent(){}

  isHovered()
  {
    return (abs(mouseX-(this.position.x+this.size.x*this.anchorSystem.anchorSettings.offset.x)) < this.size.x/2 && abs(mouseY-(this.position.y+this.size.y*this.anchorSystem.anchorSettings.offset.y)) < this.size.y/2);
  }
}
