
document.getElementById("btn").addEventListener("click", change);

function change() {
  const xhr = new XMLHttpRequest();
  
  xhr.open(
    "GET",
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rqjnbC7FvEzIL6b6absryHrBK4lNrc7VKJexgQqP"
    );
    

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);

      console.log(response.data);
    }

  };
  
  xhr.send();
}
