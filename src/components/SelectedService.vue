<script setup>
import { useAppointmentsStore } from '@/stores/appointments';
import { formatCurrency } from '@/helpers';

const appointmentStore = useAppointmentsStore();
defineProps({
    service: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="border border-gray-600 rounded-lg p-5 flex justify-between items-center">
        <div>
            <p class="text-2xl font-extrabold text-white">{{ service.name }}</p>
            <p class="text-3xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
        </div>

        <button class="bg-red-500 hover:bg-red-700 ring-inset ring-2 text-white px-5 py-2 rounded-lg"
            @click="appointmentStore.onServicesSelected(service)">
            Delete
        </button>
    </div>
</template>
