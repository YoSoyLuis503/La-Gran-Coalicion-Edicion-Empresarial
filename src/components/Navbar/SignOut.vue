<template>
    <div>
      <!-- Aquí puede ir tu barra de navegación u otro componente -->
      <button @click="logout" class="btn signout">
        <i class="bi bi-box-arrow-right"></i>
      </button>
    </div>
  </template>

<script setup>
import { getAuth, signOut } from "firebase/auth";

async function logout() {
  const auth = getAuth();
  try {
    await signOut(auth);
    alert("Sesión cerrada exitosamente");
    window.location.href = "/login"; // Redireccionar a la página de inicio de sesión
  } catch (error) {
    alert("Error al cerrar sesión:", error);
  }
}
</script>

<style scoped>
button.signout {
  color: #4F4F4F;
  font-size: 2em;
  background-color: none;
  border: none;
}

button.signout:hover {
  background-color: none;
} 
</style>

