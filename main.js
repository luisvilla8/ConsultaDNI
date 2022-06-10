const dni = document.getElementById("dni");
const $nombre = document.getElementById("nombre");
const $apellidos = document.getElementById("apellidos");
const $dniID = document.getElementById("dniID");
const $card__bg = document.querySelector(".card__bg");
const $form__container = document.querySelector(".form__container");
const $btnReset = document.querySelector(".main__btnReset");

window.addEventListener("click", (e) => {
  const { className } = e.target;
  if(className === "btnBuscar" || e.target.parentNode.className === "btnBuscar" ) {
    fetchDNI(dni.value);
  } 
  if(className === $btnReset.className){
    $form__container.classList.remove("hidden");
    $card__bg.classList.remove("show");
    $btnReset.classList.add("hidden");
  }
});

dni.addEventListener("keypress", e => {
  let exp = /^\d+(\.\d+)?/;
  if(!exp.exec(e.key)){
    e.preventDefault();
  }
})

const fetchDNI = async (dni) => {
  const response = await fetch(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imx1aXM4ODhsZnZsQGdtYWlsLmNvbSJ9.HFWqJoI8-RrO0ldDMzV3gqezjTNRDSxL7-wubW22LPQ`);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  
  showData(data);
}

const showData = ({ nombres, apellidoPaterno, apellidoMaterno, dni }) => {
  $nombre.textContent = nombres;
  $apellidos.textContent = apellidoPaterno + " " + apellidoMaterno;
  $dniID.textContent = dni;
  $card__bg.classList.add("show");
  $form__container.classList.add("hidden");
  $btnReset.classList.remove("hidden");
}