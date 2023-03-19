const buttonComponent = (id, text) => `<button id="${id}">${text}</button>`;

const beerTypeComponent = (list) => list.map((tag) => `<li>${tag}</li>`);

const beerComponent = ({ brewery, name, type, score, abv }) => `
	<div class="beer">
		<h2>${name}</h2>
		<h3>${brewery}</h3>
		<ul>${beerTypeComponent(type)}</ul>
		<h4>${score}</h4>
		<h5>${abv}</h5>
	</div>
`;
function filterStrongIPAs() {
  return beers.filter((beer) => beer.abv >= 6);
}
const winnerComponent = (beer) => `
<div id="winner">
<h1>The best light Ale is</h1>
${beerComponent(beer)}
${buttonComponent('closeWinner', 'Close')}
</div>
`;
const sortBeerComponent = [...beers];

let eventCounter = 0;

function isSortedAndHow(beerArray) {
  const sortedAsc = [...beerArray].sort((a, b) => a.score - b.score);
  const sortedDesc = [...beerArray].sort((a, b) => b.score - a.score);
  return eventCounter % 2 === 0 ? sortedAsc : sortedDesc;
}

function removeClass() {
  const beerClass = document.getElementsByClassName('beer');
  Array.from(beerClass).forEach((element) => element.remove());
}

const loadEvent = (_) => {
  // the HTML elements with ID are available as global variables with the ID (eg. root) but it is better if you
  const rootElement = document.getElementById('root');


  //You can add the HTML code to the DOM like this
  rootElement.insertAdjacentHTML('afterbegin', buttonComponent('loadBeers', 'Load the beers'));


  function loadBeersFromData(beers) {
    beers.map((beer) => rootElement.insertAdjacentHTML('beforeend', beerComponent(beer)));
  }
  function loadSortedBeersFromData(beers) {
    beers.map((beer) => rootElement.insertAdjacentHTML('beforeend', beerComponent(beer)));
  }
  const clickEvent = (event) => {
    console.dir(event.target);
    console.dir(event.target.id);
    switch (event.target.id) {
    case 'loadBeers':
      loadBeersFromData(beers);
      event.target.remove();
      rootElement.insertAdjacentHTML('afterbegin', buttonComponent('sortByScore', 'Sort by Score'));
      rootElement.insertAdjacentHTML('afterbegin', buttonComponent('filterStrongIPAs', 'Strong IPAs'));
      break;
    case 'sortByScore':
      removeClass();
      eventCounter++;
      loadSortedBeersFromData(isSortedAndHow(sortBeerComponent));
      break;
    case 'filterStrongIPAs':
      event.target.remove();
      removeClass();
      eventCounter > 0 ?
        loadBeersFromData(isSortedAndHow(filterStrongIPAs())) :
        loadBeersFromData(filterStrongIPAs());
      rootElement.insertAdjacentHTML('afterbegin', buttonComponent('resetFilter', 'Reset filter  '));
      break;
    case 'resetFilter':
      event.target.remove();
      removeClass();
      eventCounter > 0 ?
        loadBeersFromData(isSortedAndHow(sortBeerComponent)) :
        loadBeersFromData(beers);
      rootElement.insertAdjacentHTML('afterbegin', buttonComponent('filterStrongIPAs', 'Strong IPAs'));
      break;
    }
  };
  window.addEventListener('click', clickEvent);
};

// you can run your code in different ways but this is the safest. This way you can make sure that all the content (including css, fonts) is loaded.
window.addEventListener('load', loadEvent);
