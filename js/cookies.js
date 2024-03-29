class Cookies
{
  constructor()
  {
    this.past_date = "Thu, 01 Jan 1970 00:00:00 UTC";
    this.registeredNames = {};
  }

  set(name,value)
  {
    document.cookie = name+"="+value+"; SameSite=None; Secure";
    this.registeredNames[name] = value;
  }

  get(name)
  {
    return document.cookie.split("; ").find((row) => row.startsWith(name))
  }

  remove(name)
  {
    document.cookie = name+"=; expires="+this.past_date+"; path=/";
    delete this.registeredNames[name];
  }

  clear()
  {
    var names = Object.keys(this.registeredNames);
    
    for (var i = names.length-1; i >= 0; i--)
    {
      this.remove(names[i]);
    }
  }
}
