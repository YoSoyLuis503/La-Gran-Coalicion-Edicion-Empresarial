<template>
    <div class="bodyRegistro">
      <form class="containerRegistro" @submit.prevent="submitForm">
        <div class="blue-ugb">REGISTRO EMPRESARIAL</div>
        <img src="@/assets/logo_azul_vertical.png" alt="Logo Empresa">
  
        <div>Nombre de la empresa</div>
        <input
          type="text"
          class="item"
          placeholder="Escribe el nombre de la empresa"
          v-model="formData.nombreEmpresa"
          required
        />
  
        <div class="mb-3">
          <label for="formFile" class="form-label">Cargar Imagen(Logotipo)</label>
          <input class="form-control" type="file" id="formFile" @change="handleFileUpload" required />
        </div>
  
        <div>Correo electrónico</div>
        <input
          type="email"
          class="item"
          placeholder="Escribe el correo"
          v-model="formData.correo"
          required
        />
  
        <div>Contraseña</div>
        <input
          type="password"
          class="item"
          placeholder="Escribe la contraseña"
          v-model="formData.contraseña"
          required
        />
  
        <div>Dirección</div>
        <input
          type="text"
          class="item"
          placeholder="Escribe la dirección"
          v-model="formData.direccion"
          required
        />
  
        <div>Teléfono</div>
        <input
          type="text"
          class="item"
          placeholder="Escribe el número de teléfono"
          v-model="formData.telefono"
          required
        />
  
        <div>Sector</div>
        <select class="form-select" v-model="formData.sector" required>
          <option disabled value="">Escoger Sector</option>
          <option value="IT">Tecnología de la información (IT)</option>
          <option value="Manufactura">Manufactura</option>
          <option value="Salud">Salud</option>
          <option value="Construcción">Construcción</option>
          <option value="Comercio">Comercio</option>
          <option value="Otro">Otro</option>
        </select>
  
        <div>Número de Identificación Fiscal (NIF)</div>
        <input
          type="text"
          class="item"
          placeholder="Escribe el NIF"
          v-model="formData.nif"
          required
        />
  
        <div>Número de Registro de Contribuyente (NRC)</div>
        <input
          type="text"
          class="item"
          placeholder="Escribe el NRC"
          v-model="formData.nrc"
          required
        />
  
        <div>Sitio Web (opcional)</div>
        <input
          type="text"
          class="item"
          placeholder="URL"
          v-model="formData.sitioWeb"
        />
  
        <div>Número de empleados (opcional)</div>
        <input
          type="text"
          class="item"
          placeholder="N° de empleados"
          v-model="formData.empleados"
        />
  
        <div>Descripción (opcional)</div>
        <input
          type="text"
          class="item"
          placeholder="Descripción"
          v-model="formData.descripcion"
        />
  
        <input type="submit" class="button" value="INICIAR SESIÓN" />
      </form>
    </div>
  </template>
  
  <script>
  import { db } from '@/js/firebase';
  import { collection, addDoc } from 'firebase/firestore';
  
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
          nif: "",
          nrc: "",
          sitioWeb: "",
          empleados: "",
          descripcion: "",
        },
        logo: null,
      };
    },
    methods: {
    async submitForm() {
      try {
        const docRef = await addDoc(collection(db, "empresas"), {
          nombreEmpresa: this.formData.nombreEmpresa,
          correo: this.formData.correo,
          direccion: this.formData.direccion,
          telefono: this.formData.telefono,
          sector: this.formData.sector,
          nif: this.formData.nif,
          nrc: this.formData.nrc,
          sitioWeb: this.formData.sitioWeb,
          empleados: this.formData.empleados,
          descripcion: this.formData.descripcion,
        });
        console.log("Documento registrado con ID: ", docRef.id);
      } catch (e) {
        console.error("Error al agregar el documento: ", e);
      }
    }
  }
  };
  </script>
  
  <style scoped>
  @import '@/css/loginAndRegistroEmpresarial.css';
  </style>
  