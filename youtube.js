const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResultsBox');

function serachQuery() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm.length > 0) {
        fetchVideos('previousClear');
        // storeQuery(searchTerm);
        searchInput.style.border = '0.1px solid rgb(81, 81, 81)';
    } else {
        searchInput.style.border = '0.1px solid red';
    }
}

function fetchSearchResults(searchTerm) {
    // const apiKey = 'AIzaSyCkzOqQxFUSEBsN7pO_W797gQCZJ9_haM4';
    const apiKey = 'AIzaSyAkwWwQdwiHGsPvxCf0_PEZRVYCIBnmasw';
    const maxResults = 30;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${apiKey}&maxResults=${maxResults}&part=snippet&type=video`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data.items) {
                throw new Error('No items found in the search results');
            }
            displaySearchResults(data.items);
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}


function displaySearchResults(results) {
    // Clear previous search results
    searchResults.innerHTML = '';


    // Iterate over the search results and create HTML elements to display them
    results.forEach(result => {
        let title = discriptionRepair(result.snippet.title);
        const videoId = result.id.videoId;
        const thumbnailUrl = result.snippet.thumbnails.high.url;
        let discription = discriptionRepair(result.snippet.description);
        const channelId = result.snippet.channelId;
        let vaxr = document.getElementById('dhf9s');

        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result');
        resultItem.innerHTML = `
        <div class="video-detail-box" onclick="storeDataToLocal(${`\`${title}\``}, '${videoId}', ${`\`${discription}\``}, '${channelId}')">
            <img class="thumbnail-image" src="${thumbnailUrl}" alt="${title}">
            <h3 class="title">${title}</h3>
        </div>
    `;

        // Append the search result to the search results container
        searchResults.appendChild(resultItem);
    });
}

function storeDataToLocal(title, videoId, discription, channelId) {

    localStorage.setItem('title-youtube', title);
    localStorage.setItem('url-youtube', videoId);
    localStorage.setItem('discription-youtube', discription);
    localStorage.setItem('channelId-youtube', channelId);

    let mainContainer = document.querySelector(".main-container");
    let secondContainer = document.querySelector(".second-container");

    mainContainer.style.display = 'none';
    secondContainer.style.display = 'block';
    loadCurrentVideo();
}

function storeQuery(query) {
    let queryData = localStorage.getItem('queryData');
    queryData = JSON.parse(queryData);
    queryData.append(queryData);
    queryData = JSON.stringify(queryData);
    localStorage.setItem('queryData', queryData);
}

// ************************************** DOM load video display ***************************************************************

// const apiKey = 'AIzaSyCkzOqQxFUSEBsN7pO_W797gQCZJ9_haM4'; // my own key
const apiKey = 'AIzaSyB61dCiMiNQ0njfW4uUCORhE2P96oQrMs0';
// const apiKey = 'AIzaSyDQvEF9PuhdW3JJM28VQZXQGOo84iYvd-Q';
// const apiKey = 'AIzaSyAzfFLwjVLNVIHbBf8EWOSH3nCE0zLgF44';
// const apiKey = 'AIzaSyAn8h71VOzmap8ve9kxoCHqKoE_T79ADD8'; //h
// const apiKey = 'AIzaSyD3WKXZwbplcvQ2BlmIj4n3FlyFpvY_47M';

// const apiKey = 'AIzaSyAwM_RLjqj8dbbMAP5ls4qg1olDsaxSq5s';

const maxResults = 10;

function formatDuration(isoDuration) {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    if (match == null) {
        return "Live";
    }
    else {
        const hours = (match[1] || '0H').slice(0, -1);
        const minutes = (match[2] || '0M').slice(0, -1);
        const seconds = (match[3] || '0S').slice(0, -1);

        return `${hours ? hours + ':' : ''}${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;

    }
}

const channels = [
    'UCfUeGC_pLUW6Y7Y_G9uEZWA', // Aaj Tak
    'UC6t7F1ndh6MskytLXlzmjSA', // News18 India
    'UCZFMm1mMw0F81Z37aaEzTUA', // Zee News
    'UCB1o7_gbFp2PLsamWxFenBg', // ABP News
    'UCYPvAwZP8pZhSMW8qs7cVCw', // India Today
    'UCttspZesZIDEwwpVIgoZtWQ'  // India TV
];

const movieQueries = ['python programming', 'tech moblie', 'javascript new language', 'web hosting', 'html tricks', 'css styling', 'react development', 'mern stack development', 'django backend'];
// const movieQueries = ['Latest Hindi Movies', 'New hollywood Movies', 'cartoon in hind', 'new comedy video'];

const newsQueries = ['Latest News hindi', 'Breaking News hindi', 'Recent News hindi', 'hindi news', 'yesterday news hindi'];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomTimestamp() {
    const now = new Date();
    const randomOffset = Math.floor(Math.random() * 3); // Random offset within the last 3 days
    const randomDate = new Date(now.setDate(now.getDate() - randomOffset));
    return randomDate.toISOString();
}

