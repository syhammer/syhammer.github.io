class AnimationPlayer
{
  run(animation)
  {
    push();
    animation.run();
    animation.render(animation);
    pop();
  }
}
