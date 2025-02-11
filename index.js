import { online, upcomingHref,upcomingTitle, videoDate, videoHref, videoTitle } from "./youtube_data.js";
import simplyCountdown from "./simplyCountdown.js";

simplyCountdown("#time-since-last-stream", {
  year: videoDate.getFullYear(),
  month: videoDate.getMonth()+1,
  day: videoDate.getDate(),
  hours: videoDate.getHours(),
  minutes: videoDate.getMinutes(),
  countUp:true
});


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
  document.getElementById("feeling").alt = `Nimi ${imageName.slice(0, -4)}`;
}

function updateNextStream(online, videoHref, videoTitle) {
  let streamTimeAway = "Umi is live!";
  let adjective = "Live";

  if (!online) {
    streamTimeAway = "without  Umi";
    adjective = "Next";
  }

  document.getElementById("countdown-descriptor").textContent = streamTimeAway;
  document.getElementById("next-stream").innerHTML = `<b>${adjective} Stream:</b> <a href="${upcomingHref}">${upcomingTitle}</a>`;
}

const negativeImages = ["umitears.png", "umicry.png", "umirip.png"];
const positiveImages = ["umihug.png", "umiheadpat.png", "umicozy.png"];
const imageIndex = Math.floor(Math.random() * positiveImages.length);

updateFeeling(online);
if (!online) {
  updateNextStream(online, videoHref, videoTitle);
  setInterval(updateNextStream, 1000, online, videoHref, videoTitle);
}