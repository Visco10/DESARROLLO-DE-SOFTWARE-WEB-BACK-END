// --------- ESTADO GLOBAL ----------
let state = {
  tab: "explorar",
  devices: [],
  marcas: [],
  tipos: [],
  selectedId: null,
  user: null,
  query: "",
  brand: "Todos",
  type: "Todos",
  sortBy: "fecha-desc"
};

// --------- INICIALIZACIÓN ----------
document.addEventListener("DOMContentLoaded", async () => {
  await loadInitialData();

  // Bind de tabs
  document.querySelectorAll("nav [data-tab]").forEach(btn =>
    btn.addEventListener("click", () => switchTab(btn.dataset.tab))
  );

  // Controles explorar
  document.getElementById("q").addEventListener("input", e => {
    state.query = e.target.value;
    renderList();
  });
  document.getElementById("brand").addEventListener("change", e => {
    state.brand = e.target.value;
    renderList();
  });
  document.getElementById("type").addEventListener("change", e => {
    state.type = e.target.value;
    renderList();
  });
  document.getElementById("sortBy").addEventListener("change", e => {
    state.sortBy = e.target.value;
    renderList();
  });

  // Admin
  document.getElementById("create-form").addEventListener("submit", onCreate);

  // Login
  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("submit", onLogin);

  renderList();
  switchTab("explorar");
});

// --------- CARGA INICIAL ----------
async function loadInitialData() {
  state.marcas = await loadMarcas();
  state.tipos = await loadTipos();
  state.devices = await loadDispositivos();
  populateBrandAndType();
}

// --------- FETCH API ----------
async function loadDispositivos() {
  const res = await fetch("/api/dispositivos");
  return res.json();
}

async function loadMarcas() {
  const res = await fetch("/api/marcas");
  const data = await res.json();
  return [{ id: 0, nombre: "Todos" }, ...data];
}

async function loadTipos() {
  const res = await fetch("/api/tipos");
  const data = await res.json();
  return [{ id: 0, nombre: "Todos" }, ...data];
}

async function loadComentarios(id) {
  const res = await fetch(`/api/comentarios/dispositivo/${id}`);
  return res.json();
}

async function createDispositivo(dev) {
  const res = await fetch("/api/dispositivos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dev)
  });
  return res.json();
}

async function addComentario(deviceId, c) {
  c.dispositivo_id = deviceId;
  const res = await fetch("/api/comentarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(c)
  });
  return res.json();
}

async function loginUser(correo, contraseña) {
  const res = await fetch("/api/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contraseña })
  });
  if (!res.ok) throw new Error("Usuario o contraseña incorrectos");
  return res.json();
}

// --------- POPULADO DE SELECTS ----------
function populateBrandAndType() {
  const brandSelect = document.getElementById("brand");
  const typeSelect = document.getElementById("type");
  const typeSelectAdmin = document.getElementById("type-select-admin");

  brandSelect.innerHTML = state.marcas.map(m => `<option>${m.nombre}</option>`).join("");
  typeSelect.innerHTML = state.tipos.map(t => `<option>${t.nombre}</option>`).join("");
  typeSelectAdmin.innerHTML = state.tipos.slice(1).map(t => `<option>${t.nombre}</option>`).join(""); // excluir "Todos"
}

// --------- TABS ----------
function switchTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".tab-section").forEach(s => s.classList.add("d-none"));
  document.getElementById(`tab-${tab}`).classList.remove("d-none");
  document.querySelectorAll("nav [data-tab]").forEach(btn => {
    btn.classList.toggle("btn-dark", btn.dataset.tab === tab);
    btn.classList.toggle("btn-outline-dark", btn.dataset.tab !== tab);
  });
}

// --------- CRUD DISPOSITIVOS ----------
async function onCreate(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const dev = {
    nombre: fd.get("name").trim(),
    marca: fd.get("brand").trim(),
    tipo: fd.get("type"),
    fecha_lanzamiento: fd.get("releaseDate"),
    precio: Number(fd.get("price")),
    descripcion: (fd.get("description") || "").trim(),
    imagen: fd.get("image") || ""
  };
  try {
    const nuevo = await createDispositivo(dev);
    state.devices.push(nuevo);
    e.target.reset();
    alert("Dispositivo creado!");
    renderList();
  } catch (err) {
    console.error(err);
    alert("Error al crear dispositivo");
  }
}

