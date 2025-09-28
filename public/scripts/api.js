// api.js

const API_URL = "http://localhost:3000/api";

// --------- DISPOSITIVOS ----------
async function loadDispositivos() {
  try {
    const res = await fetch(`${API_URL}/dispositivos`);
    const data = await res.json();

    // Mapear la ruta de la imagen para que apunte a public/Imagenes
    return data.map(d => ({
      ...d,
      images: d.images && d.images.length
        ? d.images.map(img => `/Imagenes/${img}`)
        : []
    }));
  } catch (err) {
    console.error("Error cargando dispositivos:", err);
    return [];
  }
}

// --------- MARCAS ----------
async function loadMarcas() {
  try {
    const res = await fetch(`${API_URL}/marcas`);
    return await res.json();
  } catch (err) {
    console.error("Error cargando marcas:", err);
    return [];
  }
}

// --------- TIPOS ----------
async function loadTipos() {
  try {
    const res = await fetch(`${API_URL}/tipos`);
    return await res.json();
  } catch (err) {
    console.error("Error cargando tipos:", err);
    return [];
  }
}

// --------- CREAR DISPOSITIVO ----------
async function createDispositivo(device) {
  try {
    const res = await fetch(`${API_URL}/dispositivos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(device)
    });
    const nuevo = await res.json();
    nuevo.images = nuevo.images.map(img => `/Imagenes/${img}`);
    return nuevo;
  } catch (err) {
    console.error("Error creando dispositivo:", err);
    throw err;
  }
}

// --------- COMENTARIOS ----------
async function loadComentarios(dispositivoId) {
  try {
    const res = await fetch(`${API_URL}/comentarios?dispositivoId=${dispositivoId}`);
    return await res.json();
  } catch (err) {
    console.error("Error cargando comentarios:", err);
    return [];
  }
}

async function addComentario(dispositivoId, comment) {
  try {
    const res = await fetch(`${API_URL}/comentarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...comment, dispositivoId })
    });
    return await res.json();
  } catch (err) {
    console.error("Error agregando comentario:", err);
    throw err;
  }
}

// --------- LOGIN ----------
async function loginUser(correo, contraseña) {
  try {
    const res = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña })
    });
    if (!res.ok) throw new Error("Usuario o contraseña incorrectos");
    return await res.json();
  } catch (err) {
    console.error("Error login:", err);
    throw err;
  }
}
