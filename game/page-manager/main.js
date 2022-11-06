class PageManager
{
  constructor()
  {
    this.pages = [];
  }

  run()
  {
    for (var index = this.pages.length-1; index >= 0; index--)
    {
      var i = this.pages.length-1-index;
      this.pages[i].run();
    }
  }

  addPage(page)
  {
    this.pages[page.layer] = page;
  }
}
