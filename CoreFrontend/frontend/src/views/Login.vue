<template>
    <div class="login-container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login" class="login-form">
            <div class="input-group">
                <label for="username">Usuario</label>
                <input type="text" v-model="username" required />
            </div>
            <div class="input-group">
                <label for="password">Contraseña</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit" class="login-button">Ingresar</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import apiClient from '../api';

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await apiClient.post('/api/Usuario/Login', {
                    userName: this.username,
                    password: this.password
                });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('usuarioId', response.data.usuarioId);

                if (response.data.role === 'Coordinador') {
                    this.$router.push('/coordinator');
                } else if (response.data.role === 'Empleado') {
                    this.$router.push('/employee');
                }
            } catch (error) {
                this.errorMessage = 'Usuario o contraseña incorrectos';
            }
        }
    }
};
</script>

<style scoped>
/* Contenedor principal */
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f9;
    padding: 20px;
    box-sizing: border-box;
}

/* Título */
h2 {
    color: #333;
    margin-bottom: 20px;
}

/* Formulario */
.login-form {
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
.input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

label {
    font-weight: 600;
    margin-bottom: 5px;
    color: #555;
}

input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

input:focus {
    border-color: #007bff;
}

/* Botón */
.login-button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background-color: #007bff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
}

.login-button:hover {
    background-color: #0056b3;
}

/* Mensaje de error */
.error-message {
    color: #e74c3c;
    margin-top: 15px;
    font-size: 14px;
}
</style>
