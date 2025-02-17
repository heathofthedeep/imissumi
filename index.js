import { online, liveHref, liveTitle, upcomingVideos, videoDate, videoHref, videoTitle } from "./youtube_data.js";
import simplyCountdown from "./simplyCountdown.js";

if(!online){
  simplyCountdown("#time-since-last-stream", {
    year: videoDate.getFullYear(),
    month: videoDate.getMonth()+1,
    day: videoDate.getDate(),
    hours: videoDate.getHours(),
    minutes: videoDate.getMinutes(),
    countUp:true
  });
}

function updateFeeling(online) {
  let [imageName, imagePath] = ["", ""];
  if (online) {
    imageName = positiveImages[imageIndex];
    imagePath = `${imageName}`;
  } else {
    imageName = negativeImages[imageIndex];
    imagePath = `${imageName}`;
  }
  document.getElementById("feeling").src = imagePath;
}

function updateNextStream(online, videoHref, videoTitle, upcomingVideos) {
  let streamTimeAway = "Umi is live!";
  let videos = [];

  if (!online) {
    streamTimeAway = "without  Umi";
  }

  document.getElementById("countdown-descriptor").textContent = streamTimeAway;
  if(liveTitle != ""){
    document.getElementById("live-stream").innerHTML = `<b>Live Stream:</b> <a href="${liveHref}">${liveTitle}</a>`;
  }

  upcomingVideos.forEach((video) => {
    videos.push(`<a class="upcoming" href="${video.url}"><span>${video.title}</span><img src="${video.thumbnail}" /></a>`)
  });

  document.getElementById("upcoming-stream").innerHTML = videos.join(" ");
}

const negativeImages = ["umitears.png", "umicry.png", "umirip.png"];
const positiveImages = ["umihug.png", "umiheadpat.png", "umicozy.png"];
const imageIndex = Math.floor(Math.random() * positiveImages.length);

updateFeeling(online);

updateNextStream(online, videoHref, videoTitle, upcomingVideos);