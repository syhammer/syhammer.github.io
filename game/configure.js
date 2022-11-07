function Configure(game)
{
  // COLOR MANAGER
  var colorManager = game.getProcessor('Color Manager');

  colorManager.add('blue-team-1',color(52, 164, 235));

  colorManager.add('red-team-1',color(224, 61, 61));

  // ASSET MANAGER
  var assetManager = game.getProcessor('Asset Manager');

  for (var i = 0; i < 150; i++)
  {
    assetManager.createAsset('Music'+i,'sounds/music.mp3');
  }

  // PAGE MANAGER
  var pageManager = game.getProcessor('Page Manager');

  var loadingPage = new LoadingPage();
  
  var lobbyPage = new LobbyPage();

  pageManager.addPage(loadingPage);

  pageManager.addPage(lobbyPage);

  // PEER MANAGER
  var peerManager = game.getProcessor('Peer Manager');
}
