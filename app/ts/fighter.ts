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
class Fighter implements DB.Element {
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
  #maxHpElement: HTMLSpanElement;
  #nameElement: HTMLSpanElement;
  #countElement: HTMLSpanElement;
  #imgElement: HTMLImageElement;
  #fighterElement: HTMLElement;
  readonly inited: Promise<void>;
  constructor(data: fighterDb) {

    this.inited = this.#init(data);
  }
  async #init(data: fighterDb) {
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

    await Templator.addFighter(data.id, data.name, data.count, data.maxHp, data.imgs, personage.fightersList);

    (_(`#fighter${this.id}-delete-button`) as HTMLButtonElement)
    .addEventListener("click", e => {
      confirmModal(()=>{
        this.del()
      }, {title: "Подтверждение удаления",
        body: `delete fighter ${this.db.name}?`,
        type: confirmType.danger,
        button: "Удалить"
      })
    })
    this.#maxHpElement = _(`#fighter${this.id}-maxHp`);
    this.#nameElement = _(`#fighter${this.id}-name`);
    this.#imgElement = _(`#fighter${this.id}-img`);
    this.#countElement = _(`#fighter${this.id}-count`);
    this.#fighterElement = _(`#fighter${this.id}`)
    fighters.add(this);


    const secondFighter = fighters.get(data.secondFighterId);
    if (secondFighter) {
      secondFighter.secondFighterId = this.id
    }
  }
  static newFromDb(db: fighterDb) {
    return new Fighter(db);
  }
  set secondFighterId(id: number) {
    id = Number(id)
    if (!(id == this.id)) {
      let secondFighter = this.secondFighter
      if (secondFighter) {
        this.#db.secondFighterId = undefined
        if (secondFighter.secondFighterId) {
          secondFighter.secondFighterId = undefined
        }
      } if (id) {
        let fght = fighters.get(id);
        this.#db.secondFighterId = id;
        if (!(fght.secondFighterId == this.id)) {
          fght.secondFighterId = this.id;
        }
      }
      fighters.updateElement(this.id);
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
      console.error("this.id != data.id");
      throw new Error(`${this.id} != ${data.id}`);
    }
    if (this.#db.personageId != data.personageId) {
      console.error("this.#db.personageId != data.personageId");
      throw new Error(`${this.#db.personageId} != ${data.personageId}`);
    }

    this.secondFighterId = data.secondFighterId;
    this.#db.id = data.id

    this.#nameElement.textContent = data.name;
    this.#db.name = data.name;

    this.#countElement.textContent = String(data.count);
    this.#db.count = data.count;

    this.#db.countOnStart = data.countOnStart;
    this.#db.isMain = data.isMain;
    this.#db.secondFighterId = data.secondFighterId;

    this.#maxHpElement.textContent = String(data.maxHp);
    this.#db.maxHp = data.maxHp;
    this.#db.speed = data.speed;

    this.#imgElement.src = data.imgs[0]
    this.#db.imgs = data.imgs;

    this.#db.isMain = this.#db.isMain == "true" || this.#db.isMain;

    console.log(this.#db)
    if (data.countOnStart > data.count) {
      throw new Error(`countOnStrat > count`);
    }
    fighters.updateElement(this.id);
  }
  del() {
    this.#fighterElement.remove();
    fighters.delete(this.id)
    this.#countElement =
      this.#db = this.#fighterElement =
      this.#imgElement =
      this.#maxHpElement =
      this.#nameElement =
      undefined;


  }
}
