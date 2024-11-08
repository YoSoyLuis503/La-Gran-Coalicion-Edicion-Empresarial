<template>
    <header>
        <NavbarComponent />
    </header>
    <div class="caja container-fluid">
        <!-- Información de la empresa -->
        <div class="row">
            <PostJobHeader @sendCompanyData="receiveCompanyData" />
        </div>
        <div class="row mt-3 text-start">
            <div class="col-xl-4 col-lg-4 col-md-4">
                <h6>Título</h6>
                <input class="form-control" type="text" v-model="title" required placeholder="Título del puesto">
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4">
                <h6>Facultad</h6>
                <SelectComponent :modelValue="facultad" :required="true" :options="facultades" />
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4">
                <h6>Salario $</h6>
                <input class="form-control" type="number" v-model="salarie" required placeholder="400" min="400"
                    step="50">
            </div>
        </div>
        <div class="row mt-2 text-start">
            <h6>Descripción</h6>
            <textarea class="form-control" v-model="description" rows="3" required placeholder="Descripción"></textarea>
        </div>
        <div class="row mt-3">
            <h4>Información Adicional</h4>
        </div>
        <div class="row mt-3 text-start">
            <h6>Duración</h6>
            <div class="col">
                <SelectComponent :modelValue="periodoDeTiempo" :required="true" :options="SMA" @update:modelValue="updatePeriodoDeTiempo" />
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
            </div>
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
                <SelectComponent :modelValue="modoEmpleo" :required=true :options="modalidadesEmpleo" />
            </div>
            <div class="col -6">
                <h6>Tipo de empleo</h6>
                <SelectComponent :modelValue="tipoEmpleo" :required=true :options="tiposEmpleo" />
            </div>
        </div>
        <!-- Botón para guardar -->
        <div class="row mt-3 mb-5">
            <div class="col text-start">
                <button type="submit" class="btn btn-primary w-100" @click="updateJob">Guardar Cambios</button>
            </div>
        </div>
    </div>
    <FooterComponent />
</template>

<script setup>
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
import PostJobHeader from '@/components/PostJob/PostJobHeader.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import { ref, onMounted } from 'vue';
import { db } from '@/js/firebase';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const jobId = route.params.jobId;
const router = useRouter()

// Campos del formulario
const title = ref('');
const facultad = ref('');
const salarie = ref('');
const description = ref('');
const time = ref('')
const departamento = ref('');
const distrito = ref('');
const modoEmpleo = ref('');
const tipoEmpleo = ref('');

// Datos de opciones
const facultades = ["Ciencias de la salud", "Derecho y relaciones internacionales", "Ciencias empresariales", "Ciencia y tecnología", "Ciencias y humanidades", "Ingeniería y arquitectura"];
const SMA = ["Ninguna", "Semanas", "Meses", "Años"]
const modalidadesEmpleo = ["Presencial", "Virtual", "Semi Presencial"];
const tiposEmpleo = ["Tiempo completo", "Medio tiempo", "Freelance"];
const departamentos = {
    "Morazán": ["Morazán Norte", "Morazán Sur"],
    "San Miguel": ["SM Norte", "SM Centro", "SM Oeste"],
    "La Unión": ["La Unión Norte", "La Unión Sur"],
    "Usulután": ["Usulután Norte", "Usulután Sur", "Usulután Oeste"],
};

// Datos de los selects
const periodoDeTiempo = ref('');
const distritosDisponibles = ref([]);

const seleccionarDistritos = () => {
    distritosDisponibles.value = departamentos[departamento.value] || [];
};

// Función para actualizar periodoDeTiempo
const updatePeriodoDeTiempo = (value) => {
  periodoDeTiempo.value = value;
  if (value === "Ninguna") {
    time.value = 0; // Reiniciar time si se selecciona "Ninguna"
  }
};

// Función para obtener los datos del empleo desde Firestore
const fetchJobData = async () => {
    if (jobId) {
        const jobRef = doc(db, "empleos", jobId);
        const jobSnap = await getDoc(jobRef);

        if (jobSnap.exists()) {
            const jobData = jobSnap.data();
            title.value = jobData.Título;
            facultad.value = jobData.Facultad;
            salarie.value = jobData.Salario;
            description.value = jobData.Descripción;
            periodoDeTiempo.value = jobData.PeriodoTiempo;
            time.value = jobData.Tiempo;
            departamento.value = jobData.Departamento;
            distrito.value = jobData.Distrito;
            modoEmpleo.value = jobData.Modalidad;
            tipoEmpleo.value = jobData.Tipo;

            // Actualiza los distritos disponibles según el departamento cargado
            seleccionarDistritos();
        } else {
            console.log("No se encontró el empleo.");
        }
    }
};

const updateJob = async () => {
    try {
        const jobRef = doc(db, 'empleos', jobId); // Referencia al documento específico en Firestore
        await updateDoc(jobRef, {
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

        alert('El empleo ha sido actualizado exitosamente.');

        router.push({name: 'Home'})
    } catch (error) {
        console.error('Error actualizando el empleo: ', error);
        alert('Ocurrió un error al actualizar el empleo.');
    }
};


// Llama a la función para cargar los datos al montar el componente
onMounted(() => {
    fetchJobData();
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