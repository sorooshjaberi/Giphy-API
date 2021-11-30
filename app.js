// vars
const mainUrl = "https://api.giphy.com/v1/gifs/",
  apiKey = "?api_key=GGzMDpj6fdg8My4hnE1sbgcxcJDCwu0F",
  searchInput = document.querySelector(".search-box-input"),
  limitNumber = document.querySelector("#max-gif-input"),
  gifSect = document.querySelector(".gifs-sect"),
  categories = document.querySelector(".categories-box");
let specialCategory,
  searchUrl = "",
  totalUrl = "",
  limit = "&limit=" + categories.querySelector(".limit").value; //limit

// listeners

document.addEventListener("DOMContentLoaded", () => {
  //when loaded , active trend and send url
  categories.querySelector(".trend").classList.add("active-category");
  totalUrl = urlMakerCategories("trending") + limit;
  fetcher(totalUrl);
  //adding limit
});
categories.querySelectorAll(".categories-box-category").forEach((e) => {
  //clicking on category btns random and trend
  e.addEventListener("click", (ev) => {
    if (ev.target.getAttribute("data-category")) {
      specialCategory = ev.target.getAttribute("data-category");
      totalUrl = urlMakerCategories(specialCategory) + limit;
      fetcher(totalUrl);
      if (!e.classList.contains("limit-box")) {
        activate(e);
      }
      //adding limit
    }
  });
});
document.querySelector(".limit").addEventListener("change", limitUpdate); //update limit input
// onsearching:
searchInput.addEventListener("keyup", (e) => {
  searchUrl =
    mainUrl +
    "search?q=" +
    e.target.value +
    "&api_key=GGzMDpj6fdg8My4hnE1sbgcxcJDCwu0F" +
    limit;
  // if search wasn't empty
  if (e.target.value.trim() != "") totalUrl = searchUrl.replace(" ", "+");
  fetcher(totalUrl);
  // removing active categories
});
searchInput.addEventListener("focus", () => {
  document.querySelectorAll(".active-category").forEach((e) => {
    e.classList.remove("active-category");
  });
});
//if onblur search input and empty value:
searchInput.addEventListener("blur", (e) => {
  if (e.target.value == "") {
    categories.querySelector(".trend").classList.add("active-category");
  }
});
document.querySelector(".ball").addEventListener("click", () => {
  console.log(5);
  document.querySelector(".ball").classList.toggle('right-ball');
  document.querySelector(".ball").classList.toggle('left-ball');
  document.body.classList.toggle("dark-scheme");
});
// function
function urlMakerCategories(category) {
  return mainUrl + category + apiKey;
}
async function fetcher(link) {
  let res = await fetch(link);
  let json = await res.json();
  let gifsArray = json.data;
  domMaker(gifsArray);
}
function limitUpdate() {
  console.log(limit);
  let prevLimit = limit;
  limit = "&limit=" + categories.querySelector(".limit").value;
  console.log("&limit=" + categories.querySelector(".limit").value);
  totalUrl = totalUrl.replace(
    prevLimit,
    "&limit=" + categories.querySelector(".limit").value
  );
  fetcher(totalUrl);
}
function activate(activated) {
  document.querySelectorAll(".active-category").forEach((e) => {
    e.classList.remove("active-category");
  });
  activated.classList.add("active-category");
}
function domMaker(gifsArray) {
  let html = ``;
  gifsArray = gifsArray;
  for (let i in gifsArray) {
    let gif = gifsArray[i];
    let url = "https://i.giphy.com/media/" + gif.id + "/giphy.mp4";

    html += `
    <div class="gif-card">
    <video class='gif' src="${url}" loop autoplay></video>
    <div class="gif-wrapper">
    <div class="btn-container">
  <a href="${url}" class="wrapper-btn" download>
    <i class="fas fa-download"></i>
  </a>
  <a href="" class="wrapper-btn" >
    <i class="fas fa-heart"></i>
  </a>
  <a href="#" class="wrapper-btn">
    <i class="fas fa-share"></i>
  </a>
</div></div>
    </div>
    `;
  }
  gifSect.innerHTML = html;
}
