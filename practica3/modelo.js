async function agregar() {
    const nombre = document.getElementById("nombre").value;
    const autor = document.getElementById("autor").value;
    const precio = document.getElementById("precio").value;

    if (!nombre || !autor || !precio) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/agregar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, autor, precio })
        });

        if (response.ok) {
            alert("Libro agregado correctamente.");
            obtenerLibros(); // Refrescar la tabla automáticamente
        } else {
            alert("Error al agregar el libro.");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("No se pudo conectar al servidor.");
    }
}

// Función para obtener los libros y mostrarlos en la tabla
async function obtenerLibros() {
    try {
        const response = await fetch("http://localhost:3000/libros");
        const datos = await response.json();
        const tbody = document.getElementById("libros");
        tbody.innerHTML = ""; 

        datos.forEach((libro) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${libro.id}</td>
                <td><input type="text" value="${libro.nombre}" id="nombre-${libro.id}"></td>
                <td><input type="text" value="${libro.autor}" id="autor-${libro.id}"></td>
                <td><input type="number" value="${libro.precio}" id="precio-${libro.id}"></td>
                <td>
                    <button onclick="editar(${libro.id})"> Editar</button>
                    <button onclick="eliminar(${libro.id})">     Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

async function editar(id) {
    const nombre = document.getElementById(`nombre-${id}`).value;
    const autor = document.getElementById(`autor-${id}`).value;
    const precio = document.getElementById(`precio-${id}`).value;

    if (!nombre || !autor || !precio) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/editar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, autor, precio })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            obtenerLibros();
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Error al actualizar el libro.");
    }
}

async function eliminar(id) {
    const confirmar = confirm("¿Seguro que deseas eliminar este libro?");
    if (!confirmar) return;

    try {
        const response = await fetch(`http://localhost:3000/eliminar/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            obtenerLibros();
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Error al eliminar el libro.");
    }
}

document.addEventListener("DOMContentLoaded", obtenerLibros);
