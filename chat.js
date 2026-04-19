function openChat() {
  const chatPanel = document.getElementById('chatPanel');
  const chatBubble = document.getElementById('chatBubble');
  if (chatPanel && chatBubble) {
    chatPanel.classList.remove('hidden');
    chatBubble.classList.add('hidden');
    document.getElementById('chatInput')?.focus();
  }
}

function closeChat() {
  const chatPanel = document.getElementById('chatPanel');
  const chatBubble = document.getElementById('chatBubble');
  if (chatPanel && chatBubble) {
    chatPanel.classList.add('hidden');
    chatBubble.classList.remove('hidden');
  }
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const messagesDiv = document.getElementById('chatMessages');
  if (!input || !messagesDiv) return;
  const message = input.value.trim();
  if (message === '') return;
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user';
  userMsg.textContent = message;
  messagesDiv.appendChild(userMsg);
  input.value = '';
  input.style.height = 'auto';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-message bot';
    botMsg.textContent = '¡Gracias por tu mensaje! Nuestro equipo te responderá pronto.';
    messagesDiv.appendChild(botMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 1000);
}

function attachImage() {
  alert('📸 Función de enviar imagen no disponible aún. Por favor envía tu consulta por texto.');
}

function recordAudio() {
  alert('🎙️ Función de grabación de audio no disponible aún. Por favor envía tu consulta por texto.');
}

function resizeChatTextarea() {
  const textarea = document.getElementById('chatInput');
  if (!textarea) return;
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 80) + 'px';
}

document.addEventListener('keydown', function(e) {
  const chatPanel = document.getElementById('chatPanel');
  if (!chatPanel || chatPanel.classList.contains('hidden')) return;
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

document.addEventListener('click', function(event) {
  const categoriesDiv = document.querySelector('.categories-dropdown');
  if (categoriesDiv && !categoriesDiv.contains(event.target)) {
    document.getElementById('dropdownMenu')?.classList.remove('active');
  }
});
