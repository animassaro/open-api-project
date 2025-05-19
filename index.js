const header = document.querySelector("h1");

fetch(
  "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number"
)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Something went wrong.");
    }
    return res.json();
  })
  .then((data) => console.log(data));