function getRandomQuery() {
    const randomChannel = getRandomElement(channels);
    const randomMovieQuery = getRandomElement(movieQueries);
    const randomNewsQuery = getRandomElement(newsQueries);

    const queryOptions = [
        `channelId=${randomChannel}&order=date&publishedAfter=${getRandomTimestamp()}`,
        `q=${randomMovieQuery}&order=viewCount&publishedAfter=${getRandomTimestamp()}`,
        `q=${randomNewsQuery}&order=date&publishedAfter=${getRandomTimestamp()}`
    ];

    return getRandomElement(queryOptions);
}


function fetchVideos(previousClear) {
    let url = '';
    let randomQuery = '';
    const searchTerm = searchInput.value.trim();
    if (searchTerm.length > 0) {
        if (previousClear == 'previousClear') {
            searchResults.innerHTML = '';
        }

        url = `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${apiKey}&maxResults=${maxResults}&part=snippet&type=video`;
    }
    else {
        randomQuery = getRandomQuery();
        url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&${randomQuery}&type=video&maxResults=${maxResults}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const videoIds = data.items.map(item => item.id.videoId).join(',');
            fetchVideoDetails(videoIds);
        })
        .catch(error => console.error('Error fetching videos:', error));
}

function fetchVideoDetails(videoIds) {
    const url = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,contentDetails&id=${videoIds}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayVideos(data.items);
        })
}

function displayVideos(videos) {

    videos.forEach(video => {
        const title = discriptionRepair(video.snippet.title);
        const videoId = video.id;
        const thumbnailUrl = video.snippet.thumbnails.high.url;
        let discription = discriptionRepair(video.snippet.description);
        const channelId = video.snippet.channelId;
        let duration = formatDuration(video.contentDetails.duration);
        let durationCheck = durationChecker(duration);
        
        if (durationCheck == true) {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result');
            resultItem.innerHTML = `
                <div class="video-detail-box" onclick="storeDataToLocal(${`\`${title}\``}, '${videoId}', ${`\`${discription}\``}, '${channelId}')">
                    <img class="thumbnail-image" src="${thumbnailUrl}" alt="${title}">
                    <div class="duration">${duration}</div>
                    <h3 class="title">${title}</h3>
                </div>
            `;
    
            searchResults.appendChild(resultItem);
        }
    });
}

function durationChecker(durationString) {
    let duration = durationString.split('');
    let test = duration[duration.length - 5] + duration[duration.length - 4];
    if (test == "00") {
        return false;
    }
    else {
        return true;
    }
}

function discriptionRepair(text) {

    text = text.replace(/&/g, "&amp;");
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    text = text.replace(/"/g, "&quot;");
    text = text.replace(/'/g, "&#039;");
    text = text.replace(/`/g, "&#96;");

    return text;
}

document.addEventListener('DOMContentLoaded', () => {
    searchResults.innerHTML = '';
    fetchVideos();
    let showMore = document.querySelector('.show_more');
    showMore.addEventListener('click', fetchVideos);

    setTimeout(() => {
        if (searchResults.innerHTML == '') {
            fetchVideos();
        }
    }, 1000);

    let mainContainer = document.querySelector(".main-container");
    let secondContainer = document.querySelector(".second-container");

    mainContainer.style.display = 'block';
    secondContainer.style.display = 'none';
});

document.getElementById("homePage").addEventListener('click', () => {
    let mainContainer = document.querySelector(".main-container");
    let secondContainer = document.querySelector(".second-container");

    let video = document.querySelector("iframe")
    video.src = "";

    mainContainer.style.display = 'block';
    secondContainer.style.display = 'none';
});

// ********************** video player logic ***************************




function loadCurrentVideo() {
    let iframe = document.querySelector('iframe');
    let title = document.querySelector('.title-box');
    let discription = document.querySelector('.discription-box');
    
    let getTitle = localStorage.getItem('title-youtube');
    let getUrl = localStorage.getItem('url-youtube');
    let getDiscription = localStorage.getItem('discription-youtube');
    let getChannelId = localStorage.getItem('channelId-youtube');
    
    iframe.src = `https://www.youtube.com/embed/${getUrl}?autoplay=1&rel=0"`;
    title.textContent = getTitle;
    discription.textContent = getDiscription;
    
    const apiKey = 'AIzaSyCkzOqQxFUSEBsN7pO_W797gQCZJ9_haM4';
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${getChannelId}&key=${apiKey}`;
    const statisticsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${getChannelId}&key=${apiKey}`;

    fetch(channelUrl)
        .then(response => response.json())
        .then(data => {
            const channelData = data.items[0].snippet;
            displayChannelData(channelData);
        })
        .catch(error => {
            console.error('Error fetching channel data:', error);
        });
    
    fetch(statisticsUrl)
        .then(response => response.json())
        .then(data => {
            const statistics = data.items[0].statistics;
            displayStatistics(statistics);
        })
        .catch(error => {
            console.error('Error fetching statistics:', error);
        });
    
    function displayChannelData(channelData) {
        console.log(channelData)
        // Display channel data on the web page
        document.querySelector('.channel-logo-icon').src = channelData.thumbnails.high.url;
        document.querySelector('.channel-name').textContent = channelData.title;
    }
    
    function displayStatistics(statistics) {
        // Display statistics data on the web page
        document.querySelector('.subscriber-count-box').textContent = `${statistics.subscriberCount} subscribers`;
        // document.getElementById('likeCount').textContent = `${statistics.likeCount}`;
    }
}