function makeLeaderboard() {
    fetch('/leaderboard')
    .then(resp => resp.json())
    .then(data => {
        const leaderboard = data.leaderboard;
        const leaderboardList = document.getElementById('leaderboardList');
        leaderboardList.innerHTML = '';

        leaderboard.forEach(user => {
            let newItem = document.createElement('li');
            newItem.textContent = user.username + ": " + user.points + " pts";
            leaderboardList.appendChild(newItem);
        });
    });
}


