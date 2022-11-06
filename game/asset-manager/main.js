class AssetManager
{
  constructor()
  {
    this.completeAssets = [];
    this.incompleteAssets = [];
    this.supportedFormats = {
      'image':['png','jpg','jpeg','svg'],
      'sound':['mp3','wav'],
    };
    this.totalAssetsQueued = 0;
    this.soundClient = null;
  }

  run()
  {
    this.manageAssets();
  }

  findAsset(id,allowMultiple=false)
  {
    var results = [];
    for (var i = this.completeAssets.length-1; i >= 0; i--)
    {
      if (this.completeAssets[i].id == id)
      {
        if (allowMultiple)
        {
          results.push(this.completeAssets[i]);
        } else
        {
          return this.completeAssets[i];
        }
      }
    }
    if (allowMultiple)
    {
      return results;
    } else
    {
      return null;
    }
  }

  loadingProgress()
  {
    return this.completeAssets.length/this.totalAssetsQueued;
  }

  manageAssets()
  {
    for (var i = this.incompleteAssets.length-1; i >= 0; i--)
    {
      if (this.incompleteAssets[i].isLoaded())
      {
        this.createCompleteAsset(this.incompleteAssets[i]);
        this.incompleteAssets.splice(i,1);
      }
    }
  }

  createCompleteAsset(asset)
  {
    this.completeAssets.push(new Asset(asset.id,asset.path,asset.type,asset.elt));
    if (this.soundClient)
    {
      this.soundClient.recieveSound(asset);
    }
  }

  createAsset(id,path)
  {
    var type = this.getTypeFromPath(path);
    var object = this.getObjectFromType(type);
    this.incompleteAssets.push(new IncompleteAsset(id,path,type,object));
    this.totalAssetsQueued++;
  }

  getTypeFromPath(path)
  {
    var raw = path.split('.');
    var format = raw[raw.length-1];
    var supportedFormats = this.getArrayOfObjectKeys(this.supportedFormats);
    for (var i = supportedFormats.length-1; i >= 0; i--)
    {
      for (var j = this.supportedFormats[supportedFormats[i]].length; j >= 0; j--)
      {
        if (format == this.supportedFormats[supportedFormats[i]][j])
        {
          return supportedFormats[i];
        }
      }
    }
  }

  getArrayOfObjectKeys(object)
  {
    return Object.keys(object);
  }

  getObjectFromType(type)
  {
    switch(type)
    {
      case 'sound':
        return Audio;
      case 'image':
        return Image;
    }
  }
}
