function openNav() {
  document.getElementById("accordion").style.width = "350px";
  document.getElementById("conteudo").style.marginLeft = "350px";
  document.querySelector(".openbtn").classList.add("hidden");

}

function closeNav() {
  document.getElementById("accordion").style.width = "0";
  document.getElementById("conteudo").style.marginLeft = "0";
  document.querySelector(".openbtn").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", function() {
    const sidebarHTML = `
    <button type="button" class="openbtn" onclick="openNav()">&#9776; Menu</button>
    <div class="accordion" id="accordion">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        
        <a href="index.html" class="logo-container">
          <img src="imagens/logoacabada.png" alt="Logo Ephico" class="sidebar-logo">
          <span class="logo-text">Ephico</span>
        </a>

        <details name="sidebar-element">
            <summary>Introdução</summary>
            <div class="panel">
                <p>Lorem ipsum dolor sit amet...</p>
            </div>
        </details>
        
        <details name="sidebar-element">
            <summary>Lógica</summary>
            <div class="panel">
              <a href="logica.html#conteudo">2. Índice</a>
              <ul>
                <li><a href="logica.html#introducao">2.1) Introdução</a></li>
                <li><a href="logica.html#logica-proposicional">2.2) Lógica proposicional</a></li>
              </ul>            
            </div>
        </details>

        <details name="sidebar-element">
            <summary>Livre-Arbítrio</summary>
            <div class="panel"><p>Lorem ipsum dolor sit amet...</p></div>
        </details>

        <details name="sidebar-element">
            <summary>Ética</summary>
            <div class="panel"><p>Lorem ipsum dolor sit amet...</p></div>
        </details>

        <details name="sidebar-element">
            <summary>Justiça</summary>
            <div class="panel"><p>Lorem ipsum dolor sit amet...</p></div>
        </details>

        <a href="glossario.html" class="sidebar-element">teste</a>
    </div>`;

    const container = document.getElementById('sidebar-container');
    if (container) {
        container.innerHTML = sidebarHTML;
    }
});