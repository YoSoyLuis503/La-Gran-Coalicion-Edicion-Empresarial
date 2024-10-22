<template>
  <div class="bodyRegistro">
    <form class="containerRegistro" @submit.prevent="submitForm">
      <div class="blue-ugb text-center mb-4">REGISTRO EMPRESARIAL</div>

      <div id="Dimg" class="text-center mb-4">
        <img
          v-if="previewImage"
          :src="previewImage"
          alt="Logo Empresa"
          class="d-block mx-auto mb-4 rounded-image"
        />
        <img
          v-else
          src="@/assets/img/logoT.png"
          alt="Logo Empresa"
          class="d-block mx-auto mb-4 logo-default"
        />
      </div>

      <div class="form-group mb-3">
        <label for="formFile">Cargar Imagen (Logotipo)</label>
        <input
          class="form-control rounded-input"
          type="file"
          id="formFile"
          @change="handleFileUpload"
          accept="image/*"
          required
        />
      </div>

      <div class="form-group mb-3">
        <label for="nombreEmpresa">Nombre de la empresa</label>
        <input
          type="text"
          id="nombreEmpresa"
          class="form-control rounded-input"
          placeholder="Escribe el nombre"
          v-model="formData.nombreEmpresa"
          required
        />
      </div>

      <div class="form-group mb-3">
        <label for="correo">Correo electrónico</label>
        <input
          type="email"
          id="correo"
          class="form-control rounded-input"
          placeholder="Correo"
          v-model="formData.correo"
          required
        />
      </div>

      <div class="form-group mb-3 position-relative">
        <label for="contraseña">Contraseña</label>
        <input
          :type="passwordVisible ? 'text' : 'password'"
          id="contraseña"
          class="form-control rounded-input"
          placeholder="Escribe la contraseña"
          v-model="formData.contraseña"
          required
        />
        <button type="button" class="toggle-password" @click="togglePassword">
          <img 
            :src="passwordVisible ? require('@/assets/img/ojo-abierto.png') : require('@/assets/img/ojo-cerrado.png')" 
            alt="Toggle Password Visibility" 
            class="eye-icon" 
          />
        </button>
      </div>

      <div class="form-group mb-3">
        <label for="direccion">Dirección</label>
        <input
          type="text"
          id="direccion"
          class="form-control rounded-input"
          placeholder="Escribe la dirección"
          v-model="formData.direccion"
          required
        />
      </div>

      <div class="form-group mb-3">
        <label for="telefono">Teléfono</label>
        <input
          type="text"
          id="telefono"
          class="form-control rounded-input"
          placeholder="teléfono"
          v-model="formData.telefono"
          @input="formatPhone"
          maxlength="9"
          required
        />
      </div>

      <div class="form-group mb-3">
        <label for="sector">Sector</label>
        <select
          class="form-select rounded-input"
          id="sector"
          v-model="formData.sector"
          @change="handleSectorChange"
          required
        >
          <option disabled value="">Escoger Sector</option>
          <option value="IT">Tecnología de la información (IT)</option>
          <option value="Manufactura">Manufactura</option>
          <option value="Salud">Salud</option>
          <option value="Construcción">Construcción</option>
          <option value="Comercio">Comercio</option>
          <option value="Otro">Otro</option>
        </select>
        <input
          v-if="formData.sector === 'Otro'"
          type="text"
          id="otroSector"
          class="form-control rounded-input mt-2"
          placeholder="Especifique otro sector"
          v-model="formData.otroSector"
        />
      </div>

      <div class="form-group mb-3">
        <label for="nif">Número de Identificación Fiscal (NIF)</label>
        <input
          type="text"
          id="nif"
          class="form-control rounded-input"
          placeholder="Escribe el NIF"
          v-model="formData.nif"
          required
        />
      </div>

      <div class="form-group mb-3">
        <label for="nrc">Número de Registro de Contribuyente (NRC)</label>
        <input
          type="text"
          id="nrc"
          class="form-control rounded-input"
          placeholder="Escribe el NRC"
          v-model="formData.nrc"
          required
        />
      </div>

      <div class="form-group mb-3">
        <label for="sitioWeb">Sitio Web (opcional)</label>
        <input
          type="text"
          id="sitioWeb"
          class="form-control rounded-input"
          placeholder="URL"
          v-model="formData.sitioWeb"
        />
      </div>

      <div class="form-group mb-3">
        <label for="descripcion">Descripción (opcional)</label>
        <input
          type="text"
          id="descripcion"
          class="form-control rounded-input"
          placeholder="Escribe una breve descripción"
          v-model="formData.descripcion"
        />
      </div>

      <button type="submit" class="btn btn-primary btn-block rounded-input">
        REGISTRARSE
      </button>
    </form>
  </div>
</template>
  
<script>
import router from '@/router';
import { db, storage } from '@/js/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      formData: {
        nombreEmpresa: "",
        correo: "",
        contraseña: "",
        direccion: "",
        telefono: "",
        sector: "",
        otroSector: "",
        nif: "",
        nrc: "",
        sitioWeb: "",
        descripcion: "",
      },
      selectedFile: null,
      previewImage: null,
      passwordVisible: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("Por favor, selecciona un archivo de imagen.");
        event.target.value = null;
      }
    },
    async uploadImage(file) {
      const storageRef = ref(storage, `logos_empresas/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    },
    isStrongPassword(password) {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strongPasswordRegex.test(password);
    },
    async submitForm() {
      if (!this.isStrongPassword(this.formData.contraseña)) {
        alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.");
        return;
      }

      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.formData.correo, this.formData.contraseña);
        const user = userCredential.user;

        let imageUrl = null;
        if (this.selectedFile) {
          imageUrl = await this.uploadImage(this.selectedFile);
        }
        
        await setDoc(doc(db, "usuariosEmpresa", user.uid), {
          nombreEmpresa: this.formData.nombreEmpresa,
          correo: this.formData.correo,
          direccion: this.formData.direccion,
          telefono: this.formData.telefono,
          sector: this.formData.sector === "Otro" ? this.formData.otroSector : this.formData.sector, // Guardar el valor del input "Otro"
          nif: this.formData.nif,
          nrc: this.formData.nrc,
          sitioWeb: this.formData.sitioWeb,
          descripcion: this.formData.descripcion,
          tipo: "empresa",
          logoUrl: imageUrl,
        });

        console.log("Documento registrado con ID: ", this.formData.correo);
        if (user) {
          console.log("Usuario logueado:", user);
          window.location.href = "/";
        } else {
          console.log("No hay usuario logueado");
        }
      } catch (e) {
        console.error("Error al registrar el usuario: ", e);
      }
    },

    redirectToLogin() {
      router.push('/Login');
    },

    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },

    formatPhone() {
      this.formData.telefono = this.formData.telefono.replace(/\D/g, '');

      if (this.formData.telefono.length > 8) {
        this.formData.telefono = this.formData.telefono.substring(0, 8);
      }

      if (this.formData.telefono.length > 4) {
        this.formData.telefono = this.formData.telefono.replace(/(\d{4})(\d+)/, '$1-$2');
      }
    }
  }
};
</script>


  <style scoped>
  html{
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
    display: grid;
    grid-template-columns: repeat(1, 5fr);
    gap: 10px;
    width: max-content;
    height: max-content;
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
  width: 500px;
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


#Dimg{
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

  </style>
  