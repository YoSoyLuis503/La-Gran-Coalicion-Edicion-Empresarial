<template>
  <div class="body">
    <form class="container" @submit.prevent="handleSubmit">
      <div class="blue-ugb text-center mb-4">PORTAL DE EMPRESAS</div>

      <img src="@/assets/img/logoTA.png" alt="Logo Empresa" class="d-block mx-auto mb-4" />

      <div class="form-group mb-3">
        <label for="correo">Correo</label>
        <input type="text" class="form-control rounded-input" id="correo" placeholder="Correo" v-model="correo" required
          autocomplete="on" />
      </div>

      <div class="form-group mb-3 position-relative">
        <label for="password-field">Contraseña</label>
        <input :type="passwordVisible ? 'text' : 'password'" class="form-control rounded-input" id="password-field"
          placeholder="Contraseña" v-model="password" required autocomplete="on" />
        <button type="button" class="toggle-password" @click="togglePassword">
          <img :src="passwordVisible ? openEyeIcon : closedEyeIcon" alt="Toggle Password Visibility" class="eye-icon" />
        </button>
      </div>

      <button type="submit" class="btn btn-primary rounded-button w-100">
        INICIAR SESIÓN
      </button>

      <button type="button" class="btn btn-link" @click="resetPassword">
        ¿Olvidaste tu contraseña?
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '@/js/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

// Variables reactivas
const correo = ref('');
const password = ref('');
const passwordVisible = ref(false);

// Iconos para mostrar/ocultar contraseña
const openEyeIcon = require('@/assets/img/ojo-abierto.png');
const closedEyeIcon = require('@/assets/img/ojo-cerrado.png');

// Función para alternar visibilidad de la contraseña
const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value;
};

// Función para manejar el envío del formulario
const handleSubmit = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, correo.value, password.value);
    const uid = userCredential.user.uid;
    alert(`Inicio de sesión exitoso. UID: ${uid}`);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert(`Error: ${error.message}`);
  }
};

// Función para restablecer la contraseña
const resetPassword = async () => {
  try {
    await sendPasswordResetEmail(auth, correo.value);
    alert('Correo de restablecimiento de contraseña enviado.');
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento:', error);
    alert(`Error: ${error.message}`);
  }
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
  /* Evita el desbordamiento horizontal */
}

.body {
  min-height: 100vh;
  /* Asegura que el contenedor ocupe al menos el 100% de la altura */
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/public/Recursos/fondoLogin3.png") no-repeat center center fixed;
  background-size: cover;
}

.container {
  background-color: rgba(255, 255, 255, 0.7);
  /* Fondo blanco con opacidad */
  display: grid;
  grid-template-columns: repeat(1, 5fr);
  gap: 10px;
  width: max-content;
  height: max-content;
  border-radius: 5px;
  padding: 20px;
  /* Aumentado para darle más espacio */
  color: #000000;
  margin: 10px;
  backdrop-filter: blur(10px);
  /* Efecto de difuminación */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  /* Sombras suaves */
  border: 1px solid rgba(255, 255, 255, 0.3);
  /* Ligeramente visible */
}

.blue-ugb {
  height: max-content;
  width: 410px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #ffffff;
  border-color: #a5a5a5;
  color: #000000;
}

.rounded-input {
  border-radius: 25px;
  padding: 10px;
  font-size: 16px;
}

.logo-default {
  width: 50%;
}

.btn-primary {
  background-color: #ffffff;
  border-color: #a5a5a5;
  color: #000000;
}

.btn-primary:hover {
  background-color: #ffffff00;
  border-color: #000000;
  color: #000000;
}

.rounded-button {
  border-radius: 25px;
  padding: 10px 0;
}

img {
  width: 100px;
  /* Ajusta el tamaño según sea necesario */
  height: auto;
}

.position-relative {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 67%;
  right: 15px;
  /* Ajusta la posición del botón según sea necesario */
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  /* Elimina el padding del botón */
}

.eye-icon {
  width: 30px;
  /* Ajusta el tamaño como necesites */
  height: auto;
  /* Mantiene la proporción de la imagen */
}
</style>
