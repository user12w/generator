const setPersonageImgSrc = ()=>{const btn = document.querySelector("#personageAddImgButton");
const fileInput = document.querySelector("#personageImgInput");
const form = fileInput.form;
const img = document.querySelector("#personageImg");
const text = document.querySelector("#personageTextImg")
let file;

btn.addEventListener("click", event => {
  fileInput.click();
});

fileInput.addEventListener("change", event => {
  if (fileInput.value) {
    file = fileInput.files[0];
  }else{
   
  }
  const reader = new FileReader();
  reader.onload = e => {
    img.src = e.target.result;
    text.value = e.target.result;
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
}
