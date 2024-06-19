let img0;
let img1;
let img2;




const big = (img) => {
    const div = document.getElementById("image");

    div.innerHTML = `<div id="blur" class="blur"><img class="full-image" src="${img}" width=1280px height=1024px alt="foto"></div>`;

    document.getElementById("bar").style.display = "none";

    document.getElementById("blur").addEventListener("click", () => {

        div.innerHTML = "";
        document.getElementById("bar").style.display = "block";

    })

}


if(document.getElementById("img0")){
    img0 = document.getElementById("img0")
    
    
    img0.addEventListener("click", ()=>{
        big(img0.getAttribute("src"))
    })
};
if(document.getElementById("img1")){
    img1 = document.getElementById("img1")
    
    
    img1.addEventListener("click", ()=>{
        big(img1.getAttribute("src"))
    })
};
if(document.getElementById("img2")){
    img2 = document.getElementById("img2")
    
    
    img2.addEventListener("click", ()=>{
        big(img2.getAttribute("src"))
    })
}
