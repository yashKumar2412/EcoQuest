document.getElementById('greeting').textContent = `Hey, ${LOGGED_IN_USERNAME}!`;

function showUpload() {
  document.getElementById('map').style.display = 'block';
  document.getElementById('upload-section').classList.remove('hidden');
  document.getElementById('leaderboard').classList.add('hidden');
}

function showLeaderboard() {
  document.getElementById('map').style.display = 'none';
  document.getElementById('upload-section').classList.add('hidden');
  document.getElementById('leaderboard').classList.remove('hidden');
  makeLeaderboard();
}

function makeLeaderboard() {
  url = BACKEND_URL + '/leaderboard';
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      const leaderboard = data.leaderboard;
      const leaderboardList = document.getElementById('leaderboardList');
      leaderboardList.innerHTML = '';

      leaderboard.forEach(user => {
        let newItem = document.createElement('li');
        newItem.textContent = `${user.username}: ${user.points} pts`;
        leaderboardList.appendChild(newItem);
      });
    })
    .catch(error => console.error('Error fetching leaderboard:', error));
}

function submitReport() {
  const fileInput = document.getElementById('photoInput');
  if (!fileInput.files.length) {
    alert("Please select a photo!");
    return;
  }
  if (!selectedLatLng) {
    alert("Please select a location on the map!");
    return;
  }

  const reportData = {
    username: LOGGED_IN_USERNAME,
    description: "Trash spotted via app",
    latitude: selectedLatLng.lat,
    longitude: selectedLatLng.lng,
    image_url: "https://dummyimage.com/600x400/000/fff",
    timestamp: new Date().toISOString()
  };

  url = BACKEND_URL + '/report';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reportData)
  })
  .then(resp => resp.json())
  .then(data => {
    alert("Cleanup Report Submitted Successfully!");
    fileInput.value = '';
    selectedLatLng = null;
  })
  .catch(error => {
    console.error('Error submitting report:', error);
    alert("Error submitting report.");
  });
}