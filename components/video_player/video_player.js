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