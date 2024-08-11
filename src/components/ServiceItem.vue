<script setup>
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';

const appointmentStore = useAppointmentsStore();
defineProps({
    service: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="p-5 space-y-5 rounded-lg cursor-pointer"
        :class="appointmentStore.isServicesSelected(service._id) ? 'bg-blue-500 text.white' : 'bg-white'"
        @click="appointmentStore.onServicesSelected(service)">
        <p class="text-2xl font-light"
            :class="appointmentStore.isServicesSelected(service._id) ? 'text-white' : 'text-blue-600'">{{ service.name
            }}</p>

        <p class="text-4xl font-black text-blue-600"
            :class="appointmentStore.isServicesSelected(service._id) ? 'text-white' : 'text-blue-600'">{{
                formatCurrency(service.price) }}</p>
    </div>
</template>
