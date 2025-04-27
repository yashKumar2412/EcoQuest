let currentPoints = 0;
let unlockedBadges = {};

function showUpload() {
  document.getElementById('map').style.display = 'block';
  document.getElementById('upload-section').classList.remove('hidden');
  document.getElementById('leaderboard').classList.add('hidden');
  document.getElementById('badges').classList.add('hidden');
}

function showLeaderboard() {
  document.getElementById('map').style.display = 'none';
  document.getElementById('upload-section').classList.add('hidden');
  document.getElementById('leaderboard').classList.remove('hidden');
  document.getElementById('badges').classList.add('hidden');
  makeLeaderboard();
}

function showBadges() {
  document.getElementById('map').style.display = 'none';
  document.getElementById('upload-section').classList.add('hidden');
  document.getElementById('leaderboard').classList.add('hidden');
  document.getElementById('badges').classList.remove('hidden');

  if (currentPoints >= 30) unlockedBadges["beginner"] = true;
  if (currentPoints >= 50) unlockedBadges["warrior"] = true;
  if (currentPoints >= 100) unlockedBadges["legend"] = true;

  renderBadges();
}

function makeLeaderboard() {
  fetch(BACKEND_URL + '/leaderboard')
    .then(resp => resp.json())
    .then(data => {
      const leaderboard = data.leaderboard;
      const leaderboardList = document.getElementById('leaderboardList');
      leaderboardList.innerHTML = '';

      leaderboard.forEach(user => {
        let newItem = document.createElement('li');
        newItem.textContent = `${user.username}: ${user.points} pts`;
        leaderboardList.appendChild(newItem);

        if (user.username === LOGGED_IN_USERNAME) {
          currentPoints = user.points;
        }
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
    alert("🧹 Cleanup Report Submitted Successfully!");
    fileInput.value = '';
    selectedLatLng = null;

    currentPoints += 10;

    if (currentPoints >= 30 && !unlockedBadges["beginner"]) {
      unlockedBadges["beginner"] = true;
      alert("🥉 Beginner Cleaner Badge Earned! Great job!");
      renderBadges();
    }

    if (currentPoints >= 50 && !unlockedBadges["warrior"]) {
      unlockedBadges["warrior"] = true;
      alert("🥈 Eco Warrior Badge Earned! Keep going!");
      renderBadges();
    }

    if (currentPoints >= 100 && !unlockedBadges["legend"]) {
      unlockedBadges["legend"] = true;
      alert("🥇 Eco Legend Badge Unlocked! Amazing!");
      renderBadges();
    }
  })
  .catch(error => {
    console.error('Error submitting report:', error);
    alert("Error submitting report.");
  });
}

function renderBadges() {
  const badgeCards = document.getElementById('badgeCards');
  badgeCards.innerHTML = '';

  const badges = [
    { id: "beginner", name: "Beginner Cleaner", emoji: "🥉", desc: "30 Points" },
    { id: "warrior", name: "Eco Warrior", emoji: "🥈", desc: "50 Points" },
    { id: "legend", name: "Eco Legend", emoji: "🥇", desc: "100 Points" }
  ];

  badges.forEach(badge => {
    const card = document.createElement('div');
    card.classList.add('badge-card');
    if (unlockedBadges[badge.id]) {
      card.classList.add('unlocked');
    }

    card.innerHTML = `
      <div style="font-size: 2rem;">${badge.emoji}</div>
      <h4>${badge.name}</h4>
      <p>${badge.desc}</p>
    `;
    badgeCards.appendChild(card);
  });
}