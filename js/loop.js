window.requestAnimationFrame(loop);

setup();

function loop()
{
    draw();
    window.requestAnimationFrame(loop);
}
