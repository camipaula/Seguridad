<template>
    <div class="edit-task-container">
        <h2>Editar Tarea</h2>
        <button @click="goBack" class="back-button">Volver</button>
        <form @submit.prevent="editarTarea" class="task-form">
            <!-- Nombre de la Tarea -->
            <div class="form-group">
                <input type="text" v-model="nombre" placeholder="Nombre de la Tarea" required />
            </div>

            <!-- Descripción de la Tarea -->
            <div class="form-group">
                <input type="text" v-model="descripcion" placeholder="Descripción de la Tarea" required />
            </div>

            <!-- Proyecto ID -->
            <div class="form-group">
                <select v-model="proyectoId" required>
                    <option value="" disabled>Selecciona un Proyecto</option>
                    <option v-for="proyecto in proyectos" :value="proyecto.id" :key="proyecto.id">
                        {{ proyecto.nombre }}
                    </option>
                </select>
            </div>

            <!-- Categoría -->
            <div class="form-group">
                <select v-model="categoriaId" required>
                    <option value="" disabled>Selecciona una Categoría</option>
                    <option v-for="categoria in categorias" :value="categoria.id" :key="categoria.id">
                        {{ categoria.nombre }}
                    </option>
                </select>
            </div>

            <!-- Fecha Estimada de Completación -->
            <div class="form-group">
                <label>Fecha Estimada de Completación</label>
                <input type="date" v-model="fechaEstimada" required />
            </div>

            <!-- Fecha Real -->
            <div class="form-group">
                <label>Fecha Real</label>
                <input type="date" v-model="fechaReal" placeholder="Fecha Real" />
            </div>

            <!-- Estado -->
            <div class="form-group">
                <select v-model="statusId" required>
                    <option value="" disabled>Selecciona un Estado</option>
                    <option v-for="status in estados" :value="status.id" :key="status.id">
                        {{ status.nombre }}
                    </option>
                </select>
            </div>

            <!-- Empleado Responsable -->
            <div class="form-group">
                <select v-model="usuarioId" required>
                    <option value="" disabled>Selecciona un Empleado</option>
                    <option v-for="usuario in empleados" :value="usuario.id" :key="usuario.id">
                        {{ usuario.nombre }}
                    </option>
                </select>
            </div>

            <!-- Botón para Guardar Cambios -->
            <button type="submit" class="submit-button">Guardar Cambios</button>
        </form>
    </div>
</template>

<script>
import apiClient from '../api';

export default {
    data() {
        return {
            nombre: '',
            descripcion: '',
            proyectoId: '',
            categoriaId: '',
            fechaEstimada: '',
            fechaReal: '',
            statusId: '',
            usuarioId: '',
            empleados: [],
            categorias: [],
            proyectos: [],
            estados: []
        };
    },
    async created() {
        const tareaId = this.$route.params.id;
        const token = localStorage.getItem('token');

        try {
            const tareaResponse = await apiClient.get(`/api/Tarea/${tareaId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const tarea = tareaResponse.data;

            this.nombre = tarea.nombre;
            this.descripcion = tarea.descripcion;
            this.proyectoId = tarea.proyectoId;
            this.categoriaId = tarea.categoriaId;
            this.fechaEstimada = tarea.fechaEstimada.slice(0, 10);
            this.fechaReal = tarea.fechaReal ? tarea.fechaReal.slice(0, 10) : '';
            this.statusId = tarea.statusId;
            this.usuarioId = tarea.usuarioId;

            const categoriasResponse = await apiClient.get('/api/Categoria', {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.categorias = categoriasResponse.data;

            const empleadosResponse = await apiClient.get('/api/Usuario/GetEmpleados', {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.empleados = empleadosResponse.data;

            const proyectosResponse = await apiClient.get('/api/Proyecto', {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.proyectos = proyectosResponse.data;

            const estadosResponse = await apiClient.get('/api/Status', {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.estados = estadosResponse.data;

        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    },
    methods: {
        async editarTarea() {
            const tareaId = this.$route.params.id;
            const token = localStorage.getItem('token');

            try {
                await apiClient.put(`/api/Tarea/updateTask/${tareaId}`, {
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    proyectoId: this.proyectoId,
                    categoriaId: this.categoriaId,
                    fechaEstimada: this.fechaEstimada,
                    fechaReal: this.fechaReal,
                    statusId: this.statusId,
                    usuarioId: this.usuarioId
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.$router.push('/manageTasks');
            } catch (error) {
                console.error("Error al editar la tarea:", error);
            }
        },
        goBack() {
            this.$router.push('/manageTasks');
        }
    }
};
</script>

<style scoped>
/* Contenedor principal */
.edit-task-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f9;
    padding: 20px;
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

/* Formulario */
.task-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

/* Grupo de entradas */
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

input,
select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
    width: 100%;
    box-sizing: border-box;
}

input:focus,
select:focus {
    border-color: #007bff;
}

/* Botón de guardar cambios */
.submit-button {
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-top: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
    background-color: #0056b3;
    transform: scale(1.02);
}
</style>
