document.addEventListener('DOMContentLoaded', function() {

    // registration elements
    const registrationForm = document.getElementById('registration');
    const usernameInputReg = document.getElementById('username');
    const passwordInputReg = document.getElementById('password');
    const avatarInput = document.getElementById('avatar');
    const descriptionInput = document.getElementById('description');
    const showPasswordCheckboxReg = document.getElementById('show-password');

    // registration form submission
    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = usernameInputReg.value.trim();
        const password = passwordInputReg.value;
        const avatar = avatarInput.files[0];
        const description = descriptionInput.value;

        if (!username || !password || !avatar) {
            alert('Please fill in all fields.');
            return;
        }

        // this is just to clear inputs
        usernameInputReg.value = '';
        passwordInputReg.value = '';
        avatarInput.value = '';
        descriptionInput.value = '';


        try {
            const formData = new FormData(registrationForm);
            const jsObj = Object.fromEntries(formData);
            const jString = JSON.stringify(jsObj);
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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

    showPasswordCheckboxReg.addEventListener('change', function() {
        const passwordField = document.getElementById('password');
        if (this.checked) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });

});