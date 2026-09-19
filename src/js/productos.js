// Guardamos los productos en un arreglo (por ahora en memoria)
let productos = [];
let contador = 1; // para generar códigos automáticos

// Referencias a elementos del HTML
const formulario = document.getElementById('formProducto');
const tabla = document.querySelector('#tablaProductos tbody');
const buscador = document.getElementById('buscarProducto');

// Cuando el usuario envía el formulario (Guardar)
formulario.addEventListener('submit', function (e) {
    e.preventDefault(); // evita que la página se recargue

    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    if (codigo === '') {
        // No hay código = es un producto nuevo
        productos.push({ codigo: contador++, nombre, categoria, precio, stock });
    } else {
        // Hay código = estamos editando uno existente
        const producto = productos.find(p => p.codigo == codigo);
        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.precio = precio;
        producto.stock = stock;
    }

    formulario.reset(); // limpia el formulario
    document.getElementById('codigo').value = ''; // limpia el código oculto
    mostrarProductos();
});

// Dibuja todos los productos en la tabla
function mostrarProductos(lista = productos) {
    tabla.innerHTML = ''; // borra la tabla antes de volver a llenarla

    lista.forEach(p => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>${p.precio}</td>
            <td>${p.stock}</td>
            <td>
                <button class="btn-editar" onclick="editarProducto(${p.codigo})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarProducto(${p.codigo})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Carga los datos de un producto en el formulario para editarlo
function editarProducto(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    document.getElementById('codigo').value = producto.codigo;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('stock').value = producto.stock;
}

// Elimina un producto de la lista
function eliminarProducto(codigo) {
    productos = productos.filter(p => p.codigo !== codigo);
    mostrarProductos();
}

// Filtra la tabla mientras el usuario escribe en el buscador
buscador.addEventListener('input', function () {
    const texto = buscador.value.toLowerCase();
    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto) ||
        p.categoria.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
});
