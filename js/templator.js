const personageTemplate = _("#personage-template").innerHTML;
const personagesList = _("#personages-list")

class Templator{
  constructor (){
    
  }
  static addPersonage(id, name, img) {
    console.log(`Templator.addPrsonage${id}  ${name}`)
    const render = mustache.render(personageTemplate, {
      id: id,
      name: name,
      img: img
    });
    let e = document.createElement("div");
    personagesList.appendChild(e);
    e.outerHTML = render;
    
  }
}