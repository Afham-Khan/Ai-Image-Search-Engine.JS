const accessKey = "lmjbywTGLrfrN0LQpeo-ExE5sEicg1z2AQl-fzLnhsc";  // Replace with your Unsplash API key
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

        // If this is the first page, clear out the old search results
        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;

        // Display the fetched images
        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank"; // Open the link in a new tab

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        // Show the "Show More" button only if there are more results to load
        if (results.length > 0 && data.total_pages > page) {
            showMorebtn.style.display = "block";
        } else {
            showMorebtn.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        showMorebtn.style.display = "none"; // Hide on error
    }
}

// When the user submits the search form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset to the first page of results
    randomImagesSection.style.display = "none"; // Hide random images after search
    searchImages(); // Perform the image search
});

// When the user clicks "Show More"
showMorebtn.addEventListener("click", () => {
    page++; // Move to the next page of results
    searchImages(); // Fetch and display more images
});

// When the window finishes loading
window.addEventListener("load", () => {
    preLoader.style.display = "none"; // Hide the pre-loader
    document.body.style.overflow = "auto"; // Allow scrolling again
});
