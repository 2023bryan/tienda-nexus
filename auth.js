const AUTH_KEY = 'auth_user';

function getStoredUsers() {
    try {
        return JSON.parse(localStorage.getItem('users')) || [];
    } catch {
        localStorage.removeItem('users');
        return [];
    }
}

function saveUser(email, password, profile) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    if (users.find(u => u.email === normalizedEmail)) {
        return { success: false, message: 'El correo ya está registrado' };
    }

    let name;
    let nombres = '';
    let apellidos = '';
    let telefono = '';

    if (typeof profile === 'string') {
        name = profile.trim();
    } else {
        nombres = profile.nombres.trim();
        apellidos = profile.apellidos.trim();
        telefono = profile.telefono.trim();
        name = `${nombres} ${apellidos}`.trim();
    }

    users.push({
        email: normalizedEmail,
        password,
        name,
        nombres,
        apellidos,
        telefono,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, message: 'Usuario registrado correctamente' };
}

function authenticateUser(email) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const user = users.find(u => u.email === normalizedEmail);
    if (user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: 'Este correo no está registrado. Crea una cuenta primero.' };
}

function getCurrentUser() {
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        localStorage.removeItem(AUTH_KEY);
        return null;
    }
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'index.html';
}

function initLoginPage() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    if (getCurrentUser()) {
        window.location.href = 'index.html';
        return;
    }

    loginBtn.addEventListener('click', function() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Por favor completa todos los campos');
            return;
        }

        const result = authenticateUser(email);
        if (result.success) {
            alert('¡Bienvenido, ' + result.user.name + '!');
            window.location.href = 'index.html';
        } else {
            alert(result.message);
        }
    });
}

function setFieldError(fieldKey, hasError) {
    const field = document.querySelector(`.field[data-field="${fieldKey}"]`);
    if (field) {
        field.classList.toggle('has-error', hasError);
    }
}

function clearRegisterErrors() {
    document.querySelectorAll('.field[data-field]').forEach(field => {
        field.classList.remove('has-error');
    });
}

function initRegisterPage() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    if (getCurrentUser()) {
        window.location.href = 'index.html';
        return;
    }

    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', () => {
            const input = document.getElementById(button.dataset.target);
            if (!input) return;
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            button.setAttribute(
                'aria-label',
                isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
            );
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        clearRegisterErrors();

        const email = document.getElementById('email').value.trim();
        const nombres = document.getElementById('nombres').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        const captchaChecked = document.getElementById('captchaCheck').checked;

        let valid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailPattern.test(email)) {
            setFieldError('email', true);
            valid = false;
        }
        if (!nombres) {
            setFieldError('nombres', true);
            valid = false;
        }
        if (!apellidos) {
            setFieldError('apellidos', true);
            valid = false;
        }
        if (!telefono || telefono.length < 8) {
            setFieldError('telefono', true);
            valid = false;
        }
        if (!password || password.length < 6) {
            setFieldError('password', true);
            valid = false;
        }
        if (password !== passwordConfirm) {
            setFieldError('passwordConfirm', true);
            valid = false;
        }
        if (!captchaChecked) {
            alert('Por favor confirma que no eres un robot');
            valid = false;
        }
        if (!valid) return;

        const result = saveUser(email, password, { nombres, apellidos, telefono });
        if (result.success) {
            alert(result.message + '. Ahora puedes iniciar sesión.');
            window.location.href = 'login.html';
        } else {
            alert(result.message);
        }
    });
}
