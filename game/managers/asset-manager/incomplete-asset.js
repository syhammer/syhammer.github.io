class IncompleteAsset extends Asset
{
  constructor(id,path,type,object)
  {
    super();
    this.active = false;
    this.path = path;
    this.id = id;
    this.type = type;
    this.elt = new object();
    this.elt.id = this.id;
    this.elt.src = path;
    if (this.elt instanceof Image)
    {
      this.elt.style.visibility = 'hidden';
      document.body.appendChild(this.elt);
    } else if (this.elt instanceof Audio)
    {
      this.elt.addEventListener('canplaythrough',(e)=>{
        this.soundLoaded = true;
      });
    }
  }
}
