<script setup>
import Appointment from '@/components/Appointment.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <div>
        <h2 class="text-4xl font-extrabold text-white mt-10">My appointments</h2>
        <p class="text-white text-lg mt-5">
            Next, you will be able to manage your upcoming appointments.
        </p>

        <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">Loading...</p>

        <div v-else>
            <p v-if="userStore.noAppointments" class="text-white text-2xl text-center mt-5">There are no future
                appointments</p>

            <div class="grid grid-cols-1 gap-5 mt-10">
                <Appointment v-for="appointment in userStore.userAppointments" :key="appointment._id"
                    :appointment="appointment" />
            </div>
        </div>
    </div>

</template>