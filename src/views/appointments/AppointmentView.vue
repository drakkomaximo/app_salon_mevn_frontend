<script setup>
import { ref } from 'vue';
import VueTailwindDatePicker from 'vue-tailwind-datepicker';
import SelectedService from '@/components/SelectedService.vue';
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';

const appointmentStore = useAppointmentsStore();


const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM',
})

function disableDate(date) {
  const today = new Date();
  return date < today || (date.getMonth() > today.getMonth() + 1) || [0, 6].includes(date.getDay());
}
</script>

<template>
  <div class="space-y-5">
    <h2 class="text-4xl font-extrabold text-white">Details and resume of appointment</h2>
    <p class="text-white text-lg">
      Please verify the information and confirm the appointment.
    </p>


    <h3 class="text-3xl font-extrabold text-white">Services selected</h3>

    <div class="grip gap-5" v-if="!appointmentStore.noServicesSelected">
      <SelectedService v-for="service in appointmentStore.services" :key="service._id" :service="service" />

      <p class="text-right text-white text-2xl">Total to pay: <span class="font-black">{{
        formatCurrency(appointmentStore.totalOfServices)
      }}</span></p>
    </div>
    <div v-else>
      <p class="text-center text-white text-4xl">
        There are no services selected yet.
      </p>
    </div>

    <div class="space-y-8" v-if="!appointmentStore.noServicesSelected">
      <h3 class="text-3xl font-extrabold text-white">Date and Time</h3>

      <div class="lg:flex gap-5 items-start">
        <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
          <VueTailwindDatePicker :disable-date="disableDate" :disable-in-range="true" i18n="en" as-single
            no-input :formatter="formatter" v-model="appointmentStore.date" />
        </div>
        <div class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0" v-if="appointmentStore.isDateSelected">
          <button @click="appointmentStore.time = hour" v-for="hour in appointmentStore.hours" :key="hour"
            class=" text-2xl font-bold py-2 px-4 rounded-lg disabled:opacity-10"
            :disabled="appointmentStore.disableTime(hour)"
            :class="appointmentStore.time === hour ? 'bg-blue-500 text-white' : 'bg-white text-black'">{{ hour }}
          </button>
        </div>
      </div>

      <div class="flex justify-end" v-if="appointmentStore.isValidReservation">
        <button @click="appointmentStore.saveAppointment"
          class="w-full md:w-auto bg-blue-500 text-white text-2xl font-bold py-2 px-4 rounded-lg">
          Confirm appointment
        </button>
      </div>
    </div>
  </div>
</template>