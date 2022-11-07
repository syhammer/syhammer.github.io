var game;

function setup()
{
  createCanvas(window.innerWidth,window.innerHeight);

  game = new Game();
  game.setup();
}

function draw()
{
  game.main();
}
