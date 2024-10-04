<template>
  <!-- Footer Start -->
  <div class="footer-area footer-bg footer-padding">
    <div class="container">
      <div class="row d-flex justify-content-between">
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
          <div class="single-footer-caption mb-50">
            <!-- logo -->
            <div class="footer-logo mb-20">
              <a href="index.html">
                <img src="@/assets/img/footherIMG.png" alt="Logo Footer" />
              </a>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
          <div class="single-footer-caption mb-50">
            <div class="single-footer-caption mb-30">
              <div class="footer-tittle">
                <h4>Sobre nosotros</h4>
                <div class="footer-pera">
                  <p>
                    Somos un portal de empleos que se adapta a los cambios e
                    innova constantemente para responder a las necesidades
                    actuales y futuras de la sociedad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
          <div class="single-footer-caption mb-50">
            <div class="footer-tittle">
              <h4>Contactenos</h4>
              <ul>
                <li><a href="#">Telefono : (503) 2645 6500</a></li>
                <li><a href="#">Numero Fijo : 800-7026</a></li>
                <li><a href="#">WhatsApp : (503) 2645 6500</a></li>
                <li><a href="#">Email : consultas@ugb.edu.sv</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
          <div class="single-footer-caption mb-50">
            <div class="footer-tittle">
              <h4>Visita también</h4>
              <ul>
                <li><a href="https://ugb.edu.sv/">UGB sitio oficial</a></li>
                <li>
                  <a href="https://estudiantes.ugb.edu.sv/Login?ReturnUrl=%2F">Portal estudiantes</a>
                </li>
                <li><a href="https://ugb.instructure.com/login/canvas">Canvas UGB</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer End -->
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer-area {
  background-color: #3300ff; /* Fondo azul */
  color: white; /* Texto blanco */
  padding: 60px 0; /* Aumenta el padding para hacerlo más alto */
}

.footer-tittle h4 {
  color: white; /* Título en blanco */
}

.footer-logo img {
  max-width: 100%; /* Asegura que la imagen del logo no se desborde */
}

ul {
  list-style: none; /* Eliminar los puntos de la lista */
  padding: 0;
}

ul li a {
  color: white; /* Links en blanco */
  text-decoration: none;
}

ul li a:hover {
  text-decoration: underline; /* Subrayar al pasar el cursor por encima */
}
</style>
