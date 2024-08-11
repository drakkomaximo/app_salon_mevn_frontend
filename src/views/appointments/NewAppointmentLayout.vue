<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAppointmentsStore } from '@/stores/appointments';
const route = useRoute();

const appointmentStore = useAppointmentsStore();

onMounted(() => {
    appointmentStore.clearAppointment();
});
</script>

<template>
    <div>
        <nav class="my-5 flex gap-3">
            <RouterLink :to="{ name: 'appointments-new' }"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
                :class="route.name === 'appointments-new' ? 'bg-blue-500 text-white' : 'text-blue-600 bg-white'">
                                Services
            </RouterLink>
            <RouterLink :to="{ name: 'appointments-details' }"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
                :class="route.name === 'appointments-details' ? 'bg-blue-500 text-white' : 'text-blue-600 bg-white'">
                
                Appointment and Resume
            </RouterLink>
        </nav>

        <RouterView />
    </div>
</template>