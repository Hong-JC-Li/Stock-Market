const authority = 'https://financialmodelingprep.com';

const apiKeyOne = '0f487b6e8f26cef67a2ebe1fd50b893f'; // not working
const apiKeyTwo = 'e40a47d9dbd4cacd7ee514201122fb40'; // working
const apiKey = apiKeyTwo;

// Search card render.
const searchCard = (information) => {
    
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('row');
  cardWrapper.classList.add('stock-card');

  cardWrapper.innerHTML = `

    <div class="col-6">
        <p class="stock-title">${information.profile.companyName}</p>
        <p class="stock-symbol">${information.symbol}</p>
    </div>
          
    <div class="col-4"> 
        <h1 class="stock-price">${information.profile.price}</h1>
        <p class="index-change mt-3">
          <span class="badge ${ information.profile.changes < 0 ? 'badge-danger' : 'badge-success'}"> ${information.profile.changes } ${information.profile.changesPercentage }</span>
        </p>
    </div>

    <div class="col-2"> 
        <img src="${information.profile.image}" class="ml-4 card-img">
    </div>`;
  
  return cardWrapper;
};

// Search.
$(".inputbutton").click(() => {
  
  const ticketSymbol = $(".inputfile").val();
  const url = `https://financialmodelingprep.com/api/v3/company/profile/${ticketSymbol}?apikey=${apiKey}`;
  
  console.log(url);
    
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
        
    const singleStockCard = searchCard(data);
    const stockCards = document.querySelector('.stock-cards');
    
    stockCards.appendChild(singleStockCard);
  });
});
  

// This function will fetch the indexes.
 const getIndexes = async () => {
  const response = await fetch(`${authority}/api/v3/quote/^DJI,^GSPC,^IXIC,^VIX?apikey=${apiKey}`);
  const data =  response.json();
  return data;
};

// This function will render each card into the screen.
 const renderCard = (index) => {
    return `
    <div class="index-card" >
        <h5 class="card-title index-title"> ${index.name} </h5>
        <p class="index-price">${index.price} </p>  
        <p class="index-change">
          <span class="badge ${ index.change < 0 ? 'badge-danger' : 'badge-success'}"> ${index.change} (${index.changesPercentage})%</span>
        </p>
    </div>`;
 };
 
// This is an Immediately invoked function. No need to call it.
(async () => {
  
  const indexes = await getIndexes();
  
  indexes.forEach((index) => {
    const indexCardWrapper = document.createElement('div');
    const indexParent = document.querySelector('.row');
    
    indexCardWrapper.classList.add('col');
    indexCardWrapper.innerHTML = renderCard(index);
    indexParent.appendChild(indexCardWrapper);
  });
    
})();