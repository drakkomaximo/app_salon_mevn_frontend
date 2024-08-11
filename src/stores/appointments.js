import { ref, computed, onMounted, inject, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import AppointmentApi from "@/api/AppointmentApi";
import { convertToDDMMYYYY, convertToISO } from "@/helpers/date";
import { useUserStore } from "./user";

export const useAppointmentsStore = defineStore("appointments", () => {
  const appointmentId = ref("");
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const toast = inject("toast");
  const router = useRouter();
  const appointmentsByDate = ref([]);
  const userStore = useUserStore();

  onMounted(() => {
    const startHour = 10;
    const endHour = 19;
    for (let i = startHour; i <= endHour; i++) {
      hours.value.push(`${i}:00`);
    }
  });

  watch(date, async () => {
    time.value = "";
    if (!date.value) return;

    const { data } = await AppointmentApi.getByDate(date.value);

    if (appointmentId.value) {
      appointmentsByDate.value = data.filter(
        (appointment) => appointment._id !== appointmentId.value
      );
      time.value = data.filter(
        (appointment) => appointment._id === appointmentId.value
      )[0].time;
    } else {
      appointmentsByDate.value = data;
    }
  });

  function setSelectedAppointment(appointment) {
    services.value = appointment.services;
    date.value = convertToDDMMYYYY(appointment.date);
    time.value = appointment.time;
    appointmentId.value = appointment._id;
  }

  function onServicesSelected(service) {
    if (
      services.value.some(
        (selectedService) => selectedService._id === service._id
      )
    ) {
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== service._id
      );
    } else {
      if (services.value.length === 2) {
        alert("You can only select up to 2 services");
        return;
      }
      services.value.push(service);
    }
  }

  async function saveAppointment() {
    const appointment = {
      date: convertToISO(date.value),
      time: time.value,
      services: services.value.map((service) => service._id),
      totalAmount: totalOfServices.value,
    };

    if (appointmentId.value) {
      try {
        const { data } = await AppointmentApi.updateAppointment(
          appointmentId.value,
          appointment
        );
        toast.open({
          message: data.message,
          type: "success",
        });
      } catch (error) {
        toast.open({
          message: error.response.data.message,
          type: "error",
        });
      }
    } else {
      try {
        const { data } = await AppointmentApi.create(appointment);
        toast.open({
          message: data.message,
          type: "success",
        });
      } catch (error) {
        toast.open({
          message: error.response.data.message,
          type: "error",
        });
      }
    }
    clearAppointment();
    userStore.getUserAppointments();
    router.push({ name: "my-appointments" });
  }

  const clearAppointment = () => {
    appointmentId.value = "";
    date.value = "";
    time.value = "";
    services.value = [];
  };

  const cancelAppointment = async (id) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const { data } = await AppointmentApi.deleteAppointment(id);
        toast.open({
          message: data.message,
          type: "success",
        });
        userStore.userAppointments = userStore.userAppointments.filter(
          (appointment) => appointment._id !== id
        );
      } catch (error) {
        toast.open({
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };
  const cleanDateAndTime = () => {
    if (!isValidReservation.value) {
      date.value = "";
      time.value = "";
    }
  };

  const isServicesSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  const totalOfServices = computed(() => {
    return services.value.reduce((acc, service) => acc + service.price, 0);
  });

  const noServicesSelected = computed(() => {
    return services.value.length === 0;
  });

  const isValidReservation = computed(() => {
    return date.value.length && time.value.length && services.value.length;
  });

  const isDateSelected = computed(() => {
    return date.value.length;
  });

  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(
        (appointment) => appointment.time === hour
      );
    };
  });

  return {
    date,
    hours,
    time,
    services,
    isValidReservation,
    totalOfServices,
    noServicesSelected,
    onServicesSelected,
    cleanDateAndTime,
    isDateSelected,
    saveAppointment,
    isServicesSelected,
    setSelectedAppointment,
    disableTime,
    cancelAppointment,
    clearAppointment,
  };
});
