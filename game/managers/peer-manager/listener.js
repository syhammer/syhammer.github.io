class Listener
{
  constructor(parent)
  {
    this.parent = parent;
    this.peer = this.parent.peer;
    this.peer.on('connection',(c)=>{
      this.parent.connected(c);
    });
  }
}
