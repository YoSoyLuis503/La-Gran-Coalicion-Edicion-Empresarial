<template>
  <header>
    <NavbarComponent />
  </header>

  <div class="container-fluid">
    <!-- Información de la empresa -->
    <div class="row">
      <PostJobHeader />
    </div>

    <!-- Campos del formulario -->
    <div class="row mt-3">
      <!-- Usamos v-for para iterar sobre los inputs -->
      <div class="col-6" v-for="(input, index) in textInputs" :key="index">
        <PostJobTextInput :placeholder="input.placeholder" :type="input.type" v-model="input.model"
          :required="input.required" />
      </div>
    </div>

    <div class="row">
      <h3>Duración</h3> <br>
      <div class="col -6">
        <input class="form-control" type="number" placeholder="0" min="0" step="1" /><br>
      </div>
      <div class="col -6">
        <select class="form-select form-control" aria-label="Default select example">
          <option selected>Selecionar período de tiempo</option>
          <option>Semanas</option>
          <option>Meses</option>
          <option>Años</option>
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
        <select class="form-control" v-model="distrito" required>
          <option selected disabled>Distrito</option>
          <option v-for="distrito in distritosDisponibles" :key="distrito">{{ distrito }}</option>
        </select>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col text-start">
        <textarea class="form-control" rows="3" placeholder="Descripción" required v-model="description"></textarea>
      </div>
    </div>

    <!-- Campos adicionales -->
    <div class="row mt-3">
      <!-- Usamos v-for para iterar sobre los select components -->
      <div class="col-6 text-start" v-for="(select, index) in selectOptions" :key="index">
        <SelectComponent v-model="select.model" :options="select.options" :placeholder="select.placeholder" />
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
// import PostJobTextInput from '@/components/InputComponent.vue';
// import PostJobTextTarea from '@/components/PostJob/PostJobTextTarea.vue';
import FooterComponent from '@/components/FooterComponent.vue';
// import SelectComponent from '@/components/SelectComponent.vue';
import { ref, onMounted } from 'vue';
import { db } from '@/js/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

// Datos de los inputs de texto
const company = ref('');
const name = ref('');
const time = ref('');
const place = ref('');
const salarie = ref('');
const description = ref('');

// Array para los campos de texto con su configuración
const textInputs = [
  { placeholder: 'Nombre del puesto', type: 'text', model: name, required: true },
  { placeholder: 'Duración', type: 'text', model: time, required: true },
  { placeholder: 'Lugar de trabajo', type: 'text', model: place, required: true },
  { placeholder: 'Salario', type: 'text', model: salarie, required: true },
];

const departamentos = {
  "Morazán": ["Morazán Norte", "Morazán Sur"],
  "San Miguel": ["SM Norte", "SM Centro", "SM Oeste"],
  "La Unión": ["La Unión Norte", "La Unión Sur"],
  "Usulután": ["Usulután Norte", "Usulután Sur", "Usulután Oeste"],
};

const departamento = ref('Departamento');
const distrito = ref('Distrito');
const distritosDisponibles = ref([]);

const seleccionarDistritos = () => {
  distritosDisponibles.value = departamentos[departamento.value] || [];
};

// Datos de los selects
const modoEmpleo = ref('');
const tipoEmpleo = ref('');
const tiemposEmpleo = ref('');

// distritoes para los selects
const modalidades = [
  { value: 'Presencial', text: 'Presencial' },
  { value: 'Remoto', text: 'Remoto' },
  { value: 'Híbrido', text: 'Híbrido' }
];

const tipos = [
  { value: 'Tiempo Completo', text: 'Tiempo Completo' },
  { value: 'Medio Tiempo', text: 'Medio Tiempo' },
  { value: 'Freelance', text: 'Freelance' }
];


const tiempos = [
  { value: 'Semanas', text: 'Semanas' },
  { value: 'Meses', text: 'Meses' },
  { value: 'Años', text: 'Años' }
];


// Array para los selects con su configuración
const selectOptions = [
  { model: modoEmpleo, options: modalidades, placeholder: 'Modalidad de empleo' },
  { model: tipoEmpleo, options: tipos, placeholder: 'Tipo de empleo' },
  { model: tiemposEmpleo, options: tiempos, placeholder: '' },
];

// Función para obtener datos de la empresa desde Firestore
const fetchCompanyData = async () => {
  const companyRef = doc(db, "usuarios", "hRnJXie6m7TIhIl2EI0ApJIJFVQ2"); // Reemplaza "companyId" con el ID real de la empresa
  const companySnap = await getDoc(companyRef);

  if (companySnap.exists()) {
    const data = companySnap.data();
    company.value = data.nombreEmpresa || 'Sin nombre'
  } else {
    console.log("No se encontraron datos para la empresa.");
  }
};

// Función para publicar empleo y reiniciar los campos
const postJob = async () => {
  try {
    await addDoc(collection(db, "empleos"), {
      Compañía: company.value, // Datos de la compañía, puedes obtenerlos dinámicamente
      Titulo: name.value,
      Duración: time.value,
      Ubicación: place.value,
      Salario: salarie.value,
      Descripción: description.value,
      Modalidad: modoEmpleo.value,
      Tipo: tipoEmpleo.value
    });

    // Reiniciar los campos del formulario
    name.value = '';
    time.value = '';
    place.value = '';
    salarie.value = '';
    description.value = '';
    modoEmpleo.value = '';
    tipoEmpleo.value = '';

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
