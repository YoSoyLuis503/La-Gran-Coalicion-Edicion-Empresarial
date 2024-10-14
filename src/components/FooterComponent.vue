<template>
  <!-- Footer Start -->
  <footer class="footer-area footer-bg footer-padding">
    <div class="row d-flex justify-content-between">
      <!-- Logo Section -->
      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
        <div class="footer-logo mb-20">
          <a href="index.html">
            <img src="@/assets/img/footherIMG.png" alt="Logo Footer" />
          </a>
        </div>
      </div>

      <!-- About Us Section -->
      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
        <div class="footer-tittle mb-30">
          <h4>Sobre nosotros</h4>
          <p>
            Somos un portal de empleos que se adapta a los cambios e innova
            constantemente para responder a las necesidades actuales y futuras
            de la sociedad.
          </p>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
        <div class="footer-tittle">
          <h4>Contáctenos</h4>
          <ul>
            <li><a href="tel:+50326456500">Teléfono: (503) 2645 6500</a></li>
            <li><a href="tel:8007026">Número Fijo: 800-7026</a></li>
            <li><a href="https://wa.me/50326456500">WhatsApp: (503) 2645 6500</a></li>
            <li><a href="mailto:consultas@ugb.edu.sv">Email: consultas@ugb.edu.sv</a></li>
          </ul>
        </div>
      </div>

      <!-- Links Section -->
      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
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
  </footer>
  <!-- Footer End -->
</template>

<script setup>
// No hay lógica compleja necesaria para el footer en este caso
</script>

<style scoped>
.footer-area {
  background-color: #0b17c5;
  /* Fondo azul */
  color: white;
  padding: 60px 0;
  /* Aumenta el padding para hacerlo más alto */
}

.footer-tittle h4 {
  color: white;
  margin-bottom: 20px;
}

.footer-logo img {
  max-width: 100%;
}

ul {
  list-style: none;
  padding: 0;
}

ul li a {
  color: white;
  text-decoration: none;
}

ul li a:hover {
  text-decoration: underline;
}
</style>
