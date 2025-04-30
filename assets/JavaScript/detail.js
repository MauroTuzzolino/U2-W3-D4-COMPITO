const urlParams = new URLSearchParams(window.location.search);
const photoId = urlParams.get("id");
const PEXELS_API_KEY = `lC5tl7PsRlSHb6yIL6npP14Qrvzj4jfweXOXjDIOsAUJ1EmhFq3s6Qwn`;

if (photoId) {
  fetch(`https://api.pexels.com/v1/photos/${photoId}`, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const detailImage = document.getElementById("detailImage");
      const photographerName = document.getElementById("photographerName");
      const photographerLink = document.getElementById("photographerLink");

      detailImage.src = data.src.original;
      photographerName.textContent = `Photographer: ${data.photographer}`;
      photographerLink.innerHTML = `<a href="${data.photographer_url}" target="_blank">Visit photographer's page</a>`;
    });
}
