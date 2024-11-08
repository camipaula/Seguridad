<template>
    <div class="manage-projects-container">
        <h2>Gestionar Proyectos</h2>
        <button @click="goBack" class="back-button">Volver</button>
        <table class="project-table">
            <thead>
                <tr>
                    <th>Nombre del Proyecto</th>
                    <th>Descripción</th>
                    <th>Fecha de Inicio</th>
                    <th>Fecha de Finalización</th>
                    <th>Avance</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="proyecto in proyectos" :key="proyecto.id">
                    <td>{{ proyecto.nombre }}</td>
                    <td>{{ proyecto.descripcion }}</td>
                    <td>{{ new Date(proyecto.fechaInicio).toLocaleDateString('es-ES') }}</td>
                    <td>{{ new Date(proyecto.fechaFin).toLocaleDateString('es-ES') }}</td>
                    <td>{{ proyecto.avance }}%</td>
                    <td class="actions">
                        <button @click="editarProyecto(proyecto.id)" class="edit-button">Editar</button>
                        <button @click="eliminarProyecto(proyecto.id)" class="delete-button">Eliminar</button>
                        <button @click="crearTarea(proyecto.id)" class="create-task-button">Crear Tarea</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import apiClient from '../api';

export default {
    data() {
        return {
            proyectos: []
        };
    },
    async created() {
        try {
            const response = await apiClient.get('/api/Proyecto');
            this.proyectos = response.data;
            console.log("Proyectos cargados:", this.proyectos);
        } catch (error) {
            console.error("Error al cargar proyectos:", error);
        }
    },
    methods: {
        editarProyecto(id) {
            if (id) {
                this.$router.push({ name: 'EditProject', params: { id } });
            }
        },
        eliminarProyecto(id) {
            apiClient.delete(`/api/Proyecto/${id}`)
                .then(() => {
                    this.proyectos = this.proyectos.filter(proyecto => proyecto.id !== id);
                })
                .catch(error => console.error("Error al eliminar el proyecto:", error));
        },
        crearTarea(projectId) {
            if (projectId) {
                this.$router.push({ name: 'CreateTask', params: { projectId } });
            }
        },
        goBack() {
            this.$router.push('/coordinator');
        }
    }
};
</script>

<style scoped>
/* Contenedor principal */
.manage-projects-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f4f4f9;
    min-height: 100vh;
}

/* Título */
h2 {
    color: #333;
    margin-bottom: 20px;
}

/* Botón de regresar */
.back-button {
    align-self: flex-start;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    background-color: #e0e0e0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
    background-color: #c0c0c0;
}

/* Tabla de proyectos */
.project-table {
    width: 100%;
    max-width: 1000px;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.project-table th, .project-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.project-table th {
    background-color: #007bff;
    color: #fff;
    font-weight: bold;
}

.project-table tbody tr:hover {
    background-color: #f2f2f2;
}

/* Estilo de botones de acción */
.actions {
    display: flex;
    gap: 10px;
}

button {
    padding: 8px 12px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    font-weight: bold;
}

/* Botones específicos */
.edit-button {
    background-color: #007bff;
    color: #fff;
}

.edit-button:hover {
    background-color: #0056b3;
}

.delete-button {
    background-color: #e74c3c;
    color: #fff;
}

.delete-button:hover {
    background-color: #c0392b;
}

.create-task-button {
    background-color: #28a745;
    color: #fff;
}

.create-task-button:hover {
    background-color: #218838;
}
</style>
