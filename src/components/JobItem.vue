<template>
    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 mb-4 d-flex justify-content-center">
        <div class="single-job-items mb-30 d-flex flex-column align-items-center">
            <div class="job-items d-flex align-items-center">
                <div class="company-img">
                    <a href=""><img :src="job.img" alt="job logo"></a>
                </div>
                <div class="job-tittle">
                    <router-link :to="{name: 'candidates'}"><h4>{{ job.title }}</h4></router-link>
                    <ul>
                        <li>{{ job.company }}</li>
                        <li><i class="fas fa-map-marker-alt"></i>{{ job.location }}</li>
                        <li>{{ job.salary }}</li>
                    </ul>
                </div>
            </div>
            <div class="items-link f-right">
                <a href="">{{ job.type }}</a>
                <span>{{ job.time }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'JobItem',
    props: {
        job: Object
    }
};
</script>

<style scoped>
.single-job-items {
    border: 2px solid #c4c6ce;
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s ease;
    background-color: white;
    color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px;
    width: 100%;
    max-width: 800px; /* Ancho máximo para limitar la extensión del contenido */
}

.single-job-items:hover {
    background-color: #c4c6ce; /* Cambia a un tono gris al pasar el ratón */
    color: #ffffff; /* Mantiene el color del texto */
}

/* Cambiar el color de todos los enlaces a negro */
.single-job-items a {
    color: black; /* Color negro para todos los enlaces */
    text-decoration: none; /* Sin subrayado por defecto */
}

.single-job-items a:hover {
    text-decoration: underline; /* Subrayado al pasar el ratón */
}

.company-img img {
    max-width: 50px;
}

.job-items {
    display: flex;
    align-items: center;
}

.items-link {
    margin-top: 10px;
}
</style>
