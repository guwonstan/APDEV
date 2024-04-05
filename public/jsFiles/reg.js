document.addEventListener('DOMContentLoaded', function() {

    // registration elements
    const registrationForm = document.getElementById('registration');
    const usernameInputReg = document.getElementById('username');
    const passwordInputReg = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const avatarInput = document.getElementById('avatar');
    const descriptionInput = document.getElementById('description');
    const showPasswordCheckboxReg = document.getElementById('show-password');
    const showConfirmPasswordCheckbox = document.getElementById('show-confirm-password');

    // log-in elements
    const loginForm = document.getElementById('log-in');
    const usernameInputLogin = document.getElementById('username-login');
    const passwordInputLogin = document.getElementById('password-login');
    const showPasswordCheckboxLogin = document.getElementById('show-password-login');

    // registration form submission
    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = usernameInputReg.value.trim();
        const password = passwordInputReg.value;
        const confirmPassword = confirmPasswordInput.value;
        const avatar = avatarInput.files[0];
        const description = descriptionInput.value;

        if (!username || !password || !confirmPassword || !avatar) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // this is just to clear inputs
        usernameInputReg.value = '';
        passwordInputReg.value = '';
        confirmPasswordInput.value = '';
        avatarInput.value = '';
        descriptionInput.value = '';


        try {
            const formData = new FormData(registrationForm);
            const jsObj = Object.fromEntries(formData);
            const jString = JSON.stringify(jsObj);
            const response = await fetch('/register', {
                method: 'POST',
                body: jString
            });
    
            if (response.ok) {
                alert('Registration successful!');
                window.location.href = '/';
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration.');
            location.reload();
        }
    });

    
    // login form submission
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const jsObj = Object.fromEntries(formData);
        const jString = JSON.stringify(jsObj);

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jString
            });

            if (response.ok) {
                alert('Login successful!');
                window.location.href = '../UnregisteredViews/Create_Review.html';
            } else {
                passwordInputLogin.value = '';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login.');
            location.reload();
        }
    });


    showPasswordCheckboxReg.addEventListener('change', function() {
        const passwordField = document.getElementById('password');
        if (this.checked) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });

    showPasswordCheckboxLogin.addEventListener('change', function() {
        const passwordField = document.getElementById('password-login');
        if (this.checked) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });

    showConfirmPasswordCheckbox.addEventListener('change', function() {
        const confirmPasswordField = document.getElementById('confirm-password');
        if (this.checked) {
            confirmPasswordField.type = 'text';
        } else {
            confirmPasswordField.type = 'password';
        }
    });
});