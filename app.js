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

      const selectedOption = document.getElementById("inputGroupSelect01");

      if (selectedOption.value === "1") {
        const a = document.getElementById("doviz").value * response.data.TRY;
        document.getElementById("tr").value = a;
      } else if (selectedOption.value === "2") {
        const b = document.getElementById("doviz").value / response.data.EUR;
        document.getElementById("tr").value = b * response.data.TRY;
      } else if (selectedOption.value === "3") {
        const c = document.getElementById("doviz").value / response.data.TRY;
        document.getElementById("tr").value = c;
      }
      
    }
  };

  xhr.send();
}
