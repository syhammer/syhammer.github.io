class Element
{
  constructor(position,size,)
  {
    this.position = position;
    this.size = size;
    this.anchorSettings = {
      div:null,
      offset:createVector(-0.5,-0.5),
    };
  }

  applyTransforms()
  {
    if (this.anchorSettings.div)
    {
      this.position.x = width*this.anchorSettings.div.x;
      this.position.y = height*this.anchorSettings.div.y;
    }
    translate(this.position.x+this.size.x*this.anchorSettings.offset.x,this.position.y+this.size.y*this.anchorSettings.offset.y);
  }

  anchorToPoint(xDiv,yDiv)
  {
    if (!this.anchorSettings.div)
    {
      this.anchorSettings.div = createVector();
    }
    this.anchorSettings.div.x = xDiv;
    this.anchorSettings.div.y = yDiv;
  }

  setOffset(xOff,yOff)
  {
    this.anchorSettings.offset.x = xOff;
    this.anchorSettings.offset.y = yOff;
  }

  isHovered()
  {
    return (abs(mouseX-this.position.x) < this.size.x/2 && abs(mouseY-this.position.y) < this.size.y/2);
  }
}
