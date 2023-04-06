class IDGenerator
{
  constructor()
  {
    this.idList = [];
    this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  }

  generate()
  {
    var id = '';

    while (this.idList.includes(id) || id == '')
    {
      id = '';
      
      for (var i = 0; i < 12; i++)
      {
        id+=this.chars[Math.floor(Math.random()*this.chars.length)];
      }
    }

    return id;
  }
}
