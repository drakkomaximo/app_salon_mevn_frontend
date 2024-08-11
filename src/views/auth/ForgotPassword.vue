<script setup>
import { inject } from 'vue';
import { reset } from '@formkit/core';
import AuthApi from '@/api/AuthApi';
const toast = inject('toast');

const handleSubmit = async (data) => {
    try {
        const { data: response } = await AuthApi.forgotPassword(data);
        toast.open({
            message: response.message,
            type: 'success',
        });
        reset('forgotPasswordForm');
    } catch (error) {
        toast.open({
            message: error.response.data.message,
            type: 'error',
        })
    }
};
</script>

<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">
            Forgot Password
        </h1>
        <p class="text-2xl text-white text-center my-5">
            Enter your email to reset your password
        </p>

        <FormKit id="forgotPasswordForm" type="form" :actions="false"
            incomplete-message="It couldn't be sent. Check the notifications." @submit="handleSubmit">

            <FormKit type="email" label="Email" name="email" placeholder="User email" validation="required|email"
                :validation-messages="{ required: 'Email is required', email: 'Email must be valid' }" />

            <FormKit type="submit">
                Send Email
            </FormKit>
        </FormKit>
    </div>
</template>
