<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppointmentsStore } from '@/stores/appointments';
import AppointmentApi from '@/api/AppointmentApi';
const route = useRoute();
const router = useRouter();

const { id } = route.params;
const appointmentStore = useAppointmentsStore();

onMounted(async () => {
    try {
        if (id) {
            const { data } = await AppointmentApi.getAppointmentById(id);
            appointmentStore.setSelectedAppointment(data);
        }

    } catch (error) {
        router.push({ name: 'my-appointments' });
    }
});
</script>

<template>
    <div>
        <nav class="my-5 flex gap-3">
            <RouterLink :to="{ name: 'appointments-edit' }"
                @click="appointmentStore.cleanDateAndTime"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
                :class="route.name === 'appointments-edit' ? 'bg-blue-500 text-white' : 'text-blue-600 bg-white'">
                                Services
            </RouterLink>
            <RouterLink :to="{ name: 'appointments-details-edit' }"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
                :class="route.name === 'appointments-details-edit' ? 'bg-blue-500 text-white' : 'text-blue-600 bg-white'">
                
                Appointment and Resume
            </RouterLink>
        </nav>

        <RouterView />
    </div>
</template>