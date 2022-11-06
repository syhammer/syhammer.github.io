class Animation
{
  constructor(render,length)
  {
    this.render = render;
    this.position = 0;
    this.length = length;
    this.playing = false;
    this.looping = false;
  }

  run()
  {
    if (this.playing)
    {
      this.position++;
      if (this.position >= this.length)
      {
        if (this.looping)
        {
          this.position = 0;
        } else
        {
          this.stop();
        }
      }
    }
  }

  play()
  {
    this.playing = true;
  }

  pause()
  {
    this.playing = false;
  }

  stop()
  {
    this.pause();
    this.position = 0;
  }
}
