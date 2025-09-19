console.log("figghterModal.js");
//// <reference path="ts/bootstrap.min.js" />
//import {  bootstrap } from "bootstrap.esm.min.js";
{
  const modal = _("#fighterModal");
  const bsModal = new bootstrap.Modal("#fighterModal");
  const form = _("#fighterForm");
  const e = form.elements;
  const personageId = e["personageId"];
  const count = e["count"];
  const countOnStart = e["countOnStart"];
  const addImgButton = _("#addFighterImgButton");
  const imgCount = e["imgsCount"];
  const imgList = _("#fighterImgList");
  const imgs = e["imgs"];
  const fileInput = e["imgsInput"];
  const fighterId = e["id"];
  count.addEventListener("input", event => {
    const v = count.value
    countOnStart.max = v;
    imgCount.min = v;
    imgCount.max = v;
  });
  form.addEventListener("reset", event => {
    imgList.innerHTML = "";
  });
  addImgButton.addEventListener("click", event => {
    fileInput.click();
  });
  function addImg(src) {
    let element = document.createElement("img");
    element.style.height = "50px";
    element.style.width = "50px";
    element.style.padding = "0px"
    element.classList.add("rounded-2", "col-auto", "border");
    element.src = src;
    imgList.appendChild(element);
    const data = JSON.parse(imgs.value);
    data.push(src);
    imgs.value = JSON.stringify(data)
  }
  fileInput.addEventListener("change", event => {
    const files = fileInput.files;
    for (const file of files) {
      imgCount.value = Number(imgCount.value) + 1
      const reader = new FileReader();
      reader.onload = e => {
        addImg(e.target.result);
      };
      reader.readAsDataURL(file)
    }
  });
  modal.addEventListener("show.bs.modal", event => {
    console.log("fighterModal.show.bs.modal");
    const button = event.relatedTarget;
    let id = button.dataset.id;
    if (id) {
      const fighter = fighters.get(id);
      if (!fighter) {
        throw new Error(`no fighter with id ${id}`);
      }
      const data = fighter.db;
      for (const key in data) {
        console.log(`data[${key}] = ${data[key]}`);

        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          e[key].value = element;
        }
      }
      {
        const imgs = data.imgs;
        e.imgs.value = JSON.stringify(imgs);
        imgCount.value = imgs.length;
        imgs.forEach(element => {
          addImg(element);
        });
      }
    } else {
      personageId.value = button.dataset.personageId;
      id = Math.floor((Date.now() + Math.random()) * 10000)
    }
    fighterId.value = id
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    let o: any = {};
    // console.log(e);

    for (const key in e) {
      const element = e[key];
      o[element.name] = element.value;
    }
    console.log(o.imgs);

    o.imgs = JSON.parse(o.imgs);
    console.log(o);
    // console.log(new Fighter(o));
    const fighter = new Fighter(o);
    bsModal.hide();
  });
  modal.addEventListener("hide.bs.modal", event => {
    form.reset();
  });
}