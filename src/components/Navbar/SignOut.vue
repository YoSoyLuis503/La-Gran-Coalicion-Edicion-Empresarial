<template>
    <div>
      <!-- Aquí puede ir tu barra de navegación u otro componente -->
      <button @click="logout" class="btn btn-danger">
        Cerrar Sesión
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

