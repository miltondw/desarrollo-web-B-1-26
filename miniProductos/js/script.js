
async function cargarComponente(id, url) {
  const resp = await fetch(url);
  const html = await resp.text();
  document.getElementById(id).innerHTML = html;
}
const template = document.getElementById("card-template");
const contenedor = document.getElementById("contenedor");

const productos = [
  { titulo: "Laptop", desc: "16GB RAM" },
  { titulo: "Mouse", desc: "Inalámbrico" },
];

productos.forEach((p) => {
  const clon = template.content.cloneNode(true);
  clon.querySelector(".title").textContent = p.titulo;
  clon.querySelector(".desc").textContent = p.desc;
  contenedor.appendChild(clon);
});


cargarComponente("header", "./components/header/header.html");
cargarComponente("footer", "./components/footer/footer.html");
