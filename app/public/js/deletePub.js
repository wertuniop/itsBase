const buttons = document.querySelectorAll('.delete-pub');

buttons.forEach(button => {
    button.addEventListener('click', async (event) => {
        const parentDiv = event.target.closest('div');
        const link = parentDiv.querySelector('a');
        
        const hrefValue = link.getAttribute('href');
        console.log(hrefValue);

        const response = await fetch('/deletePub', { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({pathPub: hrefValue})
        });
        if (response.ok) {
            console.log('reload');
            location.reload(true);
        }
        else {
            console.log('error delete to fav');
        }
    });
})