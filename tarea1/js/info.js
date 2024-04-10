const container = document.getElementById("container");

const display = JSON.parse(localStorage.getItem(container.getAttribute("data-value") == "product" ? "product" : "order"));


const setDisplay = () => {

    container.style.height = "auto";
    
    const imgs = ["img1", "img2", "img3"]

    let html = "";
    
    for(key in display){
        html += '<div class="info">';

        html += `<h2>${key.charAt(0).toUpperCase() + key.substring(1, key.length)}</h2>`;

        if(typeof(display[key]) === 'object'){

            display[key].forEach((element, idx) => {

                if(element.match(/\.webp/g)){

                    html += `<img src="../media/${element}" id="${imgs[idx]}" width=640px height=480px alt="${element.substring(element.substring(0, element.length - 4))}">`;

                }

                else{

                    if(idx == display[key].length - 1){

                        html += `<span>${element}.</span>`;

                    }
                    else{

                        html += `<span>${element}, </span>`;

                    }

                }
            })
        }
        else{
            html += `<span>${display[key]}</span>`;
        }


        html += "<hr></div>";
    }

    container.innerHTML = html + container.innerHTML;

    const big = (img) => {
        const div = document.getElementById("image");

        div.innerHTML = `<div id="blur" class="blur"><img class="full-image" src="../media/${img}" width=1280px height=1024px alt="${img.substring(img.substring(0, img.length - 4))}"></div>`;

        document.getElementById("bar").style.display = "none";

        document.getElementById("blur").addEventListener("click", () => {

            div.innerHTML = "";
            document.getElementById("bar").style.display = "block";

        })
    
    }

    if(document.getElementById(imgs[0])){document.getElementById(imgs[0]).addEventListener("click", ()=>{big(display["fotos"][0])})};
    if(document.getElementById(imgs[1])){document.getElementById(imgs[1]).addEventListener("click", ()=>{big(display["fotos"][1])})}
    if(document.getElementById(imgs[2])){document.getElementById(imgs[2]).addEventListener("click", ()=>{big(display["fotos"][2])})};


}




setDisplay()