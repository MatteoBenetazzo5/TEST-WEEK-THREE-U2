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



const form = document.getElementById("product-form");
const deleteBtn = document.getElementById("deleteBtn");
const resetBtn  = document.getElementById("resetBtn");
const pageTitle = document.getElementById("page-title");

const id = getParamId();

if (id) {
  // MODIFICA
  deleteBtn.classList.remove("d-none");
  pageTitle && (pageTitle.textContent = "Apple Store – Modifica Prodotto");
  // precompilo
  fetch(API_URL + id, { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } })
    .then(res => res.ok ? res.json() : Promise.reject(new Error(res.status)))
    .then(p => {
      document.getElementById("name").value = p.name || "";
      document.getElementById("description").value = p.description || "";
      document.getElementById("brand").value = p.brand || "";
      document.getElementById("imageUrl").value = p.imageUrl || "";
      document.getElementById("price").value = p.price ?? "";
    })
    .catch(err => console.log("Errore nel caricamento del prodotto:", err));
}

// SUBMIT
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const brand = document.getElementById("brand").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();
  const priceValue = document.getElementById("price").value.trim();

  // validazioni base
  if (!name || !description || !brand || !imageUrl || !priceValue) {
    alert("Compila tutti i campi prima di salvare.");
    return;
  }
  const price = Number(priceValue);
  if (Number.isNaN(price) || price < 0) {
    alert("Il prezzo deve essere un numero valido ≥ 0.");
    return;
  }

  const product = { name, description, brand, imageUrl, price };

  const method = id ? "PUT" : "POST";
  const url = id ? API_URL + id : API_URL;

  fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then(res => res.ok ? res.json() : res.text().then(t => Promise.reject(new Error(`HTTP ${res.status} – ${t}`))))
    .then(() => {
      alert(id ? "Prodotto aggiornato!" : "Prodotto creato!");
      if (!id) form.reset();
    })
    .catch(err => console.log("Errore nel salvataggio:", err));
});

// RESET 
resetBtn.addEventListener("click", () => {
  form.reset();
});

// DELETE
deleteBtn.addEventListener("click", () => {
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
