class PageManager
{
  constructor()
  {
    this.pages = [];
    this.popups = [];
    this.scale = height/900;
  }

  run()
  {
    for (var index = this.pages.length-1; index >= 0; index--)
    {
      var i = this.pages.length-1-index;
      this.pages[i].run();
    }
    for (var index2 = this.popups.length-1; index2 >= 0; index2--)
    {
      var j = this.popups.length-1-index2;
      if (!this.popups[j].active)
      {
        this.popups.splice(j,1);
      } else
      {
        this.popups[j].run();
      }
    }
  }

  addPage(page)
  {
    this.pages[page.layer] = page;
  }

  addPopup(popup)
  {
    this.popups[popup.layer] = popup;
  }

  getPage(id)
  {
    for (var i = this.pages.length-1; i >= 0; i--)
    {
      if (this.pages[i].id == id)
      {
        return this.pages[i];
      }
    }
  }

  getPopup(id)
  {
    for (var i = this.popups.length-1; i >= 0; i--)
    {
      if (this.popups[i].id == id)
      {
        return this.popups[i];
      }
    }
  }

  mousePressed()
  {
    var blockPages = false;
    for (var i = this.popups.length-1; i >= 0; i--)
    {
      if (this.popups[i].active)
      {
        if (this.popups[i].blockPages)
        {
          blockPages = true;
        }
        this.popups[i].mousePressed();
      }
    }
    if (blockPages)
    {
      return;
    }
    for (var j = this.pages.length-1; j >= 0; j--)
    {
      if (this.pages[j].active)
      {
        this.pages[j].mousePressed();
      }
    }
  }

  windowResized()
  {
    resizeCanvas(window.innerWidth,window.innerHeight);
    this.scale = height/900;
  }
}
