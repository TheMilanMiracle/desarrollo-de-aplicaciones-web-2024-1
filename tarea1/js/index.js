const new_product = document.getElementById("b1");
const display_products = document.getElementById("b2");
const new_order = document.getElementById("b3");
const display_orders = document.getElementById("b4");


new_product.addEventListener("click", ()=>{window.open('./agregar-producto.html', '_self')});
display_products.addEventListener("click", ()=>{window.open('./ver-productos.html', '_self')})
new_order.addEventListener("click", ()=>{window.open('./agregar-pedido.html', '_self')})
display_orders.addEventListener("click", ()=>{window.open('./ver-pedidos.html', '_self')})