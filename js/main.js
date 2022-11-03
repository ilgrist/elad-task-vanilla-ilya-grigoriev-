'use strict';

async function onInit() {
  let jsonData = await loadJson('../data/data.json');
  renderJsonPreview(jsonData);
}

function renderJsonPreview(jsonData) {
  let elJsonPreview = document.querySelector('.app');
  elJsonPreview.innerHTML = getJsonPreview(jsonData, 1);
}

function getJsonPreview(data, level) {
  const strHTMLs = data.map(
    (item) => `
    <div class="json-preview level-${level}">
        <p>Id: ${item.id}</p>
        <p>SiteName: ${item.name}</p>
        <a href=${`//${item.url}`} target="_blank">
          Site Url: ${item.name}
        </a>
    ${item.subData ? getJsonPreview(item.subData, calcLevel(level)) : ''}
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
