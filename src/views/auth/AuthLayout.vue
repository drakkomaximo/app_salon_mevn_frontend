<script setup>
import { useRoute } from 'vue-router';
const authRoutes = [
    { name: 'register', text: 'Create Account' },
    { name: 'login', text: 'Log In' },
    { name: 'forgot-password', text: 'Forgot Password' },
]
const route = useRoute();
</script>

<template>
    <div class="mx-auto lg:w-3/5 mt-20">
        <RouterView />

        <nav class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
            <RouterLink v-for="authRoute in authRoutes" :key="authRoute.name" :to="{ name: authRoute.name }"
                class="uppercase text-bold text-white"
                :class="authRoute.name === route.name ? 'hidden' : 'text-gray-500 hover:text-blue-500'">
                {{ authRoute.text }}
            </RouterLink>
        </nav>
    </div>
</template>
