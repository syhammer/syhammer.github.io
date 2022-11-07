class Button extends Element
{
  constructor(parent,position,size,runSelf,clicked)
  {
    super(position,size);
    this.parent = parent;
    this.hoverValue = 0;
    this.runSelf = runSelf;
    this.clicked = clicked;
    this.hoverMethods = {
      linear:function(a,b,c){
        a+=Math.sign(b-a)*constrain(abs(b-a),0,c);
        return a;
      },
      lerp:function(a,b,c){
        return lerp(a,b,c);
      }
    };
    this.hoverMethod = this.hoverMethods.lerp;
    this.hoverDelta = 0.15;
  }

  run()
  {
    this.runSelf(this);
  }

  update()
  {
    this.anchorSystem.applyTransforms();
    this.handleHovering();
  }

  handleHovering()
  {
    if (this.isHovered())
    {
      this.hoverValue = this.hoverMethod(this.hoverValue,1,this.hoverDelta);
    } else
    {
      this.hoverValue = this.hoverMethod(this.hoverValue,0,this.hoverDelta);
    }
  }

  clickEvent()
  {
    if (this.isHovered())
    {
      var successful = this.clicked(this);
      if (successful)
      {
        //game.getProcessor('Sound Player').playSound('button-clicked');
      }
    }
  }
}
