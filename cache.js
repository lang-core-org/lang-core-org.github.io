/*framework by me, cowork with Claude*/
class cache{
  
  static #resources(){
    return performance.getEntriesByType(
      'resource'
    ).map(r => r.name);
  }
}
