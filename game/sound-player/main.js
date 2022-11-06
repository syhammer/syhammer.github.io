class SoundPlayer
{
  constructor()
  {
    this.sounds = {};
    this.volume = 100;
  }

  run()
  {
    
  }

  playSound(soundID,volumeMultiplier=1)
  {
    var sound = this.sounds[soundID].cloneNode();
    sound.play();
    sound.volume = (this.volume/100)*volumeMultiplier;
  }

  recieveSound(soundAsset)
  {
    this.sounds[soundAsset.id] = soundAsset.elt;
  }
}
