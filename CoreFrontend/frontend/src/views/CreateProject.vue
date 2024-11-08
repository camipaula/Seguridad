<template>
    <div class="create-project-container">
        <h2>Crear Proyecto</h2>
        <button @click="goBack" class="back-button">Volver</button>
        <form @submit.prevent="createProject" class="project-form">
            <div class="form-group">
                <input type="text" v-model="nombre" placeholder="Nombre del Proyecto" required />
            </div>
            <div class="form-group">
                <textarea v-model="descripcion" placeholder="Descripción"></textarea>
            </div>
            <div class="form-group">
                <label>Fecha de Inicio</label>
                <input type="date" v-model="fechaInicio" required />
            </div>
            <div class="form-group">
                <label>Fecha de Fin</label>
                <input type="date" v-model="fechaFin" required />
            </div>
            <button type="submit" class="submit-button">Crear Proyecto</button>
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
            fechaInicio: '',
            fechaFin: ''
        };
    },
    methods: {
        async createProject() {
            try {
                const token = localStorage.getItem('token');

                await apiClient.post('/api/Proyecto', {
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    fechaInicio: this.fechaInicio,
                    fechaFin: this.fechaFin
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                this.$router.push('/manageProject');
            } catch (error) {
                console.error("Error al crear el proyecto:", error);
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
.create-project-container {
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
.project-form {
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
textarea {
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
textarea:focus {
    border-color: #007bff;
}

/* Texto de área */
textarea {
    resize: vertical;
    min-height: 80px;
}

/* Botón de envío */
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

/* Etiquetas */
label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
}
</style>
