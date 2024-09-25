import { transliterate } from './transliterate.js';

const createForm = document.getElementById('createForm');

createForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    console.log(e);

    try {
        const fileInput = document.getElementById('fileInput');

        const formData = new FormData();


        const file = fileInput.files[0];
        formData.append('file', file, transliterate(file.name));


        formData.append('direction', createForm.direction.value);
        formData.append('course', createForm.course.value);
        formData.append('semester', createForm.semester.value);
        formData.append('subject', createForm.subject.value);
        formData.append('typeP', createForm.typeP.value);

        const response = await fetch('/create', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            window.location.replace('/');
        }
        else {
            const result = await response.json();
            console.log(result.e);
        }
    
    }
    catch (e) {
        console.log(e);
    }
 
    
});