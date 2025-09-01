
class Personage {
  #nameElement;
  #personageElement;
  #imgElement;
  #db = {
    id: null,
    name: null,
    img: null
  };
  constructor(id, name, img) {
    this.init(id, name, img)
  }
  async init(id, name, img){
    console.log(`new personage ${id} ${name}`)
    this.#db.name = name;
    this.#db.id = id;
    this.db.img = img;
   // this.#nameElement = document.querySelector(`personage${id}-name`);
    if (personages.get(id)) {
      if (!name) {
        this.#db.name = personages[id].name;
      }else{
        personages.get(id).name=name;
      }
      if (img) {
        personages.get(id).img = img;
      } else {
        this.db.img = personages[id].img;
      }
    }else{
      await Templator.addPersonage(id, this.#db.name, img);
      _(`#personage${id}-delete-button`)
      .addEventListener("click", event => {
        console.log(`#personage${id}-delete-button clicked`)
        confirmModal(event => {
          this.del()
        }, {
          title: "Подтверждения удаления",
          body: "Вы действительно хотите удалить персонажа?",
          type: "danger",
          button: "удалить"
        });
      });
      personages.add(this);
    }
    this.#nameElement = _(`#personage${id}-name`);
    this.#personageElement = _(`#personage${id}`);
    this.#imgElement = _(`#personage${id}-img`);
  }
  get name() {
    return this.#db.name;
  }
  set name(v) {
    this.#db.name = v;
    this.#nameElement.innerText = v;
    personages.updatePersonage();
  }
  get img(){
    return this.db.img;
  }
  set img(v){
    this.db.img = v;
    this.#imgElement.src = v;
    personages.updatePersonage(this.id)
  }
  del() {
    this.#personageElement.remove();
    personages.delete(this.id);
    this.#db = this.#nameElement = this.#personageElement = this.#imgElement = undefined;
  }
  get id(){
    return this.#db.id;
  }
  get db(){
    return this.#db
  }
}