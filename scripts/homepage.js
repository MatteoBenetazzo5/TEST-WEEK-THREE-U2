// UGUALE IN TUTTE LE 3 PAGINE JS
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThmZmY0YmQ0NzAwMTU4NWIxZDUiLCJpYXQiOjE3NjI1MDI5MTEsImV4cCI6MTc2MzcxMjUxMX0.5u5w2w52A1QJRuhOceRXf1VruyVxRVSQJM5zZPFJirs";

// anno che si aggiorna in automatico in fondo alla pagina
const getYearInFooter = () => (
  document.getElementById("year").innerText = new Date().getFullYear()
);
getYearInFooter();

// FUNZIONE CHE RENDERIZZA I PRODOTTI ALL'INTERNO DELLA PAGINA
function renderProducts(list) {
  const row = document.getElementById("products-row");
  row.innerHTML = "";
  list.forEach(p => {
    row.innerHTML += `
      <div class="col">
        <div class="card h-100 d-flex flex-column">
          <img src="${p.imageUrl || "https://picsum.photos/600/400"}" class="card-img-top" alt="${p.name}">
          <div class="card-body flex-grow-1">
            <h5 class="card-title d-flex justify-content-between align-items-start">
              <span>${p.name}</span>
              <span class="badge text-bg-light bg-white">${p.brand || "Apple"}</span>
            </h5>
            <p class="card-text">${p.description || ""}</p>
            <p class="fw-bold mb-0">${Number(p.price).toFixed(2)} €</p>
          </div>
          <div class="card-footer d-flex gap-2">
            <a href="./details.html?productId=${p._id}" class="btn btn-outline-light w-100">Dettagli</a>
            <a href="./back-office.html?productId=${p._id}" class="btn bg-white text-black w-100">Modifica</a>
          </div>
        </div>
      </div>`;
  });
}

// FUNZIONE CHE METTE/MOSTRA I PRODOTTI ALL'INTERNO DELLA PAGINA
function getProducts() {
  fetch(API_URL, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
  })
    .then(res => res.ok ? res.json() : res.text().then(t => Promise.reject(new Error(`HTTP ${res.status} – ${t}`))))
    .then(renderProducts)
    .catch(err => console.log("Errore nel caricamento prodotti:", err));
}

getProducts();

