<template>
    <div class="manage-tasks-container">
        <h2>Gestionar Tareas</h2>
        <button @click="goBack" class="back-button">Volver</button>
        <div v-for="proyecto in proyectos" :key="proyecto.id" class="proyecto">
            <h3>{{ proyecto.nombre }}</h3>
            <table class="task-table">
                <thead>
                    <tr>
                        <th>Nombre de la Tarea</th>
                        <th>Descripción</th>
                        <th>Fecha Estimada</th>
                        <th>Fecha Real</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tarea in proyecto.tareas" :key="tarea.id">
                        <td>{{ tarea.nombre }}</td>
                        <td>{{ tarea.descripcion }}</td>
                        <td>{{ new Date(tarea.fechaEstimada).toLocaleDateString('es-ES') }}</td>
                        <td>{{ tarea.fechaReal ? new Date(tarea.fechaReal).toLocaleDateString('es-ES') : 'Pendiente' }}</td>
                        <td>{{ tarea.statusId }}</td>
                        <td class="actions">
                            <button @click="$router.push({ name: 'EditTask', params: { id: tarea.id } })" class="edit-button">Editar</button>
                            <button @click="eliminarTarea(tarea.id)" class="delete-button">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            const response = await apiClient.get('/api/Proyecto/WithTasks');
            this.proyectos = response.data;
            console.log("Proyectos con tareas cargados:", this.proyectos);
        } catch (error) {
            console.error("Error al cargar proyectos con tareas:", error);
        }
    },
    methods: {
        eliminarTarea(id) {
            apiClient.delete(`/api/Tarea/${id}`)
                .then(() => {
                    this.proyectos = this.proyectos.map(proyecto => ({
                        ...proyecto,
                        tareas: proyecto.tareas.filter(tarea => tarea.id !== id)
                    }));
                })
                .catch(error => console.error("Error al eliminar la tarea:", error));
        },
        goBack() {
            this.$router.push('/coordinator');
        }
    }
};
</script>

<style scoped>
/* Contenedor principal */
.manage-tasks-container {
    padding: 20px;
    background-color: #f4f4f9;
    min-height: 100vh;
}

/* Título */
h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

/* Botón de regresar */
.back-button {
    display: inline-block;
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

/* Estilo para cada proyecto */
.proyecto {
    margin-bottom: 2em;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Título del proyecto */
.proyecto h3 {
    color: #007bff;
    margin-bottom: 10px;
}

/* Tabla de tareas */
.task-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.task-table th, .task-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.task-table th {
    background-color: #007bff;
    color: #fff;
    font-weight: bold;
}

.task-table tbody tr:hover {
    background-color: #f2f2f2;
}

/* Estilo de botones en acciones */
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
</style>
