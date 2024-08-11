<script setup>
import { onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AuthApi from '@/api/AuthApi';

const toast = inject('toast');
const route = useRoute();
const router = useRouter();

const { token } = route.params;

onMounted(async () => {
  try {
    const { data } = await AuthApi.verifyAccount(token);
    toast.open({
      message: data.message,
      type: 'success',
    });
    setTimeout(() => {
      router.push({ name: 'login' });
    }, 5000);
  } catch (error) {
    toast.open({
      message: error.response.data.message,
      type: 'error',
    });

  }
});
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Verify account</h1>
</template>
