// UGUALE IN TUTTE LE 3 PAGINE JS
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThmZmY0YmQ0NzAwMTU4NWIxZDUiLCJpYXQiOjE3NjI1MDI5MTEsImV4cCI6MTc2MzcxMjUxMX0.5u5w2w52A1QJRuhOceRXf1VruyVxRVSQJM5zZPFJirs";

// anno che si aggiorna in automatico in fondo alla pagina
const getYearInFooter = () => (document.getElementById("year").innerText = new Date().getFullYear());
getYearInFooter();

// FUNZIONE CHE SERVE PER LEGGERE IL VALORE DI UN PARAMETRO DALL’URL, 
// PRENDE L'ID DEL PRODOTTO 
function getParamId() {
  const params = new URLSearchParams(location.search);
  return params.get("productId");
}

// FUNZIONE PER CARICARE DAL SERVER I DETTAGLI DI UN SINGOLO PRODOTTO 
// E MOSTRARLI NELLA PAGINA
const id = getParamId();

function getDetails() {
  fetch(API_URL + id, { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } })
    .then(res => res.json())
    .then(p => {
      document.getElementById("name").innerText = p.name || "";
      document.getElementById("brand").innerText = p.brand || "Apple";
      document.getElementById("description").innerText = p.description || "";
      document.getElementById("price").innerText = `${Number(p.price).toFixed(2)} €`;
      document.getElementById("image").src = p.imageUrl || "https://picsum.photos/600/600";
      document.getElementById("edit-link").href = `./back-office.html?productId=${p._id}`;
    })
    .catch(err => console.log("Errore nel recupero dettagli:", err));
}
getDetails();

// ELIMINAZIONE PRODOTTO
document.getElementById("delete-btn").addEventListener("click", () => {
  fetch(API_URL + id, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  })
    .then(res => res.ok ? res.json() : Promise.reject(new Error(res.status)))
    .then(() => {
      alert("Prodotto eliminato.");
      location.assign("./homepage.html");
    })
    .catch(err => console.log("Errore nell’eliminazione:", err));
});
