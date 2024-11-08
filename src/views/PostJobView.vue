<template>
  <header>
    <NavbarComponent />
  </header>

  <div class="caja container-fluid">
    <!-- Información de la empresa -->
    <div class="row">
      <PostJobHeader @sendCompanyData="receiveCompanyData" />
    </div>

    <!-- Campos del formulario -->
    <div class="row mt-3 text-start">
      <div class="col-xl-4 col-lg-4 col-md-4">
        <h6>Titulo</h6>
        <input class="form-control" type="text" v-model="title" required placeholder="Título del puesto"><br>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4">
        <h6>Facultad</h6>
        <select class="form-select form-control" v-model="facultad">
          <option selected disabled>Facultad</option>
          <option v-for="(facultad, dept) in facultades" :key="dept">{{ facultad }}</option>
        </select>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4">
        <h6>Salario $</h6>
        <input class="form-control" type="number" placeholder="400" min="400" step="50" v-model="salarie" required><br>
      </div>
    </div>

    <div class="row mt-2 text-start">
      <h6>Descripción</h6>
      <textarea class="form-control" rows="3" placeholder="Descripción" v-model="description" required></textarea>
    </div>

    <div class="row mt-3">
      <h4>Información Adicional</h4>
    </div>

    <div class="row mt-3 text-start">
      <h6>Duración</h6>
      <div class="col">
        <select class="form-select form-control" v-model="periodoDeTiempo" required @change="updatePeriodoDeTiempo">
          <option selected disabled>Seleccionar</option>
          <option v-for="(pdt) in SMA" :key="pdt">{{ pdt }}</option>
        </select>
      </div><br>
      <div class="col">
        <input class="form-control" type="number" placeholder="0" min="0" step="1" v-model="time"
          :disabled="periodoDeTiempo === 'Ninguna'" />
      </div>
    </div>

    <div class="row mt-3 text-start">
      <h6>Lugar de trabajo</h6>
      <div class="col">
        <select class="form-select form-control" v-model="departamento" @change="seleccionarDistritos">
          <option selected disabled>Departamento</option>
          <option v-for="(distritos, dept) in departamentos" :key="dept">{{ dept }}</option>
        </select>
      </div><br>
      <div class="col">
        <select class="form-select form-control" v-model="distrito" required>
          <option selected disabled>Distrito</option>
          <option v-for="distrito in distritosDisponibles" :key="distrito">{{ distrito }}</option>
        </select>
      </div>
    </div>

    <div class="row mt-3 text-start">
      <div class="col -6">
        <h6>Modalidad</h6>
        <select class="form-select form-control" v-model="modoEmpleo" required>
          <option selected disabled>Seleccionar</option>
          <option v-for="(mod) in modalidadesEmpleo" :key="mod">{{ mod }}</option>
        </select>
      </div>
      <div class="col -6">
        <h6>Tipo de empleo</h6>
        <select class="form-select form-control" v-model="tipoEmpleo" required>
          <option selected disabled>Seleccionar</option>
          <option v-for="(tipo) in tiposEmpleo" :key="tipo">{{ tipo }}</option>
        </select>
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
import FooterComponent from '@/components/FooterComponent.vue';
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
let facultades = [
  "Ciencias de la salud", "Derecho y relaciones internacionales", "Ciencias empresariales",
  "Ciencia y tecnología", "Ciencias y humanidades", "Ingenería y arquitectura"
]
const SMA = ["Ninguna", "Semanas", "Meses", "Años"]
const modalidadesEmpleo = ["Presencial", "Virtual", "Semi Presencial"]
const tiposEmpleo = ["Tiempo completo", "Medio tiempo", "Freelance"]
const departamentos = {
  "Morazán": ["Morazán Norte", "Morazán Sur"],
  "San Miguel": ["SM Norte", "SM Centro", "SM Oeste"],
  "La Unión": ["La Unión Norte", "La Unión Sur"],
  "Usulután": ["Usulután Norte", "Usulután Sur", "Usulután Oeste"],
};

// Datos de los selects
let facultad = ref('Facultad')
const modoEmpleo = ref('Presencial');
const tipoEmpleo = ref('Tiempo completo');
const periodoDeTiempo = ref('Ninguna');
const departamento = ref('Departamento');
const distrito = ref('Distrito');
const distritosDisponibles = ref([]);

const seleccionarDistritos = () => {
  distritosDisponibles.value = departamentos[departamento.value] || [];
};

const updatePeriodoDeTiempo = (event) => {
  periodoDeTiempo.value = event.target.value;
  if (periodoDeTiempo.value === "Ninguna") {
    time.value = 0; // Reiniciar `time` si se selecciona "Ninguna"
  }
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
      Facultad: facultad.value,
      Descripción: description.value,
      PeriodoTiempo: periodoDeTiempo.value,
      Tiempo: time.value,
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

.caja {
  max-width: 80em;
}
</style>
