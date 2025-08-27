let fighters = {
  list: {},
  add: function(fighter) {
    this.list[fighter.id] = (fighter);
  },
  remove: function(id) {
    this.list[id] = undefined;
  }
}
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
      isMain: (isMain=="true" || Boolean(isMain)==true),
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
    if(this.secondFighterId && id){
      this.secondFighter.secondFighter = null
    }
    this.#db.secondFighterId = id;
    if (this.secondFighter.secondFighterId != this.id) {
      this.secondFighter.secondFighterId = this.id
    }
  }
  get secondFighter(){
    return fighters.get(this.#db.secondFighterId);
  }
  get id(){
    return this.#db.id
  }
  get secondFighterId(){
    return this.#db.secondFighterId;
  }
  get db(){
    return {...this.#db};
  }
  set db({
    id,
    name,
    count,
    countOnStart,
    isMain,
    secondFighterId,
    maxHp,
    speed,
    imgs
  } ){
    console.log(`fighter update`)
    
    this.#db = {
      id: this.id,
      name: name || this.db.name,
      count: count || this.db.count,
      countOnStart: countOnStart || this.db.countOnStart,
      isMain: isMain || this.db.isMain,
      secondFighterId: this.secondFighterId,
      maxHp: maxHp || this.db.maxHp,
      speed: speed || this.db.speed,
      imgs: imgs || this.imgs
    };
    console.log(this.#db)
    if (countOnStart > count) {
      throw new Error(`countOnStrat > count __zzzzzzzz11zzz__z`)
    }
  }
}