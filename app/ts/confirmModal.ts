//const confirm = document.querySelector("#confirmModal");
const bsConfirm = new bootstrap.Modal("#confirmModal")
const title = document.querySelector("#confirmModalTitle");
const body = document.querySelector("#confirmModalBody");
const button = document.querySelector("#confirmModalButton");

const confirmType2 = {
  "danger": "btn-danger",
  "primary": "btn-primary"
};
enum confirmType{
 "danger"= "btn-danger",
  "primary"= "btn-primary"
}
interface confirmModalData{
  title?: string;
  body?: string;
  button?:string;
  type?: confirmType
}
const confirmTypes = ["btn-danger", "btn-primary"]
function confirmModal(callBack: () => void, data?: confirmModalData) {
  title.textContent = data.title || "Подтверждение";
  body.innerHTML = data.body || "";

  confirmTypes.forEach(q => {
    button.classList.remove(q)
  });
  button.classList.add(confirmType[data.type] || "btn-primary");
  (button as any).onclick = callBack;
  button.textContent = data.button || "Подтвердить"
  bsConfirm.show();


}