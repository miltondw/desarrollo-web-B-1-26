<template>
  <div>
    <div class="bg-white shadow-sm p-3 rounded-3 mb-4" style="border-top: 4px solid #667eea;">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h2 class="mb-1 fw-bold text-primary"><i class="bi bi-speedometer2"></i> Dashboard</h2>
          <p class="text-muted mb-0">Bienvenido, <strong>{{ usuarioActual }}</strong></p>
        </div>
        <button class="btn btn-danger" @click="cerrarSesion">
          <i class="bi bi-box-arrow-right"></i> Cerrar sesión
        </button>
      </div>
    </div>

    <producto-component />
  </div>
</template>

<script>
import ProductoComponent from '../components/ProductoComponent.vue'

export default {
  name: 'DashboardView',
  components: { ProductoComponent },
  data() {
    return {
      usuarioActual: ''
    }
  },
  created() {
    const user = localStorage.getItem('user')
    if (!user) this.$router.push('/login')
    else {
      const userData = JSON.parse(user)
      this.usuarioActual = userData.username
    }
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>
