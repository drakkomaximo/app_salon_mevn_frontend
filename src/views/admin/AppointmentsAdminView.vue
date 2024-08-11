<script setup>
import AdminAppointment from '@/components/AdminAppointment.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <div>
        <p class="text-white text-lg mt-5">
            You can see the appointments here
        </p>

        <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">
            Loading...
        </p>

        <div v-else>
            <p v-if="userStore.noServicesSelected" class="text-white text-2xl text-center mt-5">
                No appointments found
            </p>

            <div v-else class="grid grid-cols-1 gap-5 mt-10">
                <AdminAppointment v-for="appointment in userStore.userAppointments" :key="appointment._id"
                    :appointment="appointment" />
            </div>
        </div>
    </div>
</template>