const PRODUCTS = {
    "fruit":[
        "Arándano",
        "Frambuesa",
        "Frutilla",
        "Grosella",
        "Mora",
        "Limón",
        "Mandarina",
        "Naranja",
        "Pomelo",
        "Melón",
        "Sandía",
        "Palta",
        "Chirimoya",
        "Coco",
        "Dátil",
        "Kiwi",
        "Mango",
        "Papaya",
        "Piña",
        "Plátano",
        "Damasco",
        "Cereza",
        "Ciruela",
        "Higo",
        "Kaki",
        "Manzana",
        "Durazno",
        "Nectarin",
        "Níspero",
        "Pera",
        "Uva",
        "Almendra",
        "Avellana",
        "Maní",
        "Castaña",
        "Nuez",
        "Pistacho"
    ],
    "vegetable":[
        "Brócoli",
        "Repollo",
        "Coliflor",
        "Rábano",
        "Alcachofa",
        "Lechuga",
        "Zapallo",
        "Pepino",
        "Haba",
        "Maíz",
        "Champiñón",
        "Acelga",
        "Apio",
        "Espinaca",
        "Perejil",
        "Ajo",
        "Cebolla",
        "Espárrago",
        "Puerro",
        "Remolacha",
        "Berenjena",
        "Papa",
        "Pimiento",
        "Tomate",
        "Zanahoria"
    ]
}

const REGIONS = {
	"regiones": [
        {
            "region": "Región de Tarapacá",
            "comunas": ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"]
        },
        {
            "region": "Región de Antofagasta",
            "comunas": ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro Atacama", "Sierra Gorda", "Taltal", "Tocopilla"]
        },
        {
            "region": "Región de Atacama",
            "comunas": ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"]
        },
        {
            "region": "Región de Coquimbo",
            "comunas": ["Andacollo", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"]
        },
        {
            "region": "Región de Valparaíso",
            "comunas": ["Algarrobo", "Cabildo", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón", "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Calera", "La Cruz", "La Ligua", "Limache", "Llay Llay", "Los Andes", "Nogales", "Olmué", "Papudo", "Pencahue",  "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"]
        },
        {
            "region": "Región del Libertador Bernardo Ohiggins",
            "comunas": ["Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchigue", "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Vicente", "Santa Cruz"]
        },
        {
            "region": "Región del Maule",
            "comunas": ["Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Río Claro", "Romeral", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"]
        },
        {
            "region": "Región del Biobío",
            "comunas": ["Alto Bio Bío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"]
        },
        {
            "region": "Región de La Araucanía",
            "comunas": ["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Puerto Saavedra", "Purén", "Renaico", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"]
        },
        {
            "region": "Región de Los Lagos",
            "comunas": ["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan", "San Pablo"]
        },
        {
            "region": "Región Aisén del General Carlos Ibáñez del Campo",
            "comunas": ["Aysen", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O'Higins", "Río Ibá?ez", "Tortel"]
        },
        {
            "region": "Región de Magallanes y la Antártica Chilena",
            "comunas": ["Antártica", "Porvenir", "Primavera", "Puerto Natales", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"]
        },
        {
            "region": "Región Metropolitana de Santiago",
            "comunas": ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barrenechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"]
        },
        {
            "region": "Región Arica y Parinacota",
            "comunas": ["Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Mariquina", "Máfil", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"]
        },
        {
            "region": "Región Arica y Parinacota",
            "comunas": ["Arica", "Camarones", "Gral. Lagos", "Putre"]
        },
        {
            "region": "Región del Ñuble",
            "comunas": ["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Trehuaco", "Yungay", "Ñiquén"]
        },
    ]
}


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

        if(checkbox == "fruit"){
            PRODUCTS.fruit.forEach(element => {
                product_select.innerHTML += `<option value="${element}">${element}</option>`;
            });
        }
        else{
            PRODUCTS.vegetable.forEach(element => {
                product_select.innerHTML += `<option value="${element}">${element}</option>`;
            });
        }
        // if(checkbox == "fruit"){

        //     PRODUCTS.fruit.forEach((product, idx) => {
        //         product_options.innerHTML += `<label for="${idx}">${product}</label>`

        //         product_options.innerHTML += `<input type="checkbox">`
        //     })

        // }


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
        product_select.innerHTML = ";";
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

const update_region_select = () => {
    region_select.innerHTML = `<option value="-1">         </option>`;

    REGIONS.regiones.forEach((element, idx) => {
        region_select.innerHTML += `<option value="${idx+1}">${element.region}</option>`
    })        

    update_city_select()
}

const update_city_select = () => {
    city_select.innerHTML = `<option value="-1">         </option>`;

    if(region_select.value == -1){return}

    const region_idx = region_select.value-1;

    REGIONS.regiones[region_idx].comunas.forEach(element => {
        city_select.innerHTML += `<option>${element}</option>`;
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


    const valid_checkbox = fruit_checkbox.checked || vegetable_checkbox.checked;
    const valid_products = amount_added > 0;
    let valid_files;
    if(file_input){valid_files = file_input.files.length >= 1 && file_input.files.length <= 3;}
    else{valid_files = true}
    const valid_region = region_select.value != -1;
    const valid_city = city_select.value != -1;
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

    //error = false; //for debugging

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

