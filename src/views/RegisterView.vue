<template>
  <div class="bodyRegistro">
    <form class="containerRegistro" @submit.prevent="submitForm">
      <div class="blue-ugb text-center mb-4">REGISTRO EMPRESARIAL</div>

      <div id="Dimg" class="text-center mb-4">
        <img v-if="previewImage" :src="previewImage" alt="Logo Empresa" class="d-block mx-auto mb-4 rounded-image" />
        <img v-else src="@/assets/img/logoT.png" alt="Logo Empresa" class="d-block mx-auto mb-4 logo-default" />
      </div>

      <div class="form-group mb-3">
        <label for="formFile">Cargar Imagen (Logotipo)</label>
        <input class="form-control rounded-input" type="file" id="formFile" @change="handleFileUpload" required />
      </div>

      <div class="form-group mb-3">
        <label for="nombreEmpresa">Nombre de la empresa</label>
        <input type="text" id="nombreEmpresa" class="form-control rounded-input" placeholder="Escribe el nombre"
          v-model="formData.nombreEmpresa" required />
      </div>

      <div class="form-group mb-3">
        <label for="correo">Correo electrónico</label>
        <input type="email" id="correo" class="form-control rounded-input" placeholder="Correo"
          v-model="formData.correo" required />
      </div>

      <div class="form-group mb-3 position-relative">
        <label for="contraseña">Contraseña</label>
        <input :type="passwordVisible ? 'text' : 'password'" id="contraseña" class="form-control rounded-input"
          placeholder="Escribe la contraseña" v-model="formData.contraseña" required />
        <button type="button" class="toggle-password" @click="togglePassword">
          <img
            :src="passwordVisible ? require('@/assets/img/ojo-abierto.png') : require('@/assets/img/ojo-cerrado.png')"
            alt="Toggle Password Visibility" class="eye-icon" />
        </button>
      </div>

      <div class="form-group mb-3">
        <label for="direccion">Dirección</label>
        <input type="text" id="direccion" class="form-control rounded-input" placeholder="Escribe la dirección"
          v-model="formData.direccion" required />
      </div>

      <div class="form-group mb-3">
        <label for="telefono">Teléfono</label>
        <input type="text" id="telefono" class="form-control rounded-input" placeholder="teléfono"
          v-model="formData.telefono" @input="formatPhone" maxlength="9" required />
      </div>

      <div class="form-group mb-3">
        <label for="sector">Sector</label>
        <select class="form-select rounded-input" id="sector" v-model="formData.sector" required>
          <option disabled value="">Escoger Sector</option>
          <option value="IT">Tecnología de la información (IT)</option>
          <option value="Manufactura">Manufactura</option>
          <option value="Salud">Salud</option>
          <option value="Construcción">Construcción</option>
          <option value="Comercio">Comercio</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div class="form-group mb-3">
        <label for="nif">Número de Identificación Fiscal (NIF)</label>
        <input type="text" id="nif" class="form-control rounded-input" placeholder="Escribe el NIF"
          v-model="formData.nif" required />
      </div>

      <div class="form-group mb-3">
        <label for="nrc">Número de Registro de Contribuyente (NRC)</label>
        <input type="text" id="nrc" class="form-control rounded-input" placeholder="Escribe el NRC"
          v-model="formData.nrc" required />
      </div>

      <div class="form-group mb-3">
        <label for="sitioWeb">Sitio Web (opcional)</label>
        <input type="text" id="sitioWeb" class="form-control rounded-input" placeholder="URL"
          v-model="formData.sitioWeb" />
      </div>

      <div class="form-group mb-3">
        <label for="descripcion">Descripción (opcional)</label>
        <input type="text" id="descripcion" class="form-control rounded-input" placeholder="Descripción"
          v-model="formData.descripcion" />
      </div>

      <button type="submit" class="btn btn-primary rounded-button w-100">
        INICIAR SESIÓN
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '@/js/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importar Firebase Storage

const formData = ref({
  nombreEmpresa: '',
  correo: '',
  contraseña: '',
  direccion: '',
  telefono: '',
  sector: '',
  nif: '',
  nrc: '',
  sitioWeb: '',
  descripcion: '',
  logoUrl: '', // Nuevo campo para almacenar la URL de la imagen
});

const previewImage = ref(null);
const selectedFile = ref(null); // Archivo de imagen seleccionado
const passwordVisible = ref(false);

const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
    selectedFile.value = file; // Almacenar el archivo seleccionado
  }
};

const formatPhone = () => {
  formData.value.telefono = formData.value.telefono.replace(/\D/g, '');
  if (formData.value.telefono.length > 8) {
    formData.value.telefono = formData.value.telefono.substring(0, 8);
  }
  if (formData.value.telefono.length > 4) {
    formData.value.telefono = formData.value.telefono.replace(/(\d{4})(\d+)/, '$1-$2');
  }
};

const submitForm = async () => {
  const auth = getAuth();
  const storage = getStorage(); // Obtener la instancia de Firebase Storage
  try {
    // Registrar el usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(auth, formData.value.correo, formData.value.contraseña);
    const user = userCredential.user;

    // Subir la imagen a Firebase Storage si hay una imagen seleccionada
    if (selectedFile.value) {
      const storageRefPath = storageRef(storage, `logos/${user.uid}/${selectedFile.value.name}`);
      await uploadBytes(storageRefPath, selectedFile.value); // Subir el archivo
      const logoUrl = await getDownloadURL(storageRefPath); // Obtener la URL de descarga
      formData.value.logoUrl = logoUrl; // Guardar la URL en formData
    }

    // Guardar los datos del usuario en Firestore, incluyendo la URL de la imagen
    await setDoc(doc(db, 'usuarios', user.uid), {
      nombreEmpresa: formData.value.nombreEmpresa,
      correo: formData.value.correo,
      direccion: formData.value.direccion,
      telefono: formData.value.telefono,
      sector: formData.value.sector,
      nif: formData.value.nif,
      nrc: formData.value.nrc,
      sitioWeb: formData.value.sitioWeb,
      descripcion: formData.value.descripcion,
      logoUrl: formData.value.logoUrl, // Guardar la URL de la imagen
      tipo: 'empresa',
    });

    console.log('Usuario registrado y logueado:', user);
    window.location.href = '/';
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
  }
};
</script>

<style scoped>
html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-weight: normal;
  line-height: 1.15;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

.bodyRegistro {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: url("/public/Recursos/fondoLogin3.png") no-repeat center center fixed;
  background-size: cover;
}

.containerRegistro {
  justify-items: center;
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

.rounded-image {
  width: 50%;
  border: 1px solid #ddd;
  border-radius: 8px;
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

body {
  font-family: Arial, sans-serif;
}


#Dimg {
  width: 250px;
  height: 100px;
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
