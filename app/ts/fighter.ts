console.log("fighter.js");

// let fighters = {
//   list: {},
//   add: function (fighter: Fighter) {
//     this.list[fighter.id] = (fighter);
//   },
//   remove: function (id: number) {
//     this.list[id] = undefined;
//   },
//   get: function (id: number): Fighter {
//     return this.list[id];
//   }
// }
class fighterDb {
  constructor(
    public id: number,
    public name: string,
    public count: number,
    public countOnStart: number,
    public isMain: boolean | string,
    public secondFighterId: number,
    public maxHp: number,
    public speed: number,
    public imgs: Array<string>,
    public personageId: number) { }
}
class Fighter implements DB.Element{
  #db: fighterDb;
  // {
  //   id: undefined,
  //   name: undefined,
  //   count: undefined,
  //   countOnStart: undefined,
  //   isMain: undefined,
  //   secondFighterId: undefined,
  //   maxHp: undefined,
  //   speed: undefined,
  //   imgs: undefined,
  //   personageId: undefined
  // };
  readonly inited: Promise<void>;
  constructor(data: fighterDb) {
    this.#db = {
      id: data.id,
      name: data.name,
      count: data.count,
      countOnStart: data.countOnStart,
      isMain: data.isMain,
      secondFighterId: data.secondFighterId,
      maxHp: data.maxHp,
      speed: data.speed,
      imgs: data.imgs,
      personageId: Number(data.personageId)
    }
    this.#db.isMain = this.#db.isMain == "true" || this.#db.isMain;
    console.log("new fighter");
    console.log(this.#db);

    if (fighters.get(data.id)) {
      throw new Error(`cannon create fighter with id: ${data.id}`);
    }
    const personage = personages.get(this.#db.personageId);
    if (!personage) {
      throw new Error(`no personage with id ${data.personageId}`);
    }
    personage.addFighter(this);

    const secondFighter = fighters.get(data.secondFighterId);
    if (secondFighter) {
      secondFighter.secondFighterId = this.id
    }
    Templator.addFighter(data.id, data.name, data.count, data.maxHp, data.imgs, personage.fightersList);
    fighters.add(this);
    this.inited = this.#init();
  }
  async #init(){

  }
  static newFromDb(db: fighterDb){
    return new Fighter(db);
  }
  set secondFighterId(id) {
    if (this.secondFighterId && id) {
      this.secondFighter.secondFighterId = null;
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
  set db(data: fighterDb) {
    console.log(`fighter update`)
    if (this.id != data.id) {
      throw new Error(`${this.id} != ${data.id}`);
    }

    this.secondFighterId = data.secondFighterId;
    this.#db.id = data.id
    this.#db.name = data.name
    this.#db.count = data.count
    this.#db.countOnStart = data.countOnStart
    this.#db.isMain = data.isMain
    this.#db.secondFighterId = data.secondFighterId
    this.#db.maxHp = data.maxHp
    this.#db.speed = data.speed
    this.#db.imgs = data.imgs
    this.#db.personageId = data.personageId
    this.#db.isMain = this.#db.isMain == "true" || this.#db.isMain;
    
    console.log(this.#db)
    if (data.countOnStart > data.count) {
      throw new Error(`countOnStrat > count`)
    }
  }
}
