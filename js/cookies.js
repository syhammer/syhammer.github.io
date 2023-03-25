class Cookies
{
  constructor()
  {
    this.past_date = "Thu, 01 Jan 1970 00:00:00 UTC";
  }

  set(name,value)
  {
    document.cookie = name+"="+value+"; SameSite=None; Secure";
  }

  get(name)
  {
    return document.cookie.split("; ").find((row) => row.startsWith(name))
  }

  remove(name)
  {
    document.cookie = name+"=; expires="+this.past_date+"; path=/";
  }
}
