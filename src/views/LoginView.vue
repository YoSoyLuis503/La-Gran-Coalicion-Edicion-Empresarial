<template>
  <div class="body">
    <form class="container" @submit.prevent="handleSubmit">
      <div class="blue-ugb text-center mb-4">PORTAL DE EMPRESAS</div>

      <img src="@/assets/img/logoTA.png" alt="Logo Empresa" class="d-block mx-auto mb-4" />

      <div class="form-group mb-3">
        <label for="correo">Correo</label>
        <input type="text" class="form-control rounded-input" id="correo" placeholder="Correo" v-model="correo" required autocomplete="on" />
      </div>

      <div class="form-group mb-3 position-relative">
        <label for="password-field">Contraseña</label>
        <input :type="passwordVisible ? 'text' : 'password'" class="form-control rounded-input" id="password-field" placeholder="Contraseña" v-model="password" required autocomplete="on" />
        <button type="button" class="toggle-password" @click="togglePassword">
          <img :src="passwordVisible ? openEyeIcon : closedEyeIcon" alt="Toggle Password Visibility" class="eye-icon" />
        </button>
      </div>

      <button type="submit" class="btn btn-primary rounded-button w-100">
        INICIAR SESIÓN
      </button>

      <button type="button" class="btn btn-link" @click="redirectToRegister">
        ¿Aún no tienes una cuenta? Regístrate
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/js/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const correo = ref('');
const password = ref('');
const passwordVisible = ref(false);
const router = useRouter();

const openEyeIcon = require('@/assets/img/ojo-abierto.png');
const closedEyeIcon = require('@/assets/img/ojo-cerrado.png');

const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleSubmit = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, correo.value, password.value);
    const uid = userCredential.user.uid;

    const db = getFirestore();
    const userDocRef = doc(db, 'usuariosEmpresa', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      if (userData.tipo === 'empresa') {
        alert('Inicio de sesión exitoso. Bienvenido al portal de empresas.');
        router.push('/');
      } else {
        alert('La cuenta que ingresó no pertenece al portal de empresas.');
        await signOut(auth);
      }
    } else {
      alert('No se encontró información de la cuenta.');
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert(`Error: ${error.message}`);
  }
};

const redirectToRegister = () => {
  router.push('/register');
};

onMounted(async () => {
  try {
    await signOut(auth);
    console.log('Sesión cerrada automáticamente.');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
});
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}

.body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/public/Recursos/fondoLogin3.png") no-repeat center center fixed;
  background-size: cover;
}

.container {
  background-color: rgba(255, 255, 255, 0.7);
  display: grid;
  grid-template-columns: 1fr; /* Cambiado a 1fr para usar todo el ancho disponible */
  gap: 10px;
  width: 90%; /* Cambiado a un porcentaje para adaptarse a la pantalla */
  max-width: 400px; /* Limitar el ancho máximo en pantallas grandes */
  height: auto; /* Ajustar a contenido */
  border-radius: 5px;
  padding: 20px;
  color: #000000;
  margin: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.blue-ugb {
  height: max-content;
  width: 100%; /* Cambiado para que se adapte al ancho de la pantalla */
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
  height: auto;
}

.position-relative {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 67%;
  right: 15px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.eye-icon {
  width: 30px;
  height: auto;
}

/* Media Queries para mejorar la adaptabilidad */
@media (max-width: 600px) {
  .container {
    padding: 15px; /* Reduce el padding en pantallas pequeñas */
  }

  .blue-ugb {
    font-size: 1.2rem; /* Aumentar el tamaño del texto en pantallas pequeñas */
  }

  .rounded-input {
    font-size: 14px; /* Reducir el tamaño de la fuente en entradas */
  }

  .btn-primary, .rounded-button {
    padding: 8px 0; /* Reducir el padding de los botones */
  }

  .eye-icon {
    width: 25px; /* Ajustar el tamaño del ícono del ojo */
  }
}
</style>
