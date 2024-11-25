function buscarPorId() {
    // Cogemos el id seleccionado
    let id = document.getElementById('ctg').value;
    console.log(id);

    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(datos => mostrarProducto(datos))
}

function mostrarProducto(datos) {
    let contenedor = document.getElementById('contenedor-producto');
    let div = document.querySelector('.productos');

    // Si el contenedor existe lo vacía, si no existe lo crea
    div ? div.innerHTML = '' : div = document.createElement('div');

    // Asignamos clase al div creado
    div.className = 'productos';

    // Llamamos la función para pintar el producto
    pintarProductos(datos, div, 150);

    contenedor.appendChild(div);
    div.style.width = '600px';
    div.style.margin = '10px auto';
    div.style.padding = '20px';
    div.style.textAlign = 'center';
    div.style.backgroundColor = '#FFFDD0';
}

function sacarTodo() {
    const url = 'https://fakestoreapi.com/products';

    fetch(`${url}?limit=${10}`)
        .then(res => res.json())
        .then(datos => mostrarTodo(datos))
}

function mostrarTodo(datos) {
    let contenedor = document.getElementById('contenedor-productos');

    // Si existe lo vacía, para que los productos no se dupliquen
    let div = document.querySelector('#all-products')
    div ? div.innerHTML = '' : div = document.createElement('div');

    div.id = 'all-products';
    div.style.display = 'flex';
    contenedor.appendChild(div);

    // Pintamos todos los productos
    datos.forEach(element => {
        let div2 = document.createElement('div');
        pintarProductos(element, div2, 150);
        div.appendChild(div2);
        contenedor.appendChild(div);
        div2.style.width = '500px';
        div2.style.margin = '10px';
        div2.style.height = '500px';
        div2.style.padding = '20px';
        div2.style.textAlign = 'center';
        div2.style.backgroundColor = '#FFFDD0';
    })
}

// Pintamos el producto o los productos
function pintarProductos(datos, div, heigth) {
    // Creamos las claves y los valores
    let claves = ['ID', 'Precio', 'Descripción'];
    let valores = [datos.id, datos.price, datos.description];

    // Title
    h3 = document.createElement('h3');
    h3.innerHTML = `${datos.title}`;
    div.appendChild(h3);

    // Rellenamos todas las informaciones a parte la img y los rating
    claves.forEach((element, i) => {
        let parrafo = document.createElement('p');
        let span = document.createElement('span');
        parrafo.innerHTML = `${element}: `;
        span.innerHTML = valores[i];
        parrafo.style.fontWeight = 'bold';
        parrafo.style.padding = '10px';
        span.style.fontWeight = '400';
        parrafo.appendChild(span);
        div.appendChild(parrafo);
    });

    // Creamos la imagén
    let img = document.createElement('img');
    img.src = datos.image;
    img.height = heigth;
    div.appendChild(img);

    // Creamos y insertamos los ratings
    let divRating = document.createElement('div');
    let rateText = Object.keys(datos.rating);
    let rate = [datos.rating.rate, datos.rating.count];
    let i = 0;
    divRating.className = 'rating';

    while (i < 2) {
        pRating = document.createElement('span');
        pRating.innerHTML = `${rateText[i]}: ${rate[i]}  `;
        divRating.appendChild(pRating);
        i++;
    }
    div.appendChild(divRating);
}

// Removemos el producto
function quitarProducto() {
    let div = document.getElementsByClassName('productos')[0];
    div.remove();
}

// Removemos los productos
function quitarProductos() {
    let div = document.querySelector('#all-products');
    div.remove();
}

let select = document.getElementById('comprar');
select.addEventListener('change', //Cuando se selecciona un producto se añade a la lista
    function () {
        let selectedOption = this.options[select.selectedIndex];
        carritoCompra(selectedOption.text)
    });

function carritoCompra(value) {
    let contenedor = document.getElementById('comprar-productos');
    let div = document.getElementById('lista-div');
    let lista = document.getElementById('lista-compra');

    // Si el div contenedor de la lista no existe, lo crea
    if(!div){
        div = document.createElement('div');
    }

    // Si la lista no existe, la crea.
    if (!lista) {
        lista = document.createElement('ol');
    }

    let li = document.createElement('li');
    lista.id = 'lista-compra';
    li.innerHTML = value;
    li.style.textAlign = 'left';
    li.style.fontSize = '18px';
    lista.appendChild(li);
    div.appendChild(lista)
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'center';
    contenedor.appendChild(div);
}

function borrarLi(){
    document.getElementsByTagName("li")[document.getElementsByTagName("li").length-1].remove();
}
