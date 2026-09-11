// ========== Variables Globales ==========
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberCheckbox = document.getElementById('remember');
const submitBtn = document.querySelector('.btn-submit');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
const modalMessage = document.getElementById('modalMessage');

// ========== Email Validation ==========
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const checkEmailValidity = () => {
    const emailCheck = document.getElementById('emailCheck');
    const emailError = document.getElementById('emailError');
    const email = emailInput.value.trim();

    if (email === '') {
        emailCheck.classList.remove('show');
        emailError.classList.remove('show');
        return false;
    }

    if (validateEmail(email)) {
        emailCheck.classList.add('show');
        emailError.classList.remove('show');
        return true;
    } else {
        emailCheck.classList.remove('show');
        emailError.textContent = 'Por favor ingresa un email válido';
        emailError.classList.add('show');
        return false;
    }
};

// ========== Password Validation ==========
const validatePassword = (password) => {
    return password.length >= 6;
};

const checkPasswordValidity = () => {
    const passwordError = document.getElementById('passwordError');
    const password = passwordInput.value;

    if (password === '') {
        passwordError.classList.remove('show');
        return false;
    }

    if (validatePassword(password)) {
        passwordError.classList.remove('show');
        return true;
    } else {
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
        passwordError.classList.add('show');
        return false;
    }
};

// ========== Toggle Password Visibility ==========
togglePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🙈';
});

// ========== Real-time Validation ==========
emailInput.addEventListener('blur', checkEmailValidity);
emailInput.addEventListener('input', checkEmailValidity);
passwordInput.addEventListener('blur', checkPasswordValidity);
passwordInput.addEventListener('input', checkPasswordValidity);

// ========== Form Submit ==========
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validar campos
    const emailValid = checkEmailValidity();
    const passwordValid = checkPasswordValidity();

    if (!emailValid || !passwordValid) {
        return;
    }

    // Simular envío
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Obtener datos
        const email = emailInput.value.trim();
        const remember = rememberCheckbox.checked;

        // Guardar preferencia (simulado)
        if (remember) {
            localStorage.setItem('rememberEmail', email);
        } else {
            localStorage.removeItem('rememberEmail');
        }

        // Mostrar modal de éxito
        modalMessage.textContent = `Bienvenido de vuelta, ${email.split('@')[0]}!`;
        successModal.classList.add('show');

        // Limpiar form después de 1 segundo
        setTimeout(() => {
            loginForm.reset();
            document.getElementById('emailCheck').classList.remove('show');
            document.getElementById('passwordError').classList.remove('show');
        }, 1000);
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error. Intenta nuevamente.');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// ========== Modal Close ==========
closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('show');
});

successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('show');
    }
});

// ========== Remember Email ==========
window.addEventListener('load', () => {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
        checkEmailValidity();
    }
});

// ========== Prevent Form Submission on Enter in Password ==========
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// ========== Animación de entrada ==========
window.addEventListener('load', () => {
    document.querySelector('.login-card').style.opacity = '1';
});

// ========== Social Buttons (Demo) ==========
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.classList[1];
        alert(`Login con ${provider.charAt(0).toUpperCase() + provider.slice(1)} (Demo)`);
    });
});

// ========== Forgot Password Link ==========
const forgotLink = document.querySelector('.forgot-link');
forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Función de recuperación de contraseña (Demo)');
});

// ========== Signup Link ==========
const signupLink = document.querySelector('.auth-link a');
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Ir a página de registro (Demo)');
});