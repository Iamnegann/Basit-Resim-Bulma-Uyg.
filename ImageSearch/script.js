const accessKey = "EfwHhFrrinTb58axigiovRcwlWCrPix-908VtkX2Qnk";
const searchFrom = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMore = document.getElementById('search-more-btn');
let keyword = "";
let page = 1;

async function searchImages(){
keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";
        message.innerText = ""; 
    }
    if (results.length === 0 && page === 1) {
        message.innerText = "Aradığınız resim bulunmamaktadır.";
        showMore.style.display = "none";
        return;
    }
    if (results.length < 12 || page >= data.total_pages) {
       showMore.style.display = "none";
        message.innerText = "Sadece bu kadar görsel bulundu.";
   } else {
        showMore.style.display = "block";
    }
  
    results.map((result) => {
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });
    

}

searchFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})
showMore.addEventListener("click", () => {
    page++;
    searchImages();
})
