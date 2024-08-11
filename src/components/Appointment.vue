<script setup>
import { formatCurrency } from '@/helpers';
import { displayDate } from '@/helpers/date';
import { useAppointmentsStore } from '@/stores/appointments';

defineProps({
    appointment: {
        type: Object,
        required: true
    }
})

const appointmemtStore = useAppointmentsStore();
</script>

<template>
    <div class="bg-white p-5 space-y-3 rounded-lg">
        <p class="text-gray-500 font-black">
            Date: <span class="font-light">{{ displayDate(appointment.date) }}</span>
            Hour: <span class="font-light">{{ appointment.time }}</span>
        </p>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Appointment Information</h3>
                <div v-for="service in appointment.services" :key="service._id">
                    <p>{{ service.name }}</p>
                    <p class="text-2xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
                </div>

                <p class="text-2xl font-black text-right ">Total to pay: <span class="text-blue-700">{{
                    formatCurrency(appointment.totalAmount) }}</span>
                </p>

                <div class="flex gap-2 items-center">
                    <RouterLink :to="{ name: 'appointments-edit', params: { id: appointment._id } }"
                        class="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                        Edit appointment
                    </RouterLink>

                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        @click="appointmemtStore.cancelAppointment(appointment._id)">
                        Cancel appointment
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
