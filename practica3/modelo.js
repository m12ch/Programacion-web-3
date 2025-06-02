async function agregar() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("genero").value;
    const año = document.getElementById("anio_publicacion").value;

    if (!titulo || !autor || !genero || !año) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/agregar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, autor, genero, año })
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

// obtener los libros y mostrarlos en la tabla
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
                <td><input type="text" value="${libro.titulo}" id="titulo-${libro.id}"></td>
                <td><input type="text" value="${libro.autor}" id="autor-${libro.id}"></td>
                <td><input type="text" value="${libro.genero}" id="genero-${libro.id}"></td>
                <td><input type="number" value="${libro.anio_publicacion}" id="anio_publicacion-${libro.id}"></td>
                <td>
                    <button onclick="editar(${libro.id})"> Editar</button>
                    <button onclick="eliminar(${libro.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}
// funcion editar
async function editar(id) {
    const titulo = document.getElementById(`titulo-${id}`).value;
    const autor = document.getElementById(`autor-${id}`).value;
    const genero = document.getElementById(`genero-${id}`).value;
    const año = document.getElementById(`anio_publicacion-${id}`).value;

    if (!titulo || !autor || !genero || !año) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/editar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, autor, genero, año })
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

//funcion eliminar
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
