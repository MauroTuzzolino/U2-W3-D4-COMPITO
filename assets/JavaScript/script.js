const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");
const albumRow = document.querySelector("#albumRow");
const disappearingH5 = document.getElementById("disappearingH5");
const modalImage = document.getElementById("modalImage");
const loadSecondaryBtn = document.getElementById("loadSecondaryBtn");
const PEXELS_API_KEY = `lC5tl7PsRlSHb6yIL6npP14Qrvzj4jfweXOXjDIOsAUJ1EmhFq3s6Qwn`;

function loadImages(query) {
  fetch("https://api.pexels.com/v1/search?query=" + query + "&per_page=9", {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      albumRow.innerHTML = "";
      data.photos.forEach(function (photo) {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
                <div class="card mb-4 shadow-sm">
                  <a href="detail.html?id=${photo.id}">
                    <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" style="  width: 100%; aspect-ratio: 3/3; object-fit: cover; object-position: center;" />
                  </a>
                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="detail.html?id=${photo.id}" class="text-decoration-none text-dark">${photo.photographer}</a>
                    </h5>
                    <p class="card-text">Photo by ${photo.photographer}.</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary view-btn" data-full="${photo.src.large}" data-bs-toggle="modal" data-bs-target="#imageModal">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
                      </div>
                      <small class="text-muted">ID: ${photo.id}</small>
                    </div>
                  </div>
                </div>
              `;
        albumRow.appendChild(col);

        const hideButton = col.querySelector(".hide-btn");
        hideButton.addEventListener("click", function () {
          col.style.display = "none";
        });

        const viewButton = col.querySelector(".view-btn");
        viewButton.addEventListener("click", function () {
          modalImage.src = this.getAttribute("data-full");
        });
      });
    });
}

searchButton.addEventListener("click", function () {
  const query = searchInput.value;
  disappearingH5.classList.add("d-none");
  loadImages(query);
});

loadSecondaryBtn.addEventListener("click", function () {
  const secondaryQuery = "nature"; // ricerca bottone secondario
  disappearingH5.classList.add("d-none");
  loadImages(secondaryQuery);
});
