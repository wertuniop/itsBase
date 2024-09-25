const buttons = document.querySelectorAll('.add-favourites');

buttons.forEach(button => {
    button.addEventListener('click', async (event) => {
        const parentDiv = event.target.closest('div');
        const link = parentDiv.querySelector('a');
        
        const hrefValue = link.getAttribute('href');
        console.log(hrefValue);

        const response = await fetch('/addToFav', { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({pathPub: hrefValue})
        });
        if (response.ok) {
            console.log('added to fav');
        }
        else {
            console.log('error added to fav');
        }
    });
})