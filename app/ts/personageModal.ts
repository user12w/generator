const setPersonageImgSrc = (() => {
  const btn: HTMLButtonElement = document.querySelector("#personageAddImgButton");
  const fileInput: HTMLInputElement = document.querySelector("#personageImgInput");
  const form = fileInput.form;
  const img: HTMLImageElement = document.querySelector("#personageImg");
  const text: HTMLInputElement = document.querySelector("#personageTextImg")
  let file;

  btn.addEventListener("click", event => {
    fileInput.click();
  });

  fileInput.addEventListener("change", event => {
    if (fileInput.value) {
      file = fileInput.files[0];
    } else {

    }
    const reader = new FileReader();
    reader.onload = e => {
      img.src = String(e.target.result);
      text.value = String(e.target.result);
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener("reset", event => {
    img.src = "";
    file = null;
  });

  function setPersonageImgSrc() {
    img.src = text.value;
  }
  return setPersonageImgSrc;
})();