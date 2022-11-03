'use strict';

async function onInit() {
  let myData = await loadJson('../data/data.json');
  renderJsonPreview(myData);
}

function renderJsonPreview(jsonData) {
  let elJsonDisplay = document.querySelector('.app');
  elJsonDisplay.innerHTML = getElJsonPreview(jsonData, 1);
}

function getElJsonPreview(data, level) {
  const strHTMLs = data.map(
    (item) => `
    <div class="json-preview level-${level}">
        <p>Id: ${item.id}</p>
        <p>SiteName: ${item.name}</p>
        <a href=${`//${item.url}`} target="_blank">
          Site Url: ${item.name}
        </a>
    ${item.subData ? getElJsonPreview(item.subData, calcLevel(level)) : ''}
    </div>`
  );
  return strHTMLs.join('');
}

async function loadJson(path) {
  const res = await fetch(path);
  return res.json();
}

function calcLevel(level) {
  return level > 4 ? 1 : level + 1;
}
