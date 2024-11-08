<template>
    <div class="employee-view-container">
        <h2>Bienvenido, Empleado</h2>
        <div class="button-group">
            <button @click="$router.push('/employee/tasks')" class="view-tasks-button">Ver Tareas Pendientes</button>
            <button @click="logout" class="logout-button">Cerrar Sesión</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "EmployeeView",
    mounted() {
        // Verifica si el usuario es un empleado al cargar la vista
        const role = localStorage.getItem('role');
        if (role !== 'Empleado') {
            this.$router.push('/'); // Redirige si no es un empleado
        }
    },
    methods: {
        logout() {
            // Elimina el token y el rol del localStorage y redirige al login
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('usuarioId');
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
/* Contenedor principal */
.employee-view-container {
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
    font-size: 24px;
}

/* Grupo de botones */
.button-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 400px;
}

/* Botón Ver Tareas */
.view-tasks-button {
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.view-tasks-button:hover {
    background-color: #0056b3;
    transform: scale(1.02);
}


/* Botón de cerrar sesión */
.logout-button {
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #e74c3c;
    border-radius: 4px;
}

.logout-button:hover {
    background-color: #c0392b;
}

</style>
