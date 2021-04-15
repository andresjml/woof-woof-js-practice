function fetchPups(){
    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(json => {
            addPupsToBar(json)
            
        })
}


function addPupsToBar(pups){
    pups.forEach(element => {
        let div=document.getElementById('dog-bar')
        let span=document.createElement('span')
        span.innerHTML=element.name
        span.addEventListener('click', function(){
            clearPup();
            clickOnPup(element);
        }) 
        div.appendChild(span)
               
    });        
}


function clearPup(){
    let element = document.getElementById("dog-info");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


function clickOnPup(pup){
    
    let img= document.createElement('img')
    img.setAttribute("src", `${pup.image}`);
    let h2 = document.createElement('h2')
    h2.innerHTML=pup.name
    let button = document.createElement('button')
    button.id=`good-bad`
    if(pup.isGoodDog===true){
        button.innerHTML=`"Good Dog!"`
    }
    else{
        button.innerHTML=`"Bad Dog!"`
    }
    let divDogInfo = document.getElementById('dog-info')
    divDogInfo.append(img)
    divDogInfo.append(h2)
    divDogInfo.append(button)

    button.addEventListener('click',function(){
        goodBadButton(pup)
    })
}

function goodBadButton(pup){
    let button = document.getElementById('good-bad')
    if(button.innerHTML===`"Good Dog!"`){

        button.innerHTML=`"Bad Dog!"`

        let formData ={
            isGoodDog:false
        }

        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
                body: JSON.stringify(formData)
        }
        fetch(`http://localhost:3000/pups/${pup.id}`,configObj)
    }
    else{
        button.innerHTML=`"Good Dog!"`

        let formData ={
            isGoodDog:true
        }

        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
                body: JSON.stringify(formData)
        }
        fetch(`http://localhost:3000/pups/${pup.id}`,configObj)
    }
}



document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM fully loaded and parsed')
    fetchPups();
})