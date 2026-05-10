function openChat() {
  const chatPanel = document.getElementById('chatPanel');
  const chatBubble = document.getElementById('chatBubble');
  if (!chatPanel || !chatBubble || !chatPanel.classList.contains('hidden')) return;
  chatPanel.classList.remove('hidden');
  chatPanel.style.display = 'flex';
  chatBubble.classList.add('hidden');
  chatBubble.style.display = 'none';
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    if (chatInput.focus) {
      try {
        chatInput.focus({ preventScroll: true });
      } catch (error) {
        chatInput.focus();
      }
    }
  }
  if (!history.state || !history.state.chatOpen) {
    history.pushState({ chatOpen: true }, '', window.location.href);
  }
}

function closeChat(fromHistory = false) {
  const chatPanel = document.getElementById('chatPanel');
  const chatBubble = document.getElementById('chatBubble');
  if (chatPanel && chatBubble) {
    chatPanel.classList.add('hidden');
    chatPanel.style.display = '';
    chatBubble.classList.remove('hidden');
    chatBubble.style.display = 'flex';
    if (!fromHistory && history.state && history.state.chatOpen) {
      history.back();
    }
  }
}

window.addEventListener('popstate', (event) => {
  const chatPanel = document.getElementById('chatPanel');
  if (!chatPanel || chatPanel.classList.contains('hidden')) return;
  if (!event.state || !event.state.chatOpen) {
    closeChat(true);
  }
});

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
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const messagesDiv = document.getElementById('chatMessages');
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user';
            userMsg.textContent = `Imagen enviada: ${file.name}`;
            messagesDiv.appendChild(userMsg);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot';
                botMsg.textContent = '¡Gracias por enviar la imagen! La revisaremos pronto.';
                messagesDiv.appendChild(botMsg);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }, 1000);
        }
    };
    input.click();
}

function recordAudio() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('🎙️ Grabación de audio no soportada en este navegador.');
        return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            const chunks = [];
            mediaRecorder.ondataavailable = e => chunks.push(e.data);
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const messagesDiv = document.getElementById('chatMessages');
                const userMsg = document.createElement('div');
                userMsg.className = 'chat-message user';
                userMsg.textContent = 'Audio enviado (simulado)';
                messagesDiv.appendChild(userMsg);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
                setTimeout(() => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'chat-message bot';
                    botMsg.textContent = '¡Gracias por enviar el audio! Lo escucharemos pronto.';
                    messagesDiv.appendChild(botMsg);
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                }, 1000);
            };
            mediaRecorder.start();
            setTimeout(() => {
                mediaRecorder.stop();
                stream.getTracks().forEach(track => track.stop());
            }, 3000); // Grabar 3 segundos
            alert('🎙️ Grabando audio por 3 segundos...');
        })
        .catch(err => {
            alert('🎙️ Error al acceder al micrófono: ' + err.message);
        });
}

function resizeChatTextarea() {
  const textarea = document.getElementById('chatInput');
  if (!textarea) return;
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 80) + 'px';
}

function setupChatProductNavigation() {
  const tabsNav = document.querySelector('.tabs-nav');
  const chatPanel = document.getElementById('chatPanel');
  const chatBubble = document.getElementById('chatBubble');
  if (!tabsNav || !chatBubble || !chatPanel) return;

  tabsNav.style.display = 'none';

  chatBubble.onclick = null;
  chatBubble.addEventListener('click', (event) => {
    event.preventDefault();
    openChat(); // Direct open chat instead of menu
  });

  // Add textarea resize listener
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('input', resizeChatTextarea);
    chatInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
  }

  // Removed menu creation
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupChatProductNavigation);
} else {
  setupChatProductNavigation();
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


// Bubble menu support removed. Remaining chat logic is unchanged.

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const chatPanel = document.getElementById('chatPanel');
        if (chatPanel && !chatPanel.classList.contains('hidden')) {
            closeChat();
        }
    }
});
