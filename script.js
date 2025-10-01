// script.js
document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    let isValid = true;

    // Reset mensajes de error
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    // Validar nombre
    if (nombre.value.trim() === '') {
        setError(nombre, 'El nombre es obligatorio.');
        isValid = false;
    }

    // Validar email con regex simple
    if (!validateEmail(email.value.trim())) {
        setError(email, 'Introduce un correo válido.');
        isValid = false;
    }

    // Validar contraseña (mínimo 6 caracteres)
    if (password.value.length < 6) {
        setError(password, 'La contraseña debe tener al menos 6 caracteres.');
        isValid = false;
    }

    // Confirmar contraseña
    if (password.value !== confirmPassword.value) {
        setError(confirmPassword, 'Las contraseñas no coinciden.');
        isValid = false;
    }

    if (isValid) {
        alert('Registro exitoso!');
        this.reset();
    }
});

function setError(input, message) {
    const formGroup = input.parentElement;
    const errorMsg = formGroup.querySelector('.error-msg');
    errorMsg.textContent = message;
}

function validateEmail(email) {
    // Regex simple para validar correo electrónico
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}
