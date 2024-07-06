document.addEventListener("keydown", handelKeydown);

function handelKeydown(event) {
    // event.preventDefault();
    if (event.key == "ArrowDown" || event.key == "ArrowUp") {
        console.log("event");
        searchResults.focus();
    }
    else if (event.ctrlKey && event.key === "Enter") {
        searchInput.focus()
    }
}

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        serachQuery();
    }
});