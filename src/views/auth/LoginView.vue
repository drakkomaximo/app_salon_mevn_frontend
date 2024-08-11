<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import AuthApi from '@/api/AuthApi';

const router = useRouter();
const toast = inject('toast');

const handleSubmit = async (formData) => {
  try {
    const { data: { token } } = await AuthApi.login(formData);
    localStorage.setItem('APP_SALON_AUTH_TOKEN', token);
    router.push({ name: 'my-appointments' });
  } catch (error) {
    toast.open({
      message: error.response.data.message,
      type: 'error',
    })
  }
}
</script>

<template>
  <div>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Log In</h1>
    <p class="text-2xl text-white text-center my-5">If you have an account, please log in</p>

    <FormKit id="loginForm" type="form" :actions="false"
      incomplete-message="It couldn't be sent. Check the notifications." @submit="handleSubmit">

      <FormKit type="email" label="Email" name="email" placeholder="User email" validation="required|email"
        :validation-messages="{ required: 'Email is required', email: 'Email must be valid' }" />

      <FormKit type="password" label="Password" name="password" placeholder="Enter your password"
        validation="required"
        :validation-messages="{ required: 'Password is required' }" />

      <FormKit type="submit">Log in</FormKit>
    </FormKit>
  </div>
</template>
