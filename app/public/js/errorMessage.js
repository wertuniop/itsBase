
export class ErrorMessage{
    constructor () {}

    Show (error) {
        const blockError = document.getElementById("errorMessage");
        blockError.innerHTML = error;

        blockError.style.display = 'block';
    }
    Close () {
        const blockError = document.getElementById("errorMessage");

        blockError.style.display = 'none';
    }

}


