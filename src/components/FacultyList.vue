<template>
    <div class="container faculties-container">
        <h2 class="text-center mb-4 title-blue">Lista de Facultades</h2> <!-- Título centrado y azul -->
        <div class="row d-flex justify-content-center">
            <div v-for="(faculty, index) in faculties" :key="index" class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
                <FacultyItem :faculty="faculty" />
            </div>
        </div>
    </div>
</template>

<script>
import FacultyItem from './FacultyItem.vue';

export default {
    name: "FacultyList",
    components: {
        FacultyItem
    },
    props: {
        faculties: {
            type: Array,
            required: true
        }
    }
};
</script>

<style scoped>
.faculties-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
}

/* Ajustes de la fila */
.row {
    width: 100%;
}

/* Estilo de las columnas y tarjetas */
.col-xl-3, .col-lg-4, .col-md-6, .col-sm-12 {
    display: flex;
    justify-content: center;
}

.faculty-box {
    border: 2px solid #007bff;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    color: #333;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 300px;
    text-align: center;
    position: relative;
}

/* Estilo para hacer que las tarjetas resalten al pasar el ratón */
.faculty-box:hover {
    background-color: #007bff;
    color: #fff;
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Estilo del título de la facultad */
.faculty-box h5 {
    font-size: 1.25rem;
    margin: 15px 0;
}

/* Asegura que el enlace mantenga el estilo */
.faculty-box h5 a {
    color: inherit;
    text-decoration: none;
    font-weight: bold;
}

/* Subrayar el enlace al pasar el ratón */
.faculty-box h5 a:hover {
    text-decoration: underline;
}

/* Descripción de la facultad */
.faculty-description {
    font-size: 0.9rem;
    color: #666;
    margin-top: 10px;
}

/* Ajuste adicional para la imagen de ícono si existe */
.faculty-box .services-ion {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #007bff;
}

.faculty-box:hover .services-ion {
    color: white;
}

/* Estilo para el título centrado */
.text-center {
    text-align: center;
}

/* Nueva clase para el título azul */
.title-blue {
    color: #007bff; /* Color azul */
}
</style>
