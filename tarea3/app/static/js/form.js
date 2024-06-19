let amount_added = 0;
const selected_products = [0,0,0,0,0];

const fruit_checkbox = document.getElementById("fruit-checkbox");
const vegetable_checkbox = document.getElementById("vegetable-checkbox");
const product_select = document.getElementById("product-select");
const description_box = document.getElementById("description");
const file_input = document.getElementById("file-input");
const region_select = document.getElementById("region-select");
const city_select = document.getElementById("city-select");
const form_name = document.getElementById("name");
const form_email = document.getElementById("email");
const form_phone = document.getElementById("phone");
const submit_button = document.getElementById("submit-button");

const inputs = [fruit_checkbox, vegetable_checkbox, product_select, description_box, file_input, region_select, city_select, form_name, form_email, form_phone, submit_button]

const confirmation_div = document.getElementById("confirmation-div");


const check_lock = (checkbox) => {

    const update_product_select = (checkbox) => {

        fetch(`http://localhost:5000/get-products-of-type-${checkbox}/`)
            .then((response) => {return response.json()})
            .then((json) => {
                json.forEach((product) => {
                    product_select.innerHTML += `<option value=${product[1]}>${product[1]}</option>`;
                })
            })

    }

    let self, other;

    if(checkbox == "fruit"){
        self = fruit_checkbox;
        other = vegetable_checkbox;
    }
    else{
        self = vegetable_checkbox;
        other = fruit_checkbox;
    }

    if(self.checked){
        other.disabled = true;
        update_product_select(checkbox);
        product_select.disabled = false;
    }
    else{
        other.disabled = false;
        product_select.disabled = true;
        product_select.innerHTML = "";
    }

};

const add_product = () => {
    if(product_select.value == "         "){return;}

    const products_added = [
        document.getElementById("product-1"),
        document.getElementById("product-2"),
        document.getElementById("product-3"),
        document.getElementById("product-4"),
        document.getElementById("product-5")
    ]

    const remove = [
        ()=>{products_added[0].innerHTML = ""; selected_products[0] = 0; product_select.disabled = false; amount_added--; console.log(selected_products)},
        ()=>{products_added[1].innerHTML = ""; selected_products[1] = 0; product_select.disabled = false; amount_added--; console.log(selected_products)},
        ()=>{products_added[2].innerHTML = ""; selected_products[2] = 0; product_select.disabled = false; amount_added--; console.log(selected_products)},
        ()=>{products_added[3].innerHTML = ""; selected_products[3] = 0; product_select.disabled = false; amount_added--; console.log(selected_products)},
        ()=>{products_added[4].innerHTML = ""; selected_products[4] = 0; product_select.disabled = false; amount_added--; console.log(selected_products)}
    ]

    if(amount_added < 5){

        let i = 0;

        while(selected_products[i] != 0){

            i++;

        }

        selected_products[i] = 1;

        products_added[i].innerHTML = `<span class="form-item">${product_select.value}</span> <button type="button" class="button2" id="remove${i+1}">Quitar</button>`;
        products_added[i].innerHTML += `<input type="hidden" name="${product_select.value}" value="product">`;

        document.getElementById(`remove${i+1}`).addEventListener("click", remove[i])

        amount_added++;

        if(amount_added == 5){product_select.disabled=true;};
    }
}

const update_city_select = () => {

    const region_id = region_select.value;
    city_select.innerHTML = '';

    fetch(`http://localhost:5000/get-cities-from-region-${region_id}/`)
        .then((response) => {return response.json()})
        .then((json) =>{
            json.forEach((city) => {
                city_select.innerHTML += `<option value="${city[0]}">${city[1]}</option>`;
            })
        })
}

const update_region_select = () => {
    fetch('http://localhost:5000/get-regions-info/')
        .then((response) => {return response.json()})
        .then((json) =>{
            json.forEach((region) => {
                region_select.innerHTML += `<option value="${region[0]}">${region[1]}</option>`;
            })
        })
}



const lock_form = (val) => {
    inputs.forEach(element => {if(element){element.disabled = val}});
    const ns = [1,2,3,4,5];
    ns.forEach(element => {if(document.getElementById(`remove${element}`)) document.getElementById(`remove${element}`).disabled = val});
}

const validate_form = () => {
    const empty = (str) => {

        for(let i = 0; i < str.length; i++){

            if(str[i] != ' '){

               return false;

            }

        }

        return true;

    }


    const valid_checkbox = (fruit_checkbox.checked || vegetable_checkbox.checked) && !(fruit_checkbox.checked && vegetable_checkbox.checked);
    const valid_products = amount_added > 0;
    let valid_files;
    if(file_input){valid_files = file_input.files.length >= 1 && file_input.files.length <= 3;}
    else{valid_files = true}
    const valid_region = 1 <= region_select.value && region_select.value < 16;
    const valid_city = 10101 <= city_select.value && city_select.value < 130606;
    const valid_name = !empty(form_name.value) && form_name.value.length >= 3 && form_name.value.length < 80;
    const valid_email = form_email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) != null;
    const valid_phone = !form_phone.value || form_phone.value.replaceAll(' ','').match(/^(\+?56)?(\s?)(2|9)(\s?)[98765432]\d{7}$/) != null;

    const error_messages = [
        "Debe seleccionar un tipo de producto",
        "Debe seleccionar al menos un producto para el pedido",
        () => {
            if(file_input.files.length == 0){return "Debe seleccionar al menos un archivo"}
            else{return "Demasiados archivos seleccionados (máx. 3)"}
        },
        "Debe seleccionar una region",
        "Debe seleccionar una comuna",
        () => {
            if(empty(form_name.value)){return "El nombre no puede estar vacío"}
            else if(form_name.value.length < 3){return "El nombre es demasiado corto (3 mín.)"}
            else{return "El nombre es demasiado largo (80 máx.)"}
        },
        "El email no tiene un formato válido",
        "El número de teléfono no tiene un formato válido"
    ]

    const conditions = [valid_checkbox, valid_products, valid_files, valid_region, valid_city, valid_name, valid_email, valid_phone];
    let error = false; 

    conditions.forEach((cond, idx) => {
        if(!document.getElementById(`error${idx+1}`)){return}
        
        if(!cond){
            error = true

            if(idx == 2 || idx == 5){
                document.getElementById(`error${idx+1}`).innerText = error_messages[idx]();
            }
            else{
                document.getElementById(`error${idx+1}`).innerText = error_messages[idx];
            }

        }
        else{
            document.getElementById(`error${idx+1}`).innerText = "";
        }
    })

    error = false; //for debugging

    if(!error){
        lock_form(true)

        const div = document.getElementById("modal");
        const value = div.getAttribute("data-value");
        
        div.innerHTML=`<div><p>¿Enviar ${value}?</p></div> <div><button type="submit" class="button2" id="confirm">Confirmar</button> <button type="button" class="button2" id="deny">Volver al formulario</button></div>`;

        document.getElementById("confirm").addEventListener("click", () => {lock_form(false)})
        document.getElementById("deny").addEventListener("click", () => {
            div.innerHTML="";
            div.style.display = "none";
            lock_form(false);
        })

        div.style.display = "flex";
    }
}


fruit_checkbox.addEventListener("click", () => {check_lock("fruit")});
vegetable_checkbox.addEventListener("click", () => {check_lock("vegetable")});
product_select.addEventListener("change", add_product);
region_select.addEventListener("change", update_city_select);
submit_button.addEventListener("click", validate_form);


update_region_select()

