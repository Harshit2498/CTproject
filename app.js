const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var upd;

form.addEventListener('submit', (e) => {


    e.preventDefault();
    const ctype = form.elements.coinType.value;

    if (upd) {
        clearTimeout(upd);
    }

    fetchPrice(ctype);

});

const fetchPrice = async (ctype) => {
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currence=INR`);
    console.log(r.data.coin.price);

    const price = r.data.coin.price;
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const base = r.data.coin.name;
    const rank = r.data.coin.rank;
    const target = 'USD';
    var col= "green";
    if(change<0){
        col="red";
    }
    //const time = r.data.timestamp;

    res.innerHTML = `
    <tr style="background-color:#fca311; color: white; font-weight:700;">
      <td>
        Property
      </td>
      <td>
        Value
      </td>
    </tr>
<tr style="color: white;">
    <td>${base}</td>
    <td style="color:${col};"> <span style = "font-size: 1.3em;"> ${price} </span> ${target}</td>
</tr>
<tr style="color: white;">
    <td>Rank</td>
    <td >${rank}</td>
</tr>
<tr style="color: white;">
    <td>Volume</td>
    <td>${volume}</td>
</tr>
<tr style="color: white;">
    <td>Change</td>
    <td style="color:${col};">${change} ${target}</td>
</tr>`

    upd = setTimeout(() => fetchPrice(ctype), 10000);
}