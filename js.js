//Apsibreziam elementus ir isitraukiam regionu masyva.
const allBox=document.getElementById("all");
const submitbtn=document.getElementById("submitbtn");
const selectRegion=document.getElementById("regionSelect");
const searching=document.getElementById("search");
const region=["Americas", "Asia", "Oceania", "Polar", "Europe", "Africa", "all"];


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
            saliunames.push(salis.name)
            if (salis.region){
                const flag2 = document.createElement("div");
                const img2=document.createElement("img");
                const region = document.getElementById(salis.region);
                img2.src=salis.flag;
                flag2.innerText=salis.name;
                region.appendChild(flag2).className="flagBox flagcard";
                flag2.appendChild(img2).className="imag";
            }

            img.src=salis.flag;
            flag.innerText=salis.name;


            allBox.appendChild(flag).className="flagBox flagcard " + salis.name;
            flag.appendChild(img).className="imag";


        })
    }
    catch(error) {
        console.log(error);
    }
}
fetchSalys();
