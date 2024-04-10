const PRODUCT_LIST = [
    {
        "tipo" : "Fruta",
        "productos" : ["Limón", "Naranja"],
        "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus vulputate erat vel consectetur. Mauris vel ante elit. Sed ut erat laoreet, feugiat nisl et, fermentum est. Etiam pretium in lacus sit amet laoreet. Vestibulum mauris mauris, tempor quis massa vel, sollicitudin fringilla tellus. Aenean vulputate pretium sollicitudin.",
        "region" : "Región de Los Lagos",
        "comuna" : "Osorno",
        "fotos" : ["limon.webp", "naranja.webp"],
        "nombre" : "Nombre 1",
        "email" : "example_email1@domain.cl",
        "numero" : "+56912341234"
    },
    {
        "tipo" : "Fruta",
        "productos" : ["Manzana"],
        "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus vulputate erat vel consectetur. Mauris vel ante elit. Sed ut erat laoreet, feugiat nisl et, fermentum est. Etiam pretium in lacus sit amet laoreet. Vestibulum mauris mauris, tempor quis massa vel, sollicitudin fringilla tellus. Aenean vulputate pretium sollicitudin.",
        "region" : "Valparaíso",
        "comuna" : "Puchuncaví",
        "fotos" : ["manzana.webp"],
        "nombre" : "Nombre 2",
        "email" : "example_email2@domain.cl",
        "numero" : "+56912341234"
    },
    {
        "tipo" : "Vegetal",
        "productos" : ["Champiñon", "Ajo", "Pimiento"],
        "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus vulputate erat vel consectetur. Mauris vel ante elit. Sed ut erat laoreet, feugiat nisl et, fermentum est. Etiam pretium in lacus sit amet laoreet. Vestibulum mauris mauris, tempor quis massa vel, sollicitudin fringilla tellus. Aenean vulputate pretium sollicitudin.",
        "region" : "Región de Biobío",
        "comuna" : "Coronel",
        "fotos" : ["champinon.webp", "ajo.webp", "pimiento.webp"],
        "nombre" : "Nombre 3",
        "email" : "example_email3@domain.cl",
        "numero" : "+56912341234"
    },
    {
        "tipo" : "Fruta",
        "productos" : ["Piña", "Kiwi", "Uva"],
        "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus vulputate erat vel consectetur. Mauris vel ante elit. Sed ut erat laoreet, feugiat nisl et, fermentum est. Etiam pretium in lacus sit amet laoreet. Vestibulum mauris mauris, tempor quis massa vel, sollicitudin fringilla tellus. Aenean vulputate pretium sollicitudin.",
        "region" : "Región del Maule",
        "comuna" : "Parral",
        "fotos" : ["pina.webp", "kiwi.webp", "uva.webp"],
        "nombre" : "Nombre 4",
        "email" : "example_email4@domain.cl",
        "numero" : "+56912341234"
    },
    {
        "tipo" : "Vegetal",
        "productos" : ["Coliflor", "Rábano"],
        "descripcion" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus vulputate erat vel consectetur. Mauris vel ante elit. Sed ut erat laoreet, feugiat nisl et, fermentum est. Etiam pretium in lacus sit amet laoreet. Vestibulum mauris mauris, tempor quis massa vel, sollicitudin fringilla tellus. Aenean vulputate pretium sollicitudin.",
        "region" : "Región de Los Rios",
        "comuna" : "Panguipulli",
        "fotos" : ["coliflor.webp", "rabano.webp"],
        "nombre" : "Nombre 5",
        "email" : "example_email5@domain.cl",
        "numero" : "+56912341234"
    }
]

const ORDER_LIST = [
    {
        "tipo" : "Fruta",
        "productos" : ["Limón", "Naranja"],
        "region" : "Región de Los Lagos",
        "comuna" : "Osorno",
        "nombre" : "Nombre 1",
        "email" : "example_email1@domain.cl",
        "numero" : "+56912341234"
    },
    {
        "tipo" : "Fruta",
        "productos" : ["Manzana"],
        "region" : "Valparaíso",
        "comuna" : "Puchuncaví",
        "nombre" : "Nombre 2",
        "email" : "example_email2@domain.cl",
        "numero" : "+56912341234"
    },
    {
        "tipo" : "Vegetal",
        "productos" : ["Champiñon", "Ajo", "Pimiento"],
        "region" : "Región de Biobío",
        "comuna" : "Coronel",
        "nombre" : "Nombre 3",
        "email" : "example_email3@domain.cl",
        "numero" : "+56912341234"
    },
    {
        "tipo" : "Fruta",
        "productos" : ["Piña", "Kiwi", "Uva"],
        "region" : "Región del Maule",
        "comuna" : "Parral",
        "nombre" : "Nombre 4",
        "email" : "example_email4@domain.cl",
        "numero" : "+56912341234"
    },
    {
        "tipo" : "Vegetal",
        "productos" : ["Coliflor", "Rábano"],
        "region" : "Región de Los Rios",
        "comuna" : "Panguipulli",
        "nombre" : "Nombre 5",
        "email" : "example_email5@domain.cl",
        "numero" : "+56912341234"
    }
]


const table = document.getElementById("table");


const update_table = () => {
    const data_value = table.getAttribute("data-value");
    
    const data = data_value == "product" ? PRODUCT_LIST : ORDER_LIST;

    const items = [];

    data.forEach((element, idx) => {

        items.push(element);

        let row = "";

        row += `<td>${element.tipo}</td>`;
        
        let pr = "";
        element.productos.forEach(producto => {
            pr += `, ${producto}`;
        });

        row += "<td>" + pr.substring(2, pr.length) + "</td>";

        row += `<td>${element.region}</td>`;

        row += `<td>${element.comuna}</td>`;

        if(element.fotos){
            row += "<td>";

            element.fotos.forEach(foto => {
                row += `<img src="../media/${foto}" width=120px height=120px alt=${foto.substring(0, foto.length-4)}>`;
            });

            row += "</td>";

        }
        else{

            row += `<td>${element.nombre}</td>`;

        }

        document.getElementById(`row${idx}`).innerHTML = row;

    })


    const event = (idx) => {

        localStorage.setItem(data_value, JSON.stringify(items[idx]));
        console.log(JSON.stringify(items[idx]));
        window.open(`./informacion-${data_value == "product" ? "producto" : "pedido"}.html`, "_self")

    }

    document.getElementById("row0").addEventListener("click", () => {event(0)});
    document.getElementById("row1").addEventListener("click", () => {event(1)});
    document.getElementById("row2").addEventListener("click", () => {event(2)});
    document.getElementById("row3").addEventListener("click", () => {event(3)});
    document.getElementById("row4").addEventListener("click", () => {event(4)});

}



update_table();
