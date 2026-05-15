/**
 * Pie de página incrustado (mismo contenido que footer.html).
 * Evita depender de fetch(), que no funciona al abrir la web desde archivo local (file://).
 */
const footerHTML = `
<footer class="footer">
  <div class="footer-section">
    <h3>Acerca de Sonic Box</h3>
    <ul>
      <li><a href="#">Quiénes somos</a></li>
      <li><a href="#">Políticas de privacidad</a></li>
    </ul>
  </div>
  <div class="footer-section">
    <h3>Ayuda</h3>
    <ul>
      <li><a href="#"><img src="images/Preguntas.png" alt="Preguntas" class="footer-list-icon"> <span class="footer-list-text">Preguntas frecuentes</span></a></li>
      <li><a href="#"><img src="images/Vender.png" alt="Vender" class="footer-list-icon"> <span class="footer-list-text">Cómo vender en Sonic Box</span></a></li>
    </ul>
  </div>
  <div class="footer-section">
    <h3>Contacto</h3>
    <ul>
      <li><a href="https://wa.me/50223005678" target="_blank"><img src="images/Whatsapp.png" alt="Whatsapp" class="footer-list-icon"> <span class="footer-list-text">Escríbenos en WhatsApp</span></a></li>
      <li><a href="mailto:info@sonicbox.com"><img src="images/Email.png" alt="Email" class="footer-list-icon"> <span class="footer-list-text">Envíanos un email</span></a></li>
      <li><a href="tel:+50223005678"><img src="images/Llamada.png" alt="Llamada" class="footer-list-icon"> <span class="footer-list-text">+502 2300-5678</span></a></li>
    </ul>
  </div>
  <div class="footer-brand">
    <div class="footer-logo">SONIC BOX</div>
    <div class="footer-icons">
      <a href="https://www.facebook.com/JBL" target="_blank" rel="noopener noreferrer"><img src="images/Facebook.png" alt="Facebook" class="footer-icon"></a>
      <a href="https://www.youtube.com/jbl" target="_blank" rel="noopener noreferrer"><img src="images/Youtube.png" alt="YouTube" class="footer-icon"></a>
    </div>
  </div>
</footer>
`.trim();

function insertSiteFooter() {
    const el = document.getElementById('site-footer');
    if (el) {
        el.innerHTML = footerHTML;
    }
}

document.addEventListener('DOMContentLoaded', insertSiteFooter);
