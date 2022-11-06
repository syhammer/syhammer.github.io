class Game extends ProcessDrivenObject
{
  constructor()
  {
    super();
  }

  main()
  {
    this.runProcesses();
  }

  setup()
  {
    var soundPlayer = this.addProcess('Sound Player',SoundPlayer);
    var assetManager = this.addProcess('Asset Manager',AssetManager);
    assetManager.soundClient = soundPlayer;
    var pageManager = this.addProcess('Page Manager',PageManager);
    var peerManager = this.addProcess('Peer Manager',PeerManager);
    var colorManager = this.addProcess('Color Manager',ColorManager);
    Configure(this);
  }
}
