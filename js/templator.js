var temp;
{
  const personageTemplate = _("#personage-template").innerHTML;
  const personagesList = _("#personages-list")
  
  class Templator {
    #personageTemplate;
    #fighterTemplate;
    constructor() {
      fetch("templates/personageTemplate.txt")
      .then(e => {
        e.text()
        .then(q => {
             this.#personageTemplate = q;
        })
     
      });
      fetch("templates/fighterTemplate.txt")
      .then(e => {
        e.text()
        .then(q => {
             this.#fighterTemplate = q;
        })
     
      });
 /*     while (!(this.#fighterTemplate && this.#personageTemplate)) {
        // Tab to edit
      }*/
    }
    addPersonage(id, name, img) {
      console.log(`Templator.addPrsonage${id}  ${name}`)
      while (!this.#personageTemplate) {
        // Tab to edit
      }
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