class PeerManager
{
  constructor()
  {
    this.peer = new Peer(game.id);
    console.log(this.peer._id);
    this.listener = new Listener(this);
    this.connection = null;
    this.connectionAttempt = null;
  }

  run()
  {
    if (this.connection)
    {

    } else if (this.connectionAttempt)
    {
      this.connectionAttempt.run();
    }
  }

  attemptConnection(endpoint)
  {
    this.connectionAttempt = new Connection(this,endpoint);
  }

  handleConnection()
  {
    this.connection.on('data',(data)=>{
      this.handleData(data);
    });
  }

  handleData()
  {
    
  }

  send(data)
  {
    if (this.connection)
    {
      this.connection.send(data);
    }
  }

  connected(connection)
  {
    this.connection = connection;
    this.connectionAttempt = null;
    this.handleConnection();
  }
}
