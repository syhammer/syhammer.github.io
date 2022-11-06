class Button extends Element
{
  constructor(position,size,runSelf,clicked)
  {
    super(position,size);
    this.hoverValue = 0;
    this.runSelf = runSelf;
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
    this.applyTransforms();
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
      var successful = this.clicked();
      if (successful)
      {
        game.getProcessor('Sound Player').playSound('button-clicked');
      }
    }
  }
}
