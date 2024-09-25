import { ErrorMessage } from './errorMessage.js';

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const errorMessage = new ErrorMessage;

    const nickname = registerForm.nickname.value;
    const password = registerForm.password.value;
    const repeatPassword = registerForm.repeatPassword.value;

    if (password != repeatPassword) {
        errorMessage.Show('Пароли не совпадают');
        return ;
        
    }

    try {
        const response = await fetch(window.location.href, { 
              method: "POST", 
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({nickname: nickname, password: password})
        });

        if (response.ok) {
            window.location.replace('/');
        }
        else {
            const result = await response.json();
            errorMessage.Show(result.e);
        }
    
    }
    catch (e) {
        console.log(e);
    }
 
    
});