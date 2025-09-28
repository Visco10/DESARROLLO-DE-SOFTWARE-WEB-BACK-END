document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginSection = document.getElementById("login-section");
  const adminSection = document.getElementById("admin-section");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(loginForm);
    const correo = fd.get("correo").trim();
    const contraseña = fd.get("contraseña").trim();

    try {
      const res = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña })
      });

      if (!res.ok) throw new Error("Usuario o contraseña incorrectos");

      const user = await res.json();

      // Login exitoso: ocultar login y mostrar admin
      loginSection.classList.add("d-none");
      adminSection.classList.remove("d-none");

      alert(`Bienvenido, ${user.nombre}`);
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  });
});
