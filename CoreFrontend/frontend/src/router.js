import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Coordinator from './views/Coordinator.vue';
import CreateProject from './views/CreateProject.vue';
import ManageProject from './views/ManageProject.vue';
import ManageTasks from './views/ManageTasks.vue';
import CreateTask from './views/CreateTask.vue';
import EditProject from './views/EditProject.vue';
import EditTask from './views/EditTask.vue';
import EmployeeView from './views/EmployeeView.vue';
import PendingTasks from './views/PendingTasks.vue';

import apiClient from './api';

const routes = [
    { 
        path: '/', 
        component: Login 
    },
    { 
        path: '/coordinator', 
        component: Coordinator, 
        meta: { requiresAuth: true, role: 'Coordinador' } // Protegido, solo para coordinadores 
    },
    { 
        path: '/createProject', 
        component: CreateProject, 
        meta: { requiresAuth: true, role: 'Coordinador' } 
    },
    { 
        path: '/manageProject', 
        component: ManageProject, 
        meta: { requiresAuth: true, role: 'Coordinador' } 
    },
    { 
        path: '/manageTasks', 
        component: ManageTasks, 
        meta: { requiresAuth: true, role: 'Coordinador' } 
    },
    { 
        path: '/createTask/:projectId', 
        name: 'CreateTask', 
        component: CreateTask, 
        meta: { requiresAuth: true, role: 'Coordinador' }
    },
    
    { 
        path: '/editProject/:id', 
        name: 'EditProject', 
        component: EditProject, 
        meta: { requiresAuth: true, role: 'Coordinador' } 
    },
    { 
        path: '/employee', 
        component: EmployeeView, 
        meta: { requiresAuth: true, role: 'Empleado' } 
    },
    { 
        path: '/employee/tasks', 
        component: PendingTasks, 
        meta: { requiresAuth: true, role: 'Empleado' } 
    },
    { 
        path: '/editTask/:id', 
        name: 'EditTask', 
        component: EditTask, 
        meta: { requiresAuth: true, role: 'Coordinador' } 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Guard de navegación global para verificar la autenticación y el rol
router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (to.meta.requiresAuth) {
        if (!token) {
            // Redirige al login si no hay token
            return next('/');
        }

        // Verifica el rol
        if (to.meta.role && role !== to.meta.role) {
            alert('No tienes permiso para acceder a esta página.');
            return next('/'); // Redirige al login si el rol no coincide
        }
    }
    
    next(); // Permite el acceso si todo está en orden
});

export default router;
