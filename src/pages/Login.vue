<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="handleSignIn" class="mb-3">
      <div class="mb-3">
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Email"
          required
        />
      </div>
      <div class="mb-3">
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
    <button @click="confirmSignOut" class="btn btn-danger">Sign Out</button>
    <p>
      Don't have an account?
      <router-link to="/register">Register here</router-link>
    </p>

    <h2>Forgot Password?</h2>
    <form @submit.prevent="handleResetPassword" class="mb-3">
      <div class="mb-3">
        <input
          v-model="resetEmail"
          type="email"
          class="form-control"
          placeholder="Enter your email"
          required
        />
      </div>
      <button type="submit" class="btn btn-warning">Reset Password</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const email = ref('');
const password = ref('');
const resetEmail = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleSignIn = async () => {
  await authStore.signIn(email.value, password.value);
  if (authStore.user) {
    router.push('/home');
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: `Welcome ${authStore.user.email}!`,
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: authStore.error,
    });
  }
};

const confirmSignOut = async () => {
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will be signed out!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, sign out!',
    cancelButtonText: 'Cancel',
  });
  if (confirmation.isConfirmed) {
    await handleSignOut();
    Swal.fire('Signed Out', 'You have successfully signed out.', 'success');
  }
};

const handleSignOut = async () => {
  await authStore.signOut();
};

const handleResetPassword = async () => {
  await authStore.resetPassword(resetEmail.value);
  if (!authStore.error) {
    Swal.fire({
      icon: 'success',
      title: 'Reset Email Sent',
      text: 'Password reset email has been sent!',
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Reset Failed',
      text: authStore.error,
    });
  }
};

const user = computed(() => authStore.user);
const error = computed(() => authStore.error);

authStore.onAuthStateChanged();
</script>