// --------- LOGIN ----------
async function onLogin(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const correo = fd.get("correo").trim();
  const contraseña = fd.get("contraseña").trim();
  try {
    const user = await loginUser(correo, contraseña);
    state.user = user;
    alert(`Bienvenido, ${user.nombre}`);
    e.target.reset();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// --------- FILTRADO Y RENDER ----------
function filteredDevices() {
  let list = [...state.devices];
  const q = state.query.toLowerCase();
  if (q) list = list.filter(d =>
    d.nombre.toLowerCase().includes(q) ||
    d.marca.toLowerCase().includes(q) ||
    d.tipo.toLowerCase().includes(q)
  );
  if (state.brand !== "Todos") list = list.filter(d => d.marca === state.brand);
  if (state.type !== "Todos") list = list.filter(d => d.tipo === state.type);
  switch (state.sortBy) {
    case "fecha-asc": return list.sort((a,b)=>new Date(a.fecha_lanzamiento)-new Date(b.fecha_lanzamiento));
    case "precio-asc": return list.sort((a,b)=>a.precio-b.precio);
    case "precio-desc": return list.sort((a,b)=>b.precio-a.precio);
    default: return list.sort((a,b)=>new Date(b.fecha_lanzamiento)-new Date(a.fecha_lanzamiento));
  }
}

function renderList() {
  const list = filteredDevices();
  const container = document.getElementById("device-list");
  container.innerHTML = list.map(d => cardTemplate(d)).join("");

  // Bind detalle
  container.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", () => showDetail(btn.dataset.open));
  });
}

// --------- DETALLE Y COMENTARIOS ----------
async function showDetail(id) {
  state.selectedId = Number(id);
  const d = state.devices.find(x => x.id_dispositivo === state.selectedId);
  if (!d) return;

  const detail = document.getElementById("detail");
  const date = new Date(d.fecha_lanzamiento).toLocaleDateString("es-CO");
  detail.classList.remove("d-none");
  detail.innerHTML = `
    <div class="card p-3 shadow-sm">
      <button class="btn btn-link p-0 mb-2" id="back-btn">← Volver</button>
      <div class="row g-4">
        <div class="col-md-6">
          <img class="device-img" src="/images/${d.imagen}" alt="${d.nombre}">
        </div>
        <div class="col-md-6">
          <h2 class="h5">${d.nombre}</h2>
          <div class="text-muted small">${d.marca} • ${d.tipo} • ${date}</div>
          <div class="price h5 mt-2">${d.precio.toLocaleString("es-CO", {style:"currency", currency:"COP"})}</div>
          <p class="mt-2">${d.descripcion || ""}</p>
        </div>
      </div>
      <div class="mt-4">
        <h3 class="h6">Opiniones</h3>
        <ul id="c-list" class="mt-3 list-unstyled"></ul>
        <div class="row g-2 mt-2">
          <div class="col-sm-3"><input id="c-name" class="form-control" placeholder="Tu nombre"></div>
          <div class="col-sm-2">
            <select id="c-rating" class="form-select">
              <option value="5">5 ⭐</option>
              <option value="4">4 ⭐</option>
              <option value="3">3 ⭐</option>
              <option value="2">2 ⭐</option>
              <option value="1">1 ⭐</option>
            </select>
          </div>
          <div class="col-sm-5"><input id="c-text" class="form-control" placeholder="Escribe tu opinión"></div>
          <div class="col-sm-2 d-grid"><button id="c-add" class="btn btn-dark">Publicar</button></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("back-btn").addEventListener("click", hideDetail);
  document.getElementById("c-add").addEventListener("click", async () => {
    const name = document.getElementById("c-name").value.trim();
    const text = document.getElementById("c-text").value.trim();
    const rating = Number(document.getElementById("c-rating").value);
    if (!name || !text) return alert("Nombre y comentario son obligatorios");
    await addComentario(state.selectedId, { name, texto: text, rating });
    renderComments();
    document.getElementById("c-name").value = "";
    document.getElementById("c-text").value = "";
    document.getElementById("c-rating").value = "5";
  });

  renderComments();
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function renderComments() {
  const listEl = document.getElementById("c-list");
  const items = await loadComentarios(state.selectedId);
  if (!items.length) {
    listEl.innerHTML = `<li class="text-muted small">Sé el primero en opinar.</li>`;
    return;
  }
  listEl.innerHTML = items.map(c => `
    <li class="comment mb-2">
      <div class="d-flex justify-content-between small">
        <strong>${c.name}</strong>
        <span>${new Date(c.fecha).toLocaleString("es-CO")}</span>
      </div>
      <div class="star">${"★".repeat(c.rating)}${"☆".repeat(5-c.rating)}</div>
      <div>${c.texto}</div>
    </li>
  `).join("");
}

function hideDetail() {
  state.selectedId = null;
  const detail = document.getElementById("detail");
  detail.classList.add("d-none");
  detail.innerHTML = "";
}

// --------- PLANTILLA TARJETA ----------
function cardTemplate(d) {
  const date = new Date(d.fecha_lanzamiento).toLocaleDateString("es-CO");
  return `
  <div class="col-sm-6 col-lg-4">
    <article class="card p-3 device-card h-100">
      <img class="device-img mb-2" src="/images/${d.imagen}" alt="${d.nombre}">
      <div class="d-flex justify-content-between align-items-start gap-2">
        <h3 class="h6 m-0">${d.nombre}</h3>
        <span class="badge-type">${d.tipo}</span>
      </div>
      <div class="text-muted small">${d.marca} • ${date}</div>
      <div class="price mt-1">${d.precio.toLocaleString("es-CO", {style:"currency", currency:"COP"})}</div>
      <button class="btn btn-dark w-100 mt-2" data-open="${d.id_dispositivo}">Ver detalle</button>
    </article>
  </div>
  `;
}
