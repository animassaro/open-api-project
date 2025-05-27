//TO-DO: display an artwork on loading without button press
const header = document.querySelector("h1");

fetch(
  "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_display,provenance_text,is_public_domain&limit=40"
)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Something went wrong.");
    }
    return res.json();
  })
  .then((data) => {
    const collection = data.data; //target artwork object and store in collection
    console.log(collection);

    function refresh() {
      let i = Math.floor(Math.random() * collection.length); //to display a random artwork on button press, we get a random number multiplying by length of the collection so we don't go out of bounds.
      let piece = collection[i]; //the info about the artwork is stored in a variable

      var artImg = //image is fetched from API, inserting the required id for that art piece into the url. **check if it can be done with template literal instead this looks ugly
        "https://www.artic.edu/iiif/2/" +
        piece.image_id +
        "/full/843,/0/default.jpg";

      var artwork = document.querySelector("#artwork"); //get element where image of the artwork will go
      artwork.setAttribute("src", artImg); //change the image src attribute to hold the artwork

      var title = document.querySelector("#title"); //get element where title of artwork will go
      title.innerText = piece.title; //insert text containing title gotten from API

      var artist = document.querySelector("#artist"); //get element where artist's name will go
      artist.innerText = piece.artist_title; //insert text
    }

    btn.addEventListener("click", refresh); //on button click, run func refresh and display a new artwork + appropriate title/name
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
