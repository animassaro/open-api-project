//Retrieve buttons from index.html for use with associated functions
const random = document.getElementById("btn");
const dogs = document.getElementById("dogs");

//Retrieve sections to update with images of artwork, title, and artist's name.
const artwork = document.querySelector("#artwork");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");

//Fetch request to general collection, specifying desired fields of artwork id, image, title, and artist's name.
fetch(
  "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title&limit=40"
)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Something went wrong.");
    }
    return res.json();
  })
  .then((data) => {
    //Grab array of information about returned artworks.
    const collection = data.data;

    //Function which selects a random index in the collection array, and populates index.html with image of the selected artwork, and text of artist's name and piece's title.
    function refresh() {
      let i = Math.floor(Math.random() * collection.length);
      let piece = collection[i];
      let artImg = "";

      //if/else used to handle cases wherein a piece of requested information is unavailable.
      if (piece.image_id === null) {
        artImg = "/images/unavailable.png";
      } else {
        artImg = `https://www.artic.edu/iiif/2/${piece.image_id}/full/843,/0/default.jpg`;
      }

      artwork.setAttribute("src", artImg);

      if (piece.title === null) {
        title.innerText = "Title unknown";
      } else {
        title.innerText = piece.title;
      }

      if (piece.artist_title === null) {
        artist.innerText = "Artist unknown";
      } else {
        artist.innerText = piece.artist_title;
      }
    }

    //Use button to retrieve a new artwork.
    random.addEventListener("click", refresh);
  })
  .catch((error) => {
    console.error("Error: ", error);
  });

//Function 'fetcher()' makes two further API requests. The first retrieves an array of objects marked as containing artwork featuring dogs. However, there is no image stored
//in these objects. So, we retrieved the ID of the artworks instead. The nested fetch then makes use of this ID to retrieve information on the selected artwork.
function fetcher() {
  fetch("https://api.artic.edu/api/v1/artworks/search?q=dogs")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong.");
      }
      return res.json();
    })
    .then((data) => {
      const url = data.data;
      let target = [];

      //Store all of the IDs retrieved from the fetch in an array to be inserted in the subsequent fetch. One will be selected at random.
      for (let i = 0; i < url.length; i++) {
        target.push(url[i].id);
      }
      let randomId = target[Math.floor(Math.random() * target.length)];

      fetch(`https://api.artic.edu/api/v1/artworks/${randomId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          return res.json();
        })
        .then((info) => {
          const dogArt = info.data;

          //Function displayDog() assembles all of the datapoints for insertion into index.html.
          function displayDog() {
            let dogImg = "";

            if (dogArt.image_id === null) {
              dogImg = "/images/unavailable.png";
            } else {
              dogImg = `https://www.artic.edu/iiif/2/${dogArt.image_id}/full/843,/0/default.jpg`;
            }

            artwork.setAttribute("src", dogImg);

            if (dogArt.title === null) {
              title.innerText = "Title unknown";
            } else {
              title.innerText = dogArt.title;
            }

            if (dogArt.artist_title === null) {
              artist.innerText = "Artist unknown";
            } else {
              artist.innerText = dogArt.artist_title;
            }
          }
          displayDog();
        });
    });
}
//Use button to retrieve a new dog-specific artwork.
dogs.addEventListener("click", fetcher);
