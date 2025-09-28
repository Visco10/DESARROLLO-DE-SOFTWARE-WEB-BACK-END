document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('create-form');

  createForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(createForm));
    try {
      const res = await fetch('http://localhost:3000/dispositivo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      alert(`Dispositivo creado: ${data.nombre}`);
      createForm.reset();
    } catch (err) {
      console.error(err);
      alert('Error al crear dispositivo');
    }
  });
});
