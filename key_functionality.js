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

document.addEventListener('keypress', function(event) {
    var videos = document.querySelectorAll('iframe, video');
	Array.prototype.forEach.call(videos, function (video) {
		if (video.tagName.toLowerCase() === 'video') {
			video.pause();
		} else {
			var src = video.src;
			video.src = src;
		}
	});
    console.log("hello")
});