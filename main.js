const dni = document.getElementById("dni");
const $nombre = document.getElementById("nombre");
const $apellidos = document.getElementById("apellidos");
const $dniID = document.getElementById("dniID");
const $card__bg = document.querySelector(".card__bg");
const $form__container = document.querySelector(".form__container");

window.addEventListener("click", async (e) => {
  if(e.target.className === "btnBuscar" || e.target.parentNode.className === "btnBuscar" ) {
    const data = await fetchDNI(dni.value);
    console.log(data)
    $nombre.textContent = data.nombres;
    $apellidos.textContent = data.apellidoPaterno + " " + data.apellidoMaterno;
    $dniID.textContent = data.dni;
    $card__bg.classList.add("show");
    $form__container.classList.add("hidden");
  } 
});

const fetchDNI = async (dni) => {
  const response = await fetch(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imx1aXM4ODhsZnZsQGdtYWlsLmNvbSJ9.HFWqJoI8-RrO0ldDMzV3gqezjTNRDSxL7-wubW22LPQ`);
  if (!response.ok) {
    const message = `An error has occureda: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  
  return data;
}