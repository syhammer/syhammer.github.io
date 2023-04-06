var game;

function setup()
{
  game = new Game();
  game.init();
}

function draw()
{
  game.update();
}

Date.prototype.addMinutes = function(minutes) {
    this.setMinutes(this.getMinutes() + minutes);
    return this;
};
