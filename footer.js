/**
 * Pie de página incrustado (mismo contenido que footer.html).
 * Evita depender de fetch(), que no funciona al abrir la web desde archivo local (file://).
 */
const footerHTML = `
<footer class="footer">
  <div class="footer-section">
    <h3>Acerca de Sonic Box</h3>
    <ul>
      <li><a href="#" id="aboutBtn">Quiénes somos</a></li>
      <li><a href="#" id="privacyBtn">Políticas de privacidad</a></li>
    </ul>
  </div>
  <div class="footer-section">
    <h3>Ayuda</h3>
    <ul>
      <li><a href="#" id="faqBtn"><img src="images/Preguntas.png" alt="Preguntas" class="footer-list-icon"> <span class="footer-list-text">Preguntas frecuentes</span></a></li>
        <div id="faqModal" class="modal" style="display:none;position:fixed;z-index:1000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);justify-content:center;align-items:center;">
          <div class="modal-content" style="background:#fff;color:#222;padding:32px 24px 24px 24px;border-radius:12px;max-width:540px;width:98%;position:relative;box-shadow:0 4px 24px rgba(0,0,0,0.2);max-height:90vh;overflow-y:auto;">
            <span id="closeFaqModal" style="position:absolute;top:12px;right:18px;font-size:28px;cursor:pointer;">&times;</span>
            <h2 style="margin-top:0;">Preguntas Frecuentes</h2>
            <ol style="padding-left:0;">
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Es necesario crear una cuenta para comprar?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>No es obligatorio, puedes comprar como invitado. Sin embargo, registrarte te permite rastrear tus pedidos y guardar tus datos para compras más rápidas en el futuro.</div>
              </li>
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Cómo puedo saber el estado de mi pedido?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Una vez realizada la compra, recibirás un correo con un número de seguimiento y un enlace para monitorear el trayecto de tu paquete en tiempo real.</div>
              </li>
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Puedo modificar o añadir productos a un pedido ya realizado?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Si tu pedido aún no ha sido procesado en bodega, podemos ayudarte. Contáctanos por WhatsApp o correo en la primera hora tras tu compra.</div>
              </li>
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Qué pasa si un producto que quiero está agotado?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Puedes suscribirte a nuestra lista de espera haciendo clic en "Notificarme cuando esté disponible" en la página del producto, y recibirás un aviso automático.</div>
              </li>
            </ol>
            <h3 style="margin-bottom:4px;">Pagos y Seguridad</h3>
            <ol start="5" style="padding-left:0;">
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Qué métodos de pago puedo utilizar?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Aceptamos todas las tarjetas de crédito y débito, transferencias bancarias y pagos en efectivo mediante puntos autorizados (como agentes bancarios).</div>
              </li>
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Los precios incluyen impuestos?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Sí, todos los precios mostrados en SONIC BOX ya incluyen el IVA. No tendrás sorpresas al finalizar tu pago.</div>
              </li>
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Es seguro ingresar mi tarjeta de crédito en su sitio?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Totalmente. Utilizamos pasarelas de pago con encriptación SSL de grado bancario, lo que significa que nosotros nunca almacenamos ni vemos los datos de tu tarjeta.</div>
              </li>
            </ol>
            <h3 style="margin-bottom:4px;">Envíos y Logística</h3>
            <ol start="8" style="padding-left:0;">
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Cuál es el tiempo de entrega estimado?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Para ciudades principales el tiempo es de 2 a 4 días hábiles. Para áreas departamentales o rurales, puede demorar entre 5 y 8 días hábiles.</div>
              </li>
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Tienen entregas el mismo día?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Sí, contamos con servicio de "Entrega Express" para compras realizadas antes de las 11:00 AM dentro de la ciudad capital.</div>
              </li>
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Qué sucede si no estoy en casa cuando llegue el repartidor?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>El servicio de mensajería realizará hasta dos intentos de entrega. Si no logran contactarte, el paquete regresará a nuestra central y coordinaremos un nuevo envío (podría aplicar un costo extra).</div>
              </li>
            </ol>
            <h3 style="margin-bottom:4px;">Garantías y Devoluciones</h3>
            <ol start="11" style="padding-left:0;">
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Qué hago si mi producto llega dañado o incompleto?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Cuentas con 48 horas tras recibirlo para reportar cualquier daño físico. Escríbenos con fotos del empaque y del producto para enviarte un reemplazo inmediato.</div>
              </li>
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Los productos tienen garantía?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Sí, todos nuestros artículos tecnológicos cuentan con una garantía de fábrica (el tiempo varía según el fabricante, especificado en la ficha del producto).</div>
              </li>
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Puedo devolver un producto si no me gusta?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Aceptamos devoluciones por retracto dentro de los primeros 5 días, siempre que el producto esté sellado, con empaque original y sin señales de uso.</div>
              </li>
            </ol>
            <h3 style="margin-bottom:4px;">Contacto y Soporte</h3>
            <ol start="14" style="padding-left:0;">
              <li style='margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;'>
                <div style='font-weight:bold;min-width:140px;max-width:180px;flex:0 0 160px;margin-bottom:0;word-break:break-word;'>¿Cómo puedo contactar con soporte técnico?</div>
                <div style='font-weight:400;flex:1 1 0;min-width:180px;'>Estamos disponibles de lunes a viernes de 8:00 AM a 6:00 PM a través de nuestro chat en vivo, correo electrónico de soporte o nuestra línea directa de WhatsApp.</div>
              </li>
            </ol>
          </div>
        </div>
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
  <div id="aboutModal" class="modal" style="display:none;position:fixed;z-index:1000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);justify-content:center;align-items:center;">
    <div class="modal-content" style="background:#fff;color:#222;padding:32px 24px 24px 24px;border-radius:12px;max-width:400px;width:90%;position:relative;box-shadow:0 4px 24px rgba(0,0,0,0.2);">
      <span id="closeAboutModal" style="position:absolute;top:12px;right:18px;font-size:28px;cursor:pointer;">&times;</span>
      <h2 style="margin-top:0;">Quiénes somos</h2>
      <h3 style="margin-bottom:4px;">Misión</h3>
      <p style="margin-top:0;">Brindar a nuestros clientes la mejor experiencia en tecnología y sonido, ofreciendo productos innovadores y un servicio excepcional.</p>
      <h3 style="margin-bottom:4px;">Visión</h3>
      <p style="margin-top:0;">Ser la tienda líder en soluciones de audio y tecnología, reconocida por la calidad, confianza y satisfacción de nuestros clientes.</p>
    </div>
  </div>
  <div id="privacyModal" class="modal" style="display:none;position:fixed;z-index:1000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);justify-content:center;align-items:center;">
    <div class="modal-content" style="background:#fff;color:#222;padding:32px 24px 24px 24px;border-radius:12px;max-width:480px;width:95%;position:relative;box-shadow:0 4px 24px rgba(0,0,0,0.2);max-height:90vh;overflow-y:auto;">
      <span id="closePrivacyModal" style="position:absolute;top:12px;right:18px;font-size:28px;cursor:pointer;">&times;</span>
      <h2 style="margin-top:0;">Políticas de Privacidad</h2>
      <ul style="padding-left:18px;">
        <li><b>Calidad Garantizada:</b> Todos los productos ofrecidos deben pasar por un control de calidad antes de ser listados en la plataforma.</li>
        <li><b>Privacidad de Datos:</b> La información de los clientes se maneja bajo estrictos estándares de seguridad y nunca será compartida con terceros sin consentimiento explícito.</li>
        <li><b>Transparencia en Precios:</b> El precio final mostrado al usuario incluirá todos los impuestos aplicables, evitando cargos ocultos al finalizar la compra.</li>
        <li><b>Política de Devoluciones:</b> El cliente dispone de un periodo determinado (30 días) para solicitar cambios o devoluciones si el producto presenta fallas de fábrica.</li>
        <li><b>Atención al Cliente:</b> Todas las consultas recibidas por canales oficiales serán respondidas en un plazo máximo de 24 horas hábiles.</li>
        <li><b>Sostenibilidad:</b> Tienda SONIC BOX se compromete a reducir el uso de plásticos en sus embalajes de envío de forma progresiva.</li>
        <li><b>Actualización Constante:</b> El inventario y la plataforma tecnológica se actualizarán periódicamente para ofrecer siempre lo último en tendencias.</li>
        <li><b>Ética Comercial:</b> No se permite la venta de productos replicados o que infrinjan derechos de propiedad intelectual.</li>
        <li><b>Entregas Eficientes:</b> Se garantiza el despacho de productos en los tiempos estipulados al momento de la compra, informando siempre el estado del envío.</li>
        <li><b>Inclusión y Diversidad:</b> No se tolerará ningún tipo de discriminación en el trato con clientes, proveedores o colaboradores de la tienda.</li>
      </ul>
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

// Modales footer
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    // Quiénes somos
    var aboutBtn = document.getElementById('aboutBtn');
    var aboutModal = document.getElementById('aboutModal');
    var closeAboutBtn = document.getElementById('closeAboutModal');
    if (aboutBtn && aboutModal && closeAboutBtn) {
      aboutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        aboutModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
      function closeAboutModal() {
        aboutModal.style.display = 'none';
        document.body.style.overflow = '';
      }
      closeAboutBtn.addEventListener('click', closeAboutModal);
      window.addEventListener('click', function(event) {
        if (event.target === aboutModal) {
          closeAboutModal();
        }
      });
    }
    // Políticas de privacidad
    var privacyBtn = document.getElementById('privacyBtn');
    var privacyModal = document.getElementById('privacyModal');
    var closePrivacyBtn = document.getElementById('closePrivacyModal');
    if (privacyBtn && privacyModal && closePrivacyBtn) {
      privacyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        privacyModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
      function closePrivacyModal() {
        privacyModal.style.display = 'none';
        document.body.style.overflow = '';
      }
      closePrivacyBtn.addEventListener('click', closePrivacyModal);
      window.addEventListener('click', function(event) {
        if (event.target === privacyModal) {
          closePrivacyModal();
        }
      });
    }
    // Preguntas frecuentes
    var faqBtn = document.getElementById('faqBtn');
    var faqModal = document.getElementById('faqModal');
    var closeFaqBtn = document.getElementById('closeFaqModal');
    if (faqBtn && faqModal && closeFaqBtn) {
      faqBtn.addEventListener('click', function(e) {
        e.preventDefault();
        faqModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
      function closeFaqModal() {
        faqModal.style.display = 'none';
        document.body.style.overflow = '';
      }
      closeFaqBtn.addEventListener('click', closeFaqModal);
      window.addEventListener('click', function(event) {
        if (event.target === faqModal) {
          closeFaqModal();
        }
      });
    }
  }, 100);
});
