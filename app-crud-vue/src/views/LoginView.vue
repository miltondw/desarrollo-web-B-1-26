<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div class="col-md-5">
      <div class="card border-0 shadow-lg" style="border-radius: 15px;">
        <div class="card-body p-5">
          <div class="text-center mb-4">
            <div class="mb-3" style="font-size: 3rem;">
              <i class="bi bi-shield-lock text-primary"></i>
            </div>
            <h2 class="card-title fw-bold text-primary">Iniciar Sesión</h2>
            <p class="text-muted">Gestión de Productos</p>
          </div>

          <form @submit.prevent="iniciarSesion">
            <div class="mb-4">
              <label class="form-label fw-600 text-dark">
                <i class="bi bi-person-circle"></i> Usuario
              </label>
              <input
                v-model="username"
                class="form-control form-control-lg"
                placeholder="admin"
                style="border-radius: 10px; border: 2px solid #e9ecef;"
                required
              />
            </div>

            <div class="mb-4">
              <label class="form-label fw-600 text-dark">
                <i class="bi bi-key-fill"></i> Contraseña
              </label>
              <input
                type="password"
                v-model="password"
                class="form-control form-control-lg"
                placeholder="••••••••"
                style="border-radius: 10px; border: 2px solid #e9ecef;"
                required
              />
            </div>

            <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert" style="border-radius: 10px;">
              <i class="bi bi-exclamation-triangle-fill"></i> {{ error }}
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100 fw-bold" style="border-radius: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">
              <i class="bi bi-box-arrow-in-right"></i> Entrar
            </button>
          </form>

          <div class="text-center mt-4">
            <small class="text-muted">Usa: admin / admin</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async iniciarSesion() {
      this.error = ''
      try {
        const url = new URL('../assets/usuarios.json', import.meta.url)
        const res = await fetch(url)
        const usuarios = await res.json()
        const encontrado = usuarios.find(u => u.username === this.username && u.password === this.password)
        if (encontrado) {
          localStorage.setItem('user', JSON.stringify({ username: encontrado.username }))
          this.$router.push('/dashboard')
        } else {
          this.error = 'Usuario o contraseña incorrectos'
        }
      } catch (e) {
        this.error = 'Error cargando usuarios'
      }
    }
  }
}
</script>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}

.fw-600 {
  font-weight: 600;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
}
</style>
