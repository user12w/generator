console.log("fighter.js");

let fighters = {
  list: {},
  add: function (fighter) {
    this.list[fighter.id] = (fighter);
  },
  remove: function (id) {
    this.list[id] = undefined;
  },
  get: function(id) {
    return this.list[id];
  }
}
class Fighter {
  #db = {
    id: undefined,
    name: undefined,
    count : undefined,
    countOnStart: undefined,
    isMain: undefined,
    secondFighterId: undefined,
    maxHp: undefined,
    speed: undefined,
    imgs: undefined,
    personageId: undefined
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
    imgs,
    personageId
  }) {
    this.#db = {
      id: id,
      name: name,
      count: count,
      countOnStart: countOnStart,
      isMain: (isMain == "true" || Boolean(isMain) == true),
      secondFighterId: secondFighterId,
      maxHp: maxHp,
      speed: speed,
      imgs: imgs,
      personageId: personageId
    };
    console.log("new fighter");
    console.log(this.#db);
    
    if (fighters.get(id)) {
      throw new Error(`cannon create fighter with id: ${id}`);
    }
    const personage = personages.get(personageId);
    if (!personage) {
      throw new Error(`no personage with id ${personageId}`);
    }
    personage.addFighter(this);

    const secondFighter = fighters.get(secondFighterId);
    if (secondFighter) {
      secondFighter.secondFighterId = this.id
    }
    Templator.addFighter(id, name, count, maxHp, imgs, personage.fightersList);
    fighters.add(this);
  }


  set secondFighterId(id) {
    if (this.secondFighterId && id) {
      this.secondFighter.secondFighter = null;
    }
    this.#db.secondFighterId = id;
    if (this.secondFighter.secondFighterId != this.id) {
      this.secondFighter.secondFighterId = this.id;
    }

  }
  get secondFighter() {
    return fighters.get(this.#db.secondFighterId);
  }
  get id() {
    return this.#db.id
  }
  get secondFighterId() {
    return this.#db.secondFighterId;
  }
  get db() {
    return { ...this.#db };
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
    imgs,
    personageId
  }) {
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
      imgs: imgs || this.imgs,
      personageId: personageId || this.#db.personageId
    };
    console.log(this.#db)
    if (countOnStart > count) {
      throw new Error(`countOnStrat > count __zzzzzzzz11zzz__z`)
    }
  }
}
