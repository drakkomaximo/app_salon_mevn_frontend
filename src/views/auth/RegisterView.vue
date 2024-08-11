<script setup>
import { inject } from 'vue';
import { reset } from '@formkit/vue'
import AuthApi from '@/api/AuthApi';

const toast = inject('toast');

const handleSubmit = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await AuthApi.register(formData);
    toast.open({
      message: data.message,
      type: 'success',
    })
    reset('registerForm');
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
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Create an account</h1>
    <p class="text-2xl text-white text-center my-5">Create an account in App Salon</p>

    <FormKit id="registerForm" type="form" :actions="false" incomplete-message="It couldn't be sent. Check the notifications."
      @submit="handleSubmit">
      <FormKit type="text" label="Name" name="name" placeholder="Enter your name" validation="required|length:3"
        :validation-messages="{ required: 'Name is required', length: 'Name must be at least 3 characters' }" />

      <FormKit type="email" label="Email" name="email" placeholder="Enter your email" validation="required|email"
        :validation-messages="{ required: 'Email is required', email: 'Email must be valid' }" />

      <FormKit type="password" label="Password" name="password" placeholder="Enter your password"
        validation="required|length:8"
        :validation-messages="{ required: 'Password is required', length: 'Password must be at least 8 characters' }" />

      <FormKit type="password" label="Confirm Password" name="password_confirm" placeholder="Confirm your password"
        validation="required|confirm"
        :validation-messages="{ required: 'Password confirmation is required', confirmed: 'Passwords do not match' }" />

      <FormKit type="submit">Create Account</FormKit>
    </FormKit>
  </div>
</template>
