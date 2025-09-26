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
  count.addEventListener("input", (event) => {
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
  function addImg(src: string) {
    imgCount.value = Number(imgCount.value) + 1
    let data = JSON.parse(imgs.value);
    const id = generateId();
    data[id] = src;
    imgs.value = JSON.stringify(data);
    let element = Templator.addfighterImage({src: src, id: id}, imgList, (event) => {
      data[id] = undefined;
      imgCount.value = Number(imgCount.value) - 1
    });
  }
  fileInput.addEventListener("change", event => {
    const files = fileInput.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = e => {
        addImg(String(e.target.result));
      };
      reader.readAsDataURL(file)
    }
  });
  modal.addEventListener("show.bs.modal", event => {
    console.log("fighterModal.show.bs.modal");
    const button = event.relatedTarget;
    const id = button.dataset.id;
    if (id) {
      const fighter = fighters.get(id);
      if (!fighter) {
        throw new Error(`no fighter with id ${id}`);
      }
      const data = fighter.db;
      for (const key in data) {
        console.log(`data[${key}] = ${data[key]}`);
        try {
          const element = data[key];
          e[key].value = element;
          e[key].focus();
          e[key].blur();
          
        } catch (error) {
          console.error(error);
          
        }
      }
      {
        const imgs = data.imgs;
        e.imgs.value = JSON.stringify(imgs);
        imgs.forEach(element => {
          addImg(element);
        });
      }
      fighterId.value = id
    } else {
      personageId.value = button.dataset.personageId;
      fighterId.value = generateId()
    }
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

    let imgs = JSON.parse(o.imgs);
    let imgs2=[];
    for (const key in imgs) {
      if (Object.prototype.hasOwnProperty.call(imgs, key)) {
        const element = imgs[key];
        imgs2.push(element);
      }
    }
    o.imgs=imgs2;

    console.log(o);
    // console.log(new Fighter(o));
    const fighter = new Fighter(o);
    bsModal.hide();
  });
  modal.addEventListener("hide.bs.modal", event => {
    form.reset();
  });
}