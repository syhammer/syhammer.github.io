class AnchoringSystem
{
  constructor(parent)
  {
    this.parent = parent;
    this.position = this.parent.position.copy();
    this.size = this.parent.size.copy();
    this.originalSize = this.size.copy();
    this.anchorSettings = {
      div:null,
      offset:createVector(),
      margin:createVector(),
    };
    this.parentAnchor = null;
  }

  applyTransforms()
  {
    var pageManager = game.getProcessor('Page Manager');
    this.size = this.originalSize.copy().mult(pageManager.scale);
    var x = (this.parentAnchor)?this.parentAnchor.position.x-this.parentAnchor.size.x/2:0;
    var y = (this.parentAnchor)?this.parentAnchor.position.y-this.parentAnchor.size.y/2:0;
    var w = (this.parentAnchor)?this.parentAnchor.size.x:width;
    var h = (this.parentAnchor)?this.parentAnchor.size.y:height;
    if (this.anchorSettings.div)
    {
      this.position.x = x+w*this.anchorSettings.div.x+this.anchorSettings.margin.x*pageManager.scale;
      this.position.y = y+h*this.anchorSettings.div.y+this.anchorSettings.margin.y*pageManager.scale;
    }
    translate(this.position.x+this.size.x*this.anchorSettings.offset.x,this.position.y+this.size.y*this.anchorSettings.offset.y);
    this.updateParent();
  }

  updateParent()
  {
    this.parent.position = this.position.copy();
    this.parent.size = this.size.copy();
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

  setMargin(xMar,yMar)
  {
    this.anchorSettings.margin.x = xMar;
    this.anchorSettings.margin.y = yMar;
  }
}
