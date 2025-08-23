let fighters = {
  list: {},
  add: function(fighter) {
    this.list[fighter.id] = (fighter);
  },
  remove: function(id) {
    this.list[id] = undefined;
  }
};
class Fighter {
  #db = {
    id,
    name,
    count,
    countOnStart,
    isMain,
    secondFighterId,
    maxHp,
    speed,
    imgs
  };
  constructor({
    id,
    name,
    count,
    countOnStart,
    isMain,
    secondFighterId,
    maxHp,
    speed,
    imgs
  }) {
    this.#db = {
      id: id,
      name: name,
      count: count,
      countOnStart: countOnStart,
      isMain: Boolean(isMain),
      secondFighterId: secondFighterId,
      maxHp: maxHp,
      speed: speed,
      ims: imgs
    }
    if (fighters.get(id)) {
      console.error(this.#db);
      throw new Error(`cannon create fighter with id: ${id}`);
    }
    const secondFighter = fighters.get(secondFighterId);
    if (secondFighter) {
      secondFighter
    }
  }
  set secondFighterId(id){
    if(this.#secondFighterId && id){
      this.secondFighter.secondFighter = null
    }
    this.#db.secondFighterId = id;
    if (this.secondFighter.secondFighterId != this.id) {
      this.secondFighter.secondFighterId = this.id
    }
  }
  get secondFighter(){
    return fighters.get(this.#secondFighterId);
  }
  get id(){
    return this.#id
  }
  get secondFighterId(){
    return this.#secondFighterId;
  }
  get db(){
    
  }
}