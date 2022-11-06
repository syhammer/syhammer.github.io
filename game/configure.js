function Configure(game)
{
  // ASSET MANAGER
  var assetManager = game.getProcessor('Asset Manager');

  for (var i = 0; i < 150; i++)
  {
    assetManager.createAsset('Music'+i,'sounds/music.mp3');
  }

  // PAGE MANAGER
  var pageManager = game.getProcessor('Page Manager');

  var loadingPage = new LoadingPage();

  pageManager.addPage(loadingPage);
}
