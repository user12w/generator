const dbName = "myDB";
const request = indexedDB.open(dbName, 1);
request.onupgradeneeded = e => {
  const db = (e as any).target.result;
  const personagesStore = db.createObjectStore("personages", {
    keyPath: "id"

  });
};
request.onerror = event => {
  console.log((event as any).target.error?.message);
};
let isDbReady =false;
let DB;


var personages = (function(){
  class Manager{
    #list = {};
    constructor() {
    }
    async add(personage: Personage){
      if (this.get(personage.id)) {
        await this.updatePersonage(personage.id);
      } else {
        console.log(`start adding personage ${personage.id}`);
      console.log(personage);
      this.#readwrite
      .put(personage.db)
      .onsuccess = event => {
        console.log(`personage ${personage.id} added`)
      };
      this.#list[personage.id] = personage;
      }
    }
    get(id: number): Personage{
      return this.#list[id]
    }
    get #readwrite(){
      return this.#objectStore("readwrite");
    }
    get #read(){
      return this.#objectStore(undefined)
    }
    #objectStore(type){
      return DB.transaction("personages", type)
        .objectStore("personages")
    }
    async updatePersonage(id: number){
      const personage = this.get(id);
      console.log(`personage ${personage} update started`);
      console.log(personage);
      this.#readwrite
      .put(personage.db)
      .onsuccess = event => {
        console.log(`personage ${id} updated`)
      };
    }
    async loadList(){
      console.log("personages load list started")
      this.#read.getAll().onsuccess = e => {
        const data: Personage[] = e.target.result;
        data.forEach((p: Personage) => {
          new Personage(p.id, p.name, p.img);
        })
      }
    }
    async delete(id){
      console.log(`${this.get(id)} delete started`);
      this.#readwrite
      .delete(id)
      .onsuccess = () => {
        this.#list[id] = undefined;
        console.log(`personage ${id} deleted`);
      };
    }
  }
  const manager = new Manager();
  return manager;
})();

request.onsuccess = event => {
  DB = (event as any).target.result;
  DB.onerror = event => {
    console.error(`myDB error: ${event.target.error?.message}`)
  };
  isDbReady = true;
  personages.loadList()
};