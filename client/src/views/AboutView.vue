<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1>Nuestra Historia</h1>
        <p class="subtitle">Creando experiencias minimalistas desde 2024</p>
      </div>
    </section>

    <!-- Misión y Valores -->
    <section class="mission-section">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-content">
            <h2>Nuestra Misión</h2>
            <p>
              En MINIMAL, nos dedicamos a crear productos que combinan la simplicidad con la
              funcionalidad. Creemos que la belleza reside en lo esencial, y cada pieza que
              ofrecemos refleja esta filosofía.
            </p>
            <div class="values">
              <div class="value-item">
                <i class="fas fa-leaf"></i>
                <h3>Sostenibilidad</h3>
                <p>Comprometidos con el medio ambiente y prácticas responsables</p>
              </div>
              <div class="value-item">
                <i class="fas fa-heart"></i>
                <h3>Calidad</h3>
                <p>Materiales premium y atención meticulosa al detalle</p>
              </div>
              <div class="value-item">
                <i class="fas fa-handshake"></i>
                <h3>Transparencia</h3>
                <p>Procesos éticos y relaciones honestas con nuestros clientes</p>
              </div>
            </div>
          </div>
          <div class="mission-image">
            <img
              src="https://images.unsplash.com/photo-1529336953128-a85760f58cb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Espacio de trabajo minimalista"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Proceso -->
    <section class="process-section">
      <div class="container">
        <h2>Nuestro Proceso</h2>
        <div class="process-grid">
          <div class="process-step">
            <span class="step-number">01</span>
            <h3>Diseño</h3>
            <p>
              Cada producto comienza con un boceto, inspirado en la simplicidad y la
              funcionalidad.
            </p>
          </div>
          <div class="process-step">
            <span class="step-number">02</span>
            <h3>Selección</h3>
            <p>
              Elegimos cuidadosamente materiales sostenibles y de la más alta calidad.
            </p>
          </div>
          <div class="process-step">
            <span class="step-number">03</span>
            <h3>Creación</h3>
            <p>
              Artesanos expertos dan vida a cada pieza con precisión y cuidado.
            </p>
          </div>
          <div class="process-step">
            <span class="step-number">04</span>
            <h3>Control</h3>
            <p>
              Rigurosos estándares de calidad aseguran la excelencia en cada detalle.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipo -->
    <section class="team-section">
      <div class="container">
        <h2>Nuestro Equipo</h2>
        <div class="team-grid">
          <div class="team-member">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="Ana García"
            />
            <h3>Ana García</h3>
            <p>Fundadora & Directora Creativa</p>
          </div>
          <div class="team-member">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="Carlos Ruiz"
            />
            <h3>Carlos Ruiz</h3>
            <p>Director de Diseño</p>
          </div>
          <div class="team-member">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="Laura Martínez"
            />
            <h3>Laura Martínez</h3>
            <p>Directora de Sostenibilidad</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contacto -->
    <section class="contact-section">
      <div class="container">
        <h2>Contacta con Nosotros</h2>
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <h3>Ubicación</h3>
                <p>Calle Principal 123, 28001 Madrid</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>info@minimal.com</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <div>
                <h3>Teléfono</h3>
                <p>+34 900 123 456</p>
              </div>
            </div>
          </div>
          <div class="contact-image">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Nuestro showroom"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  background-color: var(--bg-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(to right, var(--color-gray-50), var(--color-gray-100));
}

.hero-section h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary);
}

/* Mission Section */
.mission-section {
  padding: 8rem 0;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.mission-content h2 {
  margin-bottom: 2rem;
}

.values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.value-item {
  text-align: center;
}

.value-item i {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.mission-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Process Section */
.process-section {
  padding: 8rem 0;
  background-color: var(--bg-secondary);
}

.process-section h2 {
  text-align: center;
  margin-bottom: 4rem;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.process-step {
  text-align: center;
  padding: 2rem;
}

.step-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-primary);
  opacity: 0.2;
}

/* Team Section */
.team-section {
  padding: 8rem 0;
}

.team-section h2 {
  text-align: center;
  margin-bottom: 4rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.team-member {
  text-align: center;
}

.team-member img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  object-fit: cover;
}

/* Contact Section */
.contact-section {
  padding: 8rem 0;
  background-color: var(--bg-secondary);
}

.contact-section h2 {
  text-align: center;
  margin-bottom: 4rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.contact-item i {
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-right: 1.5rem;
}

.contact-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

/* Responsive Design */
@media (max-width: 968px) {
  .mission-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .values {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: 1fr;
  }

  .hero-section h1 {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }
}
</style>
