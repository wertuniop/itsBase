import { ErrorMessage } from './errorMessage.js';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const errorMessage = new ErrorMessage;

    const nickname = loginForm.nickname.value;
    const password = loginForm.password.value;

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