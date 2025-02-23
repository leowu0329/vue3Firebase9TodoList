<template>
  <div class="container">
    <h1>Register</h1>
    <form @submit.prevent="handleSignUp" class="mb-3">
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
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
    <p>
      Already have an account? <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../store/useAuthStore';
import Swal from 'sweetalert2';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleSignUp = async () => {
  if (!validatePassword(password.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Password',
      text: 'Password must be at least 8 characters long and contain at least one uppercase letter.',
    });
    return;
  }
  await authStore.signUp(email.value, password.value);
  if (!authStore.error) {
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have successfully registered! Please log in.',
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: authStore.error,
    });
  }
};

const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  return password.length >= minLength && hasUpperCase;
};

const user = computed(() => authStore.user);
const error = computed(() => authStore.error);

authStore.onAuthStateChanged();
</script>
