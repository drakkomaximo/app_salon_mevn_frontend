<script setup>
import { onMounted, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { reset } from '@formkit/core'
import AuthApi from '@/api/AuthApi';

const toast = inject('toast');
const route = useRoute();
const router = useRouter();
const { token } = route.params;
const validToken = ref(false);

onMounted(async () => {
    try {
        await AuthApi.verifyPasswordResetToken(token);
        validToken.value = true;

        toast.open({
            message: 'Token verified',
            type: 'success',
        })

    } catch (error) {
        toast.open({
            message: error.response.data.message,
            type: 'error',
        })
    }
});

const handleSubmit = async (data) => {
    try {
        const { data: result } = await AuthApi.newPassword(token, { password: data.password });
        toast.open({
            message: result.message,
            type: 'success',
        })
        setTimeout(() => {
            reset('newPasswordForm');
            router.push({ name: 'login' });
        }, 2000);
    } catch (error) {
        toast.open({
            message: error.response.data.message,
            type: 'error',
        })
    }
}
</script>

<template>
    <div v-if="validToken">
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">
            Restore Password
        </h1>
        <p class="text-2xl text-white text-center my-5">
            Enter your email to reset your password
        </p>

        <FormKit id="newPasswordForm" type="form" :actions="false"
            incomplete-message="It couldn't be sent. Check the notifications." @submit="handleSubmit">

            <FormKit type="password" label="Password" name="password" placeholder="Enter your password"
                aria-autocomplete="new-password" validation="required|length:8"
                :validation-messages="{ required: 'Password is required', length: 'Password must be at least 8 characters' }" />

            <FormKit type="password" label="Confirm Password" name="password_confirm"
                placeholder="Confirm your password" validation="required|confirm" aria-autocomplete="new-password"
                :validation-messages="{ required: 'Password confirmation is required', confirmed: 'Passwords do not match' }" />


            <FormKit type="submit">
                Restore Password
            </FormKit>
        </FormKit>
    </div>
    <div v-else>
        <p class="text-2xl text-white text-center my-5">
            Token is invalid
        </p>
    </div>
</template>