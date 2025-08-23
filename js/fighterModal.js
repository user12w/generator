{
  const modal = _("#fighterModal")
  const form = _("#fighterForm");
  const e = form.elements;
  const count = e["count"];
  const countOnStart = e["countOnStart"];
  const addImgButton = _("#addFighterImgButton");
  const imgCount = e["imgsCount"];
  const imgList = _("#fighterImgList");
  const imgs = e["imgs"];
  const fileInput = e["imgsInput"];
  count.addEventListener("input", event => {
    const v= count.value
    countOnStart.max = v;
    imgCount.min = v;
    imgCount.max = v;
  });
  form.addEventListener("reset", e => {
    imgList.innerHTML = "";
  });
  addImgButton.addEventListener("click", e => {
    fileInput.click();
  });
  fileInput.addEventListener("change", event => {
    const files = fileInput.files;
    for (const file of files) {
      imgCount.value = Number(imgCount.value)+1
      const reader = new FileReader();
      reader.onload = e => {
        let element =  document.createElement("img");
        element.style.height = "50px";
        element.style.width= "50px";
        element.style.padding= "0px"
        element.classList.add("rounded-2", "col-auto", "border");
        element.src = e.target.result;
        imgList.appendChild(element);
        const data = JSON.parse(imgs.value);
        data.add(e.target.result);
        imgs.value = JSON.stringify(data)
      };
      reader.readAsDataURL(file)
    }
  });
  modal.addEventListener("show.bs.modal", event => {
    console.log("fighterModal.show.bs.modal");
    const button = event.relatedTarget;
    let id = button.dataset.id;
    if (id) {
      console.error("ошибка")
    } else {
      
    }
  });
}