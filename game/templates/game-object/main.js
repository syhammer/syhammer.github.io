class GameObject extends ProcessDrivenObject
{
  constructor()
  {
    super();
    this.addProcess('Transform',Transform);
  }
}
