class Connection
{
  constructor(parent,endpoint)
  {
    if (parent)
    {
      this.parent = parent;
      this.endpoint = endpoint;
      this.peer = this.parent.peer;
      this.connection = this.peer.connect(this.endpoint);
    }
  }

  run()
  {
    if (this.connection != null)
    {
      this.parent.connected(this.connection);
    }
  }
}
