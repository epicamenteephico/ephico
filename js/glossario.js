// Páginas onde procurar conceitos. Acrescenta aqui as novas páginas.
const PAGINAS = ["logica.html"];

const lista = document.getElementById("lista-glossario");
const campo = document.getElementById("pesquisa");
const aviso = document.getElementById("sem-resultados");

// Ignora maiúsculas e acentos: "logica" encontra "Lógica"
function limpar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function carregarPagina(pagina) {
  const resposta = await fetch(pagina);
  if (!resposta.ok) throw new Error(pagina + ": " + resposta.status);

  const html = await resposta.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const conceitos = [];

  doc.querySelectorAll(".conceitos").forEach(function (artigo) {
    const titulo = artigo.querySelector("h5").textContent.trim();

    // Corpo = tudo menos o título
    const corpo = artigo.cloneNode(true);
    corpo.querySelector("h5").remove();

    // Secção mais próxima com id, para o link "Ver em..."
    const secao = artigo.closest("section[id]");
    let ref = null;
    if (secao) {
      const cabecalho = secao.querySelector("h2, h3");
      ref = {
        href: pagina + "#" + secao.id,
        texto: cabecalho
          ? cabecalho.textContent.trim().replace(/:$/, "")
          : secao.id
      };
    }

    conceitos.push({ titulo: titulo, html: corpo.innerHTML, ref: ref });
  });

  return conceitos;
}

function criarCartao(c) {
  const artigo = document.createElement("article");
  artigo.className = "conceitos";

  const h5 = document.createElement("h5");
  h5.textContent = c.titulo;
  artigo.appendChild(h5);

  artigo.insertAdjacentHTML("beforeend", c.html);

  if (c.ref) {
    const p = document.createElement("p");
    p.className = "ref";
    const a = document.createElement("a");
    a.href = c.ref.href;
    a.textContent = "Ver em " + c.ref.texto;
    p.appendChild(a);
    artigo.appendChild(p);
  }

  return artigo;
}

async function construirGlossario() {
  try {
    const resultados = await Promise.all(PAGINAS.map(carregarPagina));
    const todos = resultados.flat();

    // Ordem alfabética (português, ignora acentos)
    todos.sort(function (a, b) {
      return a.titulo.localeCompare(b.titulo, "pt");
    });

    lista.innerHTML = "";
    todos.forEach(function (c) {
      lista.appendChild(criarCartao(c));
    });
  } catch (erro) {
    console.error(erro);
    lista.innerHTML =
      "<p>Não foi possível carregar o glossário. Se estás a abrir o ficheiro " +
      "diretamente do computador, usa o Live Server.</p>";
  }
}

campo.addEventListener("input", function () {
  const termo = limpar(campo.value.trim());
  let visiveis = 0;

  lista.querySelectorAll(".conceitos").forEach(function (cartao) {
    const corresponde = limpar(cartao.textContent).includes(termo);
    cartao.hidden = !corresponde;
    if (corresponde) visiveis++;
  });

  aviso.hidden = visiveis > 0;
});

construirGlossario();