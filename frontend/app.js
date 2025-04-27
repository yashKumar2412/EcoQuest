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

  const formData = new FormData();
  formData.append('username', LOGGED_IN_USERNAME);
  formData.append('description', "Trash spotted via app");
  formData.append('latitude', selectedLatLng.lat);
  formData.append('longitude', selectedLatLng.lng);
  formData.append('timestamp', new Date().toISOString());
  formData.append('file', fileInput.files[0]);

  const url = BACKEND_URL + '/report';

  fetch(url, {
    method: 'POST',
    body: formData
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