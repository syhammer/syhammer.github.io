var game;

function setup()
{
  createCanvas(windowWidth,windowHeight);

  game = new Game();
  game.setup();
}

function draw()
{
  game.main();
}
