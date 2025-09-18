var temp;
{
  const personageTemplate = _("#personage-template").innerHTML;
  const personagesList = _("#personages-list")
  
  class Templator {
    #personageTemplate;
    #fighterTemplate;
    #personagePromise;
    constructor() {
      this.#personagePromise = this.#personageInit();
      this.#fighterInit()
    }
    async #personageInit(){
      let e = await fetch("templates/personageTemplate.mustache")
      let text= await e.text()
      this.#personageTemplate = text;
    
    }
    async #fighterInit() {
      let e = await fetch("templates/fighterTemplate.mustache");
      let text = await e.text()
      this.#fighterTemplate = text
    //  while (!this.#personageTemplate) {
    //     // Tab to edit
    //   }
    }
    async addPersonage(id, name, img) {
      console.log(`Templator.addPrsonage${id}  ${name}`)
      await this.#personagePromise;
      const render = mustache.render(this.#personageTemplate, {
        id: id,
        name: name,
        img: img
      });
      let e = document.createElement("div");
      personagesList.appendChild(e);
      e.outerHTML = render;

      
    }
    addFighter(id, name, count, maxHp, imgs, element){
      console.log(`Templator.addFighter(${id} ${name} ${count} ${maxHp} ${imgs[0]})`);
      while (!this.#fighterTemplate) {
        // Tab to edit
      }
      const render = mustache.render(this.#fighterTemplate, {
        id:id,
        name:name,
        count:count,
        maxHp:maxHp,
        img:imgs[0]
      });
      let e = document.createElement("div");
      element.appendChild(e);
      e.outerHTML = render;
    }
  }
  temp = new Templator();
}
const Templator = temp;