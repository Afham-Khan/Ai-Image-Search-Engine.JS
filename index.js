const accessKey = "lmjbywTGLrfrN0LQpeo-ExE5sEicg1z2AQl-fzLnhsc";
const searchForm = document.getElementById("Search-form");
const searchBox = document.getElementById("Search-box");
const searchResult = document.getElementById("Search-result");
const showMorebtn = document.getElementById("show-more-btn");
const preLoader = document.getElementById("pre-loader");
const randomImagesSection = document.getElementById("random-images");

let keyword = "";
let page = 1;

// Initially hide the "Show More" button
showMorebtn.style.display = "none";

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        
        if (results.length > 0 && window.innerWidth <= 768) {
            showMorebtn.style.display = "block"; 
        } else {
            showMorebtn.style.display = "none"; 
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        showMorebtn.style.display = "none"; // Hide on error
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    randomImagesSection.style.display = "none";
    searchImages();
});

showMorebtn.addEventListener("click", () => {
    page++;
    searchImages();
});


window.addEventListener("load", () => {
    preLoader.style.display = "none";
    document.body.style.overflow = "auto"; 
});
