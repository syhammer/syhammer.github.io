class Asset
{
  constructor(id,path,type,elt)
  {
    this.path = path;
    this.id = id;
    this.type = type;
    this.elt = elt;
    this.soundLoaded = false;
    this.active = true;
  }

  isLoaded()
  {
    switch(this.type)
    {
      case 'image':
        return this.elt.complete;
      case 'sound':
        return this.soundLoaded;
    }
  }
}
