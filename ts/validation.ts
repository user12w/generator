Array.from(
  document.querySelectorAll(".needs-validate")
).forEach(form => {
  form.addEventListener("submit", event => {
    if (!form.checkValidity()){
      event.preventDefault() 
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  }, true);
  form.addEventListener("reset", event => {
    form.classList.remove("was-validated")
  });
});