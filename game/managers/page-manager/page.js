class Page
{
  constructor(id,layer,render,variables={})
  {
    this.id = id;
    this.layer = layer;
    this.active = false;
    this.render = render;
    this.elements = [];
    var vars = Object.keys(variables);
    for (var i = vars.length-1; i >= 0; i--)
    {
      this[vars[i]] = variables[vars[i]];
    }
  }

  run()
  {
    if (this.active)
    {
      this.render(this);
      for (var i = this.elements.length-1; i >= 0; i--)
      {
        this.elements[i].run();
      }
    }
  }

  addElement(element)
  {
    this.elements.push(element);
  }

  mousePressed()
  {
    this.elementsCheckClick();
  }

  keyPressed()
  {
    this.elementsCheckTyped();
  }

  elementsCheckTyped()
  {
    for (var i = this.elements.length-1; i >= 0; i--)
    {
      if (!this.elements[i].typeEvent) continue;
      this.elements[i].typeEvent();
    }
  }

  elementsCheckClick()
  {
    for (var i = this.elements.length-1; i >= 0; i--)
    {
      this.elements[i].clickEvent();
    }
  }
}
