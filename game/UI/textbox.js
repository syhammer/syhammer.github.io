class Textbox extends Element
{
  constructor(parent,position,size,runSelf,submit)
  {
    super(position,size);
    this.parent = parent;
    this.hoverValue = 0;
    this.runSelf = runSelf;
    this.submit = submit;
    this.selected = false;
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
    this.text = '';
    this.defaultText = '';
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

  typeEvent()
  {
    if (this.selected)
    {
      if (key.length == 1)
      {
        this.text+=key;
      } else if (key == 'Enter')
      {
        this.selected = false;
        this.submit(this);
      } else if (key == 'Backspace' && this.text.length > 0)
      {
        this.text = this.text.slice(0,this.text.length-1);
      }
    }
  }

  clickEvent()
  {
    this.selected = this.isHovered();
  }
}
