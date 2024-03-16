const baseUrl = 'https://api.freecurrencyapi.com/v1';
const apiKey = 'YOUR_API_KEY_HERE';

function getUrl(path, baseCurrency) {
  if (baseCurrency) {
    return `${baseUrl}/${path}?apikey=${apiKey}&base_currency=${baseCurrency}`;
  }
  return `${baseUrl}/${path}?apikey=${apiKey}`;
}

async function getStatusAsync() {
  const response = await fetch(getUrl('status'));
  const data = await response.json();
  return data;
}

function getCurrenciesPromise() {
  return fetch(getUrl('currencies'))
    .then((response) => response.json())
    .then((data) => data);
}

async function getCurrencies() {
  const response = await fetch(getUrl('currencies'));
  const data = await response.json();
  return data;
  /*
  Sample response:
  {
    "data": {
        "EUR": {
            "symbol": "€",
            "name": "Euro",
            "symbol_native": "€",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "EUR",
            "name_plural": "Euros",
            "type": "fiat"
        },
        "USD": {
            "symbol": "$",
            "name": "US Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "USD",
            "name_plural": "US dollars",
            "type": "fiat"
        },
        ...
  */
}

async function getLatest(baseCurrency) {
  const response = await fetch(getUrl('latest', baseCurrency));
  const data = await response.json();
  return data;
}

async function getHistorical() {
  const response = await fetch(getUrl('historical'));
  const data = await response.json();
  return data;
}

async function fillCurrencies() {

  // getCurrenciesPromise().then((apiData) => {
  //     // Daha ilkel yöntem
  //   const inputGroupSelect01 = document.getElementById('inputGroupSelect01');
  //   while (inputGroupSelect01.firstChild) {
  //     inputGroupSelect01.removeChild(inputGroupSelect01.firstChild);
  //   }

  //   for (const code in apiData.data) {
  //     const option = document.createElement('option');
  //     option.value = code;
  //     option.textContent = apiData.data[code].name;
  //     inputGroupSelect01.appendChild(option);
  //   }

  //   // Daha yeni yöntem
  //   const inputGroupSelect02 = document.getElementById('inputGroupSelect02');
  //   inputGroupSelect02.innerHTML = '';

  //   for (const [code, currency] of Object.entries(apiData.data)) {
  //     inputGroupSelect02.appendChild(new Option(currency.name, code));
  //   }
  // }).catch((error) => { 
  //   console.log('Apiden veri alınamadı. Hata:', error);
  // });

  const apiData = await getCurrencies();

  // Daha ilkel yöntem
  const inputGroupSelect01 = document.getElementById('inputGroupSelect01');
  while (inputGroupSelect01.firstChild) {
    inputGroupSelect01.removeChild(inputGroupSelect01.firstChild);
  }

  for (const code in apiData.data) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = apiData.data[code].name;
    inputGroupSelect01.appendChild(option);
  }

  // Daha yeni yöntem
  const inputGroupSelect02 = document.getElementById('inputGroupSelect02');
  inputGroupSelect02.innerHTML = '';

  for (const [code, currency] of Object.entries(apiData.data)) {
    inputGroupSelect02.appendChild(new Option(currency.name, code));
  }
}

window.onload = async function () {

  await fillCurrencies();

  document.getElementById('convertButton').addEventListener('click', async function () {

    const inputGroupSelect01 = document.getElementById('inputGroupSelect01');
    const baseCurrency = inputGroupSelect01.value;
    var latest = await getLatest(baseCurrency);
    console.log(latest);

    const inputGroupSelect02 = document.getElementById('inputGroupSelect02');
    const targetCurrency = inputGroupSelect02.value;

    const inputFrom = document.getElementById('inputFrom');
    const amount = inputFrom.value;

    if(amount === '') {
      alert('Lütfen bir miktar giriniz.');
      return;
    }

    const result = amount * latest.data[targetCurrency];
    const resultElement = document.getElementById('inputTo');
    resultElement.value = result;

  });

};



// document.getElementById("btn").addEventListener("click", change);

// function change() {
//   const xhr = new XMLHttpRequest();

//   xhr.open(
//     "GET",
//     "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rqjnbC7FvEzIL6b6absryHrBK4lNrc7VKJexgQqP"
//   );


//   xhr.onload = function () {
//     if (this.status == 200) {
//       const response = JSON.parse(this.responseText);

//       console.log(response.data);
//     }

//   };

//   xhr.send();
// }
