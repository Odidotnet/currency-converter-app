const fromCur = document.querySelector(".xchange select");
const toCur = document.querySelector(".» select");
const btnExecute = document.querySelector("form, button");
const icons = document.querySelector("form .switch");
const amount = document.querySelector("form input");
const xchangeRate = document.querySelector("form .output");

// event listener for the currency dropdown



[fromCur, toCur].forEach((select, i) => {
  for (let curCode in countries) {
    const selected =
      (i === 0 && curCode === "USD") || (i === 1 && curCode === "GBP")
        ? "selected"
        : "";
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${curCode}"
            ${selected}>${curCode}</option>`
    );
  }
  select.addEventListener("change", () => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${countries[
      code
    ].toLowerCase()}.png`;
  });
});

//function to get xchangevrate from the api

async function getExchangeRate() {
  const amountVal = parseFloat(amount.value.replace(/,/g, '') || 1);
  xchangeRate.innerText = "Getting exchange rate...";

  try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/5fdf4f1a4f6a4c2a182db54e/latest/${fromCur.value}`); // my own api key
      const output = await response.json();
      
      console.log(output); // Log the entire response for debugging

      const exchangeRate = output.conversion_rates[toCur.value];

      console.log(exchangeRate); // Log the exchange rate for debugging

      const totalExRate = (amountVal * exchangeRate).toFixed(2);
      xchangeRate.innerText = `${amountVal.toLocaleString()} ${fromCur.value} = ${Number(totalExRate).toLocaleString()} ${toCur.value}`;
  } catch (error) {
      console.error(error); // Log any errors for debugging
      xchangeRate.innerText = "Something went wrong....";
  }
}


//event listeners for button and xchange icon click
window.addEventListener("load", getExchangeRate);
btnExecute.addEventListener("click", (e) =>{
    e.preventDefault();
    getExchangeRate();
});


icons.addEventListener("click", () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach((select) =>{
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${countries[code].toLowerCase()}.png`;
    });
    getExchangeRate();
})