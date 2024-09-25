const filterForm = document.getElementById('filterForm');

filterForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    var filter = {};

    if (filterForm.direction.value) {
        filter.direction = filterForm.direction.value;
    }
    if (filterForm.course.value) {
        filter.course = filterForm.course.value;
    }
    if (filterForm.semester.value) {
        filter.semester = filterForm.semester.value;
    }
    if (filterForm.subject.value) {
        filter.subject = filterForm.subject.value;
    }
    if (filterForm.typeP.value) {
        filter.typeP = filterForm.typeP.value;
    }
    console.log(filter);
    window.location.replace('/?filter='+JSON.stringify(filter));

    return false;
});