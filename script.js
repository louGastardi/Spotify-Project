const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const searchInput = document.getElementById('search-input');

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return displayResults(data);
    });
}

function displayResults(result) {
  hidePlaylists();
  const artistName = document.getElementById('artist-name');
  const artistImg = document.getElementById('artist-img');

  result.forEach((element) => {
    artistName.innerText = element.name;
    artistImg.src = element.urlImg;
  });

  resultArtist.classList.remove('hidden');
}

function hidePlaylists() {
  resultPlaylist.classList.add('hidden');
}

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === '') {
    resultArtist.classList.add('hidden');
    resultPlaylist.classList.remove('hidden');
    return;
  }

  requestApi(searchTerm);
});
