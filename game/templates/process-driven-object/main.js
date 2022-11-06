class ProcessDrivenObject
{
  constructor()
  {
    this.processes = [];
    this.shortcuts = {};
  }

  addProcess(id,object,processObject=Process)
  {
    var processor = new object();
    var process = new processObject(id,processor);
    this.processes.push(process);
    this.shortcuts[id] = processor;
    return processor;
  }

  runProcesses()
  {
    for (var i = this.processes.length-1; i >= 0; i--)
    {
      if (this.processes[i].delete)
      {
        this.processes.splice(i,1);
      } else
      {
        this.processes[i].run();
      }
    }
  }

  getProcessor(id)
  {
    return this.shortcuts[id];
  }

  getProcessById(id)
  {
    for (var i = this.processes.length-1; i >= 0; i--)
    {
      if (this.processes[i].id == id)
      {
        return this.processes[i];
      }
    }
  }
}
