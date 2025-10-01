document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registrationForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');

  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  let isValid = { name: false, email: false, password: false, confirmPassword: false };

  nameInput.addEventListener('input', () => { validateName(); updateSubmitButton(); });
  emailInput.addEventListener('input', () => { validateEmail(); updateSubmitButton(); });
  passwordInput.addEventListener('input', () => { validatePassword(); validateConfirmPassword(); updateSubmitButton(); });
  confirmPasswordInput.addEventListener('input', () => { validateConfirmPassword(); updateSubmitButton(); });

  function validateName() {
    const error = document.getElementById('nameError');
    if (!nameRegex.test(nameInput.value.trim())) {
      nameInput.classList.add('input-error');
      error.classList.add('error-visible');
      isValid.name = false;
    } else {
      nameInput.classList.remove('input-error');
      error.classList.remove('error-visible');
      isValid.name = true;
    }
  }

  function validateEmail() {
    const error = document.getElementById('emailError');
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('input-error');
      error.classList.add('error-visible');
      isValid.email = false;
    } else {
      emailInput.classList.remove('input-error');
      error.classList.remove('error-visible');
      isValid.email = true;
    }
  }

  function validatePassword() {
    const error = document.getElementById('passwordError');
    if (!passwordRegex.test(passwordInput.value)) {
      passwordInput.classList.add('input-error');
      error.classList.add('error-visible');
      isValid.password = false;
    } else {
      passwordInput.classList.remove('input-error');
      error.classList.remove('error-visible');
      isValid.password = true;
    }
  }

  function validateConfirmPassword() {
    const error = document.getElementById('confirmPasswordError');
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.classList.add('input-error');
      error.classList.add('error-visible');
      isValid.confirmPassword = false;
    } else {
      confirmPasswordInput.classList.remove('input-error');
      error.classList.remove('error-visible');
      isValid.confirmPassword = true;
    }
  }

  function updateSubmitButton() {
    submitBtn.disabled = !Object.values(isValid).every(v => v === true);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (Object.values(isValid).every(v => v === true)) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creando cuenta...';

      setTimeout(() => {
        successMessage.classList.add('success-visible');
        form.reset();
        submitBtn.textContent = 'Cuenta creada';

        setTimeout(() => {
          successMessage.classList.remove('success-visible');
          submitBtn.textContent = 'Crear cuenta';
          updateSubmitButton();
        }, 3000);
      }, 1000);
    }
  });

  updateSubmitButton();
});