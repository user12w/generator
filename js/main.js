const personageForm = document.querySelector("#personageForm");
const personageModal = document.querySelector("#personageModal");
const bsPersonageModal = new bootstrap.Modal(personageModal);

const fighterModal = document.querySelector("#fighterModal");
const bsFighterModal = new bootstrap.Modal(fighterModal);
//bsFighterModal.show();

function getPersonageName(id) {
  console.log("getPersonageName" + id);
  return document.querySelector(`#personage${id}-name`).innerText;
}

personageModal.addEventListener("show.bs.modal", event => {
  console.log("personageModal.show.bs.modal")
  const button = event.relatedTarget;
 let id = button.dataset.id;
  const nameElement = personageForm.elements["name"];
  const textImg = personageForm.elements["textImg"]
  
  if (!id) {
    id = Math.floor((Date.now() + Math.random()) * 10000);
  } else {
    const name = personages.get(id).name;
    console.log(name);
    nameElement.value = name;
    textImg.value = personages.get(id).img
    setPersonageImgSrc()
    nameElement.dispatchEvent(new Event('input'));
  }
  personageForm.elements["id"].value = id 
  
  
  
  
  
});
personageForm.addEventListener("submit", event => {
  console.log("personageForm.submit")
  event.preventDefault()
  const id = personageForm.elements["id"].value;
  const name = personageForm.elements["name"].value;
  const img =personageForm.elements["textImg"].value;
  let personage = personages.get(id);
  
  if (personage) {
    personage.name = name;
    personage.img = img;
  } else {
    new Personage(id, name, img);
  }
  personageForm.reset()
  bsPersonageModal.hide()
}, false);
/*confirmModal(() => {
  confirmModal(null, {
    title: "Вы действительно хотите удалить персонажа?"
  })
}, {
  type: "danger",
  body: "Вы действилельно хотите удалить персонажа?",
  title: "Подтверждение удаления",
  button: "Удалить"
}); */