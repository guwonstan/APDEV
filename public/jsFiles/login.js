document.addEventListener('DOMContentLoaded', function() {
    // log-in elements
    const loginForm = document.getElementById('log-in');
    const usernameInputLogin = document.getElementById('username-login');
    const passwordInputLogin = document.getElementById('password-login');
    const showPasswordCheckboxLogin = document.getElementById('show-password-login');
    const remember = document.getElementById('remember-me');
    const remembered = remember.checked;
    
    // login form submission
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const formData = new FormData(loginForm);
        const jsObj = Object.fromEntries(formData);
        const jString = JSON.stringify(jsObj);

        try {
            console.log(jString);
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jString
            });

            if (response.ok) {
                alert('Login successful!');
                window.location.href = '/';

            } else if (response.status == 404){
                usernameInputLogin.value = '';
                passwordInputLogin.value = '';
                alert('Wrong Password')
                location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('User was not found');
            location.reload();
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
});