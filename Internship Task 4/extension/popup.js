chrome.storage.local.get(null, (items) => {
  let area = document.getElementById("data");
  area.innerHTML = "";

  for (let site in items) {
    let min = Math.floor(items[site] / 60);
    area.innerHTML += `<p><b>${site}</b> : ${min} min</p>`;
  }
});
