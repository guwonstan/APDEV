document.addEventListener('DOMContentLoaded', function() {
    let users = [];

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
    registrationForm.addEventListener('submit', function(event) {
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

        const newUser = {
            username: username,
            password: password,
            description: description,
            avatar: avatar
        };

        users.push(newUser);

        // this is just to clear inputs
        usernameInputReg.value = '';
        passwordInputReg.value = '';
        confirmPasswordInput.value = '';
        avatarInput.value = '';
        descriptionInput.value = '';

        // for debugging only
        console.log('New User Registered:');
        console.log(newUser);
        console.log('All Users:', users);

        window.location.href = '../UnregisteredViews/login.html';
    });

    // login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInputLogin.value.trim().toLowerCase();
        const password = passwordInputLogin.value.toLowerCase(); 
        const user = users.find(user => user.username.toLowerCase() === username && user.password.toLowerCase() === password);
        if (user) {
            alert('Login successful!');

            window.location.href = '../UnregisteredViews/Create_Review.html';
        } else {
            alert('Invalid username or password.');

            passwordInputLogin.value = '';
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