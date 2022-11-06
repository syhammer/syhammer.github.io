class Process
{
  constructor(id,processor)
  {
    this.id = id;
    this.processor = processor;
    this.delete = false;
  }

  run()
  {
    this.processor.run();
  }
}
