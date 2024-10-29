<template>
  <header>
    <NavbarComponent />
  </header>

  <div class="container-fluid">
    <!-- Información de la empresa -->
    <div class="row">
      <PostJobHeader @sendCompanyData="receiveCompanyData" />
    </div>

    <!-- Campos del formulario -->
    <div class="row mt-3">
      <h3>Titulo</h3> <br>
      <PostJobTextInput placeholder="Título del puesto" type="text" v-model="title" required="true" />
    </div>
    <div class="row mt-3">
      <h3>Descripción</h3> <br>
      <div class="col">
        <textarea class="form-control" rows="3" placeholder="Descripción" v-model="description" required></textarea>
      </div>
    </div>
    <div class="row">
      <h3>Duración</h3> <br>
      <div class="col -6">
        <input class="form-control" type="number" placeholder="0" min="0" step="1" v-model="time" /><br>
      </div>
      <div class="col -6">
        <select class="form-select form-control" v-model="periodoDeTiempo">
          <option v-for="(t) in SMA" :key="t">{{ t }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <h3>Lugar de trabajo</h3> <br>
      <div class="col -6">
        <select class="form-select form-control" v-model="departamento" @change="seleccionarDistritos">
          <option selected disabled>Departamento</option>
          <option v-for="(distritos, dept) in departamentos" :key="dept">{{ dept }}</option>
        </select>
      </div>
      <div class="col -6">
        <select class="form-select form-control" v-model="distrito" required>
          <option selected disabled>Distrito</option>
          <option v-for="distrito in distritosDisponibles" :key="distrito">{{ distrito }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <h3>Modalidad y tipo de empleo</h3> <br>
      <div class="col -6">
        <select class="form-select form-control" v-model="modoEmpleo">
          <option v-for="(t) in modalidadesEmpleo" :key="t">{{ t }}</option>
        </select>
      </div>
      <div class="col -6">
        <select class="form-select form-control" v-model="tipoEmpleo" required>
          <option v-for="(t) in tiposEmpleo" :key="t">{{ t }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <h3>Salario $</h3> <br>
      <div class="col">
        <input class="form-control" type="number" placeholder="400" min="400" step="50" v-model="salarie"
          required /><br>
      </div>
    </div>

    <!-- Botón para publicar -->
    <div class="row mt-3 mb-5">
      <div class="col text-start">
        <button type="submit" class="btn btn-primary w-100" @click="postJob">Publicar</button>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<script setup>
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
import PostJobHeader from '@/components/PostJob/PostJobHeader.vue';
import PostJobTextInput from '@/components/InputComponent.vue';
// import PostJobTextTarea from '@/components/PostJob/PostJobTextTarea.vue';
import FooterComponent from '@/components/FooterComponent.vue';
// import SelectComponent from '@/components/SelectComponent.vue';
import { ref, onMounted } from 'vue';
import { db } from '@/js/firebase';
import { collection, addDoc, doc, getDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Datos de los inputs de texto
const company = ref('');
const userId = ref('');
const title = ref('');
const time = ref('');
const salarie = ref('');
const description = ref('');

// Array para los campos de texto con su configuración

const SMA = ["Semanas", "Meses", "Años"]
const modalidadesEmpleo = ["Presencial", "Virtual", "Semi Presencial"]
const tiposEmpleo = ["Tiempo completo", "Medio tiempo", "Freelance"]
const departamentos = {
  "Morazán": ["Morazán Norte", "Morazán Sur"],
  "San Miguel": ["SM Norte", "SM Centro", "SM Oeste"],
  "La Unión": ["La Unión Norte", "La Unión Sur"],
  "Usulután": ["Usulután Norte", "Usulután Sur", "Usulután Oeste"],
};

// Datos de los selects
const modoEmpleo = ref('Presencial');
const tipoEmpleo = ref('Tiempo completo');
const periodoDeTiempo = ref('Meses');
const departamento = ref('Departamento');
const distrito = ref('Distrito');
const distritosDisponibles = ref([]);

const seleccionarDistritos = () => {
  distritosDisponibles.value = departamentos[departamento.value] || [];
};

// Función para obtener datos de la empresa desde Firestore
const fetchCompanyData = async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const companyRef = doc(db, "usuariosEmpresa", currentUser.uid); // Reemplaza "companyId" con el ID real de la empresa
  const companySnap = await getDoc(companyRef);

  if (companySnap.exists()) {
    const data = companySnap.data();
    company.value = data.nombreEmpresa || 'Sin nombre'
    userId.value = currentUser.uid || 'No se encontró el uid de la empresa'
  } else {
    console.log("No se encontraron datos para la empresa.");
  }
};

// Almacenamos los datos de la empresa en una referencia reactiva
const companyData = ref({});

// Función para recibir los datos del evento emitido
const receiveCompanyData = (data) => {
  companyData.value = data;
};

// Función para publicar empleo y reiniciar los campos
const postJob = async () => {
  try {
    await addDoc(collection(db, "empleos"), {
      uid: userId.value,//Uid de la empresa
      nombre: companyData.value.name,//Nombre empresa
      correo: companyData.value.email,//Correo empresa
      telefono: companyData.value.tel,//Telefono empresa
      sector: companyData.value.sector,//Sector empresa
      icono: companyData.value.icon,//icono empresa
      Título: title.value,
      Descripción: description.value,
      Duración: time.value + " " + periodoDeTiempo.value,
      Departamento: departamento.value,
      Distrito: distrito.value,
      Salario: salarie.value,
      Modalidad: modoEmpleo.value,
      Tipo: tipoEmpleo.value,
      fechaPublicacion: Timestamp.now(), // Fecha y hora de publicación
    });

    // Reiniciar los campos del formulario
    title.value = '';
    description.value = '';
    time.value = '';
    periodoDeTiempo.value = 'Meses';
    departamento.value = 'Departamento';
    distrito.value = 'Distrito';
    salarie.value = '';
    modoEmpleo.value = 'Presencial';
    tipoEmpleo.value = 'Tiempo completo';

    alert("El empleo ha sido publicado exitosamente.");
  } catch (error) {
    console.error("Error publicando el empleo: ", error);
    alert("Ocurrió un error al publicar el empleo.");
  }
};

onMounted(() => {
  fetchCompanyData();
});
</script>

<style scoped>
.tooltip-text {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-top: 5px;
  z-index: 1;
  width: 100%;
  text-align: center;
}

.form-control {
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
}
</style>
