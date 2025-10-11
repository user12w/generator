namespace DB {

  const Dbs: Array<string> = ["personages", "fighters"];
  enum DB {
    personages = "personages",
    fighter = "fighters"
  }
  const dbName = "generatorDb";
  const dbVersion = 1;

  export interface Element {
    id: number;
    db: {id: number};
    inited: Promise<void>;
  }
  class Db<T extends Element> {
    #list: Map<number, any> = new Map<number, T>();
    readonly #name: string;
    static db: IDBDatabase;
    T: { newFromDb: (db: any) => T };

    constructor(name: DB, T: { newFromDb: (db: any) => T }) {
      this.#name = name;
      this.T = T;
    }
    async add(element: T) {
      if (this.get(element.id)) {
        await this.updateElement(element.id);
      } else {
        console.log(`start adding ${this.#name} ${element.id}`);
        let db = element.db;
        db.id = Number(element.id)
        this.#readwrite
          .put(db)
          .onsuccess = event => {
            console.log(`${this.#name} ${element.id} added`)
          };
        this.#list.set(element.id, element);
      }
    }
    get list(){
      return this.#list;
    }
    get(id: number): T {
      return this.#list.get(Number(id))
    }
    get #readwrite(): IDBObjectStore {
      return this.#objectStore("readwrite");
    }
    get #read(): IDBObjectStore {
      return this.#objectStore()
    }
    #objectStore(type?): IDBObjectStore {
      return Db.db.transaction(this.#name, type)
        .objectStore(this.#name)
    }
    async updateElement(id: number) {
      const element = this.get(id);
      console.log(`${this.#name} ${element} update started`);
      this.#readwrite
        .put(element.db)
        .onsuccess = event => {
          console.log(`${this.#name} ${id} updated`)
        };
    }
    loadList(): Promise<void> {
      console.log(`${this.#name}s load list started`)
      return new Promise<void>((resolve, reject) => {
        
      this.#read.getAll().onsuccess = async e => {
        const data: any[] = (e.target as any).result;
        let list: Array<Promise<void>> = []
        data.forEach((p: any) => {
          list.push(this.T.newFromDb(p).inited);
        });
        for await (const element of list) {
          
        }
        resolve()
      }
      })
    }
    async delete(id: number) {
      console.log(`${this.get(id)} delete started`);
      this.#readwrite
        .delete(id)
        .onsuccess = () => {
          this.#list.delete(id)
          console.log(`personage ${id} deleted`);
        };
    }

  }

  export let personages = new Db<Personage>(DB.personages, Personage);
  export let fighters = new Db<Fighter>(DB.fighter, Fighter);

  const request = indexedDB.open(dbName, dbVersion);
  request.onupgradeneeded = e => {
    const db = (e.target as IDBRequest<IDBDatabase>).result;
    Dbs.forEach(element => {
      db.createObjectStore(element, {
        keyPath: "id"
      });
    });
  };
  request.onerror = event => {
    console.log((event as any).target.error?.message);
  };
  request.onsuccess =async (event) => {
    let DB = (event as any).target.result;
    DB.onerror = event => {
      console.error(`myDB error: ${event.target.error?.message}`)
    };
    Db.db = DB
    await personages.loadList();
    setTimeout(() => {
      fighters.loadList();
    }, 1000);
  };
}
const personages = DB.personages;
const fighters = DB.fighters;