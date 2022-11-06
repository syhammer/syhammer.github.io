class Transform
{
  constructor()
  {
    this.position = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();
    this.mass = 1;
  }

  run()
  {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force)
  {
    this.acceleration.add(force.copy().div(this.mass));
  }
}
