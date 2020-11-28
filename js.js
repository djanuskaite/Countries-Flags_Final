//Apsibreziam elementus ir isitraukiam regionu masyva.
const allBox=document.getElementById("all");
const submitbtn=document.getElementById("submitbtn");
const selectRegion=document.getElementById("regionSelect");
const searching=document.getElementById("search");
const region=["Americas", "Asia", "Oceania", "Polar", "Europe", "Africa", "all"];

const countriesList = document.getElementById("countries");
let countries;
countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
    displayCountryInfo(event.target.value);
}

fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then(data => initialize(data))
    .catch(err => console.log("Error:", err));

function initialize(countriesData) {
    countries = countriesData;
    let options = "";
    countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);

    countriesList.innerHTML = options;

    countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);  // Kad perkrovus psl ismestu random sali ir veliava.
    displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByAlpha3Code) {
    const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
    document.querySelector("#flag-container img").src = countryData.flag;    // isprintinam veliava html
    document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;
    document.getElementById("capital").innerHTML = countryData.capital;
    document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
    document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
    document.getElementById("languages").innerHTML = countryData.languages.filter(l => l.name).map(l => `${l.name} (${l.iso639_1})`).join(", ");
}


// "addEventListener" igalina input laukus.
searching.addEventListener("input", e=>{
    const {value} = e.target;
    const countries = document.querySelectorAll(".flagcard");
    countries.forEach(namea=>{
        if (namea.innerText.toLowerCase().includes(value.toLowerCase())){
            namea.style.display="flex";
        }
        else{
            namea.style.display="none";
        }
    })})

submitbtn.addEventListener("click", filter);
function filter(){
    for (i = 0; i < region.length; i++){
        const regions=document.getElementById(region[i]);  // paimam "region" masyva.
        regions.style.display="none";
    }
    for (i = 0; i < region.length; i++){
        if (region[i]==selectRegion.value){
            const selected=document.getElementById(selectRegion.value);
            selected.style.display="flex";
        }
    }
}

const fetchSalys = async () => {
    try {
        const res = await fetch("https://restcountries.eu/rest/v2/all");
        const salys = await res.json();
        saliunames=[]
        salys.forEach(salis=>{
            const flag = document.createElement("div");
            const img=document.createElement("img");
            const pavadinimas = document.createElement("h6");
            saliunames.push(salis.name)
            if (salis.region){
                const flag2 = document.createElement("div");
                const img2=document.createElement("img");
                const pavadinimas2 = document.createElement("h6");
                const region = document.getElementById(salis.region);
                img2.src=salis.flag;
                pavadinimas2.innerText=salis.name;
                region.appendChild(flag2).className="flagBox flagcard";
                flag2.appendChild(img2).className="imag";
                flag2.appendChild(pavadinimas2).className="pavad";
            }

            img.src=salis.flag;
            pavadinimas.innerText=salis.name;


            allBox.appendChild(flag).className="flagBox flagcard";
            flag.appendChild(img).className="imag";
            flag.appendChild(pavadinimas).className=salis.name;


        })
    }
    catch(error) {
        console.log(error);
    }
}
fetchSalys();

