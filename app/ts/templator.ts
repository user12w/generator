// var temp;
namespace Templator {
  // const personageTemplate = _("personage-template").innerHTML;
  const personagesList = _("#personages-list");
  let fighterTemplate: string;
  let personageTemplate: string;
  let personagePromise: Promise<void>;
  let fighterImageTemplate: string;
  let fighterPromise: Promise<void>;
  let fighterImagePromise: Promise<void>;
  export function init() {
    personagePromise = personageInit();
    fighterPromise = fighterInit();
    fighterImagePromise = fighterImageInit();
  }
  async function personageInit() {
    let e = await fetch("templates/personageTemplate.mustache")
    let text = await e.text()
    personageTemplate = text;
  }
  async function fighterInit() {
    let e = await fetch("templates/fighterTemplate.mustache");
    let text = await e.text()
    fighterTemplate = text
  }
  async function fighterImageInit() {
    let e = await fetch("templates/fighterImageTemplate.mustache");
    let text: string = await e.text();
    fighterImageTemplate = text;
  }
  export async function addPersonage(id: number, name: string, img: string) {
    console.log(`Templator.addPrsonage${id}  ${name}`)
    await personagePromise;
    const render = mustache.render(personageTemplate, {
      id: id,
      name: name,
      img: img
    });
    let e = document.createElement("div");

    personagesList.appendChild(e);
    e.outerHTML = render;


  }
  export async function addFighter(id: number, name: string, count: number, maxHp: number, imgs: string[], element: Element) {
    console.log(`Templator.addFighter(${id} ${name} ${count} ${maxHp} ${imgs[0]})`);
    await fighterPromise;
    const render = mustache.render(fighterTemplate, {
      id: id,
      name: name,
      count: count,
      maxHp: maxHp,
      img: imgs[0]
    });
    let e = document.createElement("div");
    element.appendChild(e);
    e.outerHTML = render;
  }
  export async function addfighterImage(data: {src: string, id: number}, element: HTMLElement, ondelete: (event: PointerEvent) => void) {
    console.log(`Templator.addfighterImage(, src=...)`)
    await fighterImagePromise;
    const reader: string = mustache.render(fighterImageTemplate,  data);
    let e = document.createElement("div");
    element.appendChild(e);
    e.outerHTML = reader;
    let e2 = (_(`#fighterImage${data.id} .delete-button`) as HTMLButtonElement);
    e2.addEventListener("click", event => {
      e2.parentElement.outerHTML= "";
      ondelete(event);
    });
  }
}

// const Templator = temp;
Templator.init()