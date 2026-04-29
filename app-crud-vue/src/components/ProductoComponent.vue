<template>
  <div class="card border-0 shadow-sm" style="border-radius: 15px;">
    <div class="card-header bg-gradient" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px 15px 0 0; color: white; padding: 1.5rem;">
      <h4 class="mb-0"><i class="bi bi-box-seam"></i> Gestión de Productos</h4>
    </div>

    <div class="card-body p-4">
      <form @submit.prevent="agregarProducto" class="mb-4">
        <div class="row g-3 mb-3">
          <div class="col-md-5">
            <label class="form-label fw-600"><i class="bi bi-tag-fill"></i> Nombre del Producto</label>
            <input
              v-model="nombre"
              class="form-control form-control-lg"
              placeholder="Ej: Laptop, Mouse..."
              style="border-radius: 10px; border: 2px solid #e9ecef;"
              required
            />
          </div>
          <div class="col-md-4">
            <label class="form-label fw-600"><i class="bi bi-cash-coin"></i> Precio</label>
            <input
              v-model.number="precio"
              type="number"
              step="0.01"
              class="form-control form-control-lg"
              placeholder="0.00"
              style="border-radius: 10px; border: 2px solid #e9ecef;"
              required
            />
          </div>
          <div class="col-md-3 d-flex align-items-end">
            <button type="submit" class="btn btn-success btn-lg w-100" style="border-radius: 10px; background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); border: none; color: white;">
              <i class="bi bi-plus-circle-fill"></i> Agregar
            </button>
          </div>
        </div>
      </form>

      <div v-if="productos.length === 0" class="alert alert-info text-center py-4" style="border-radius: 10px; border: 2px dashed #0d6efd;">
        <i class="bi bi-inbox" style="font-size: 2rem;"></i>
        <p class="mb-0 mt-2">No hay productos. ¡Agrega uno para comenzar!</p>
      </div>

      <div v-else class="table-responsive">
        <table class="table table-hover" style="border-collapse: collapse;">
          <thead style="background: #f8f9fa;">
            <tr>
              <th style="border: none; padding: 1rem; font-weight: 600; color: #495057;"><i class="bi bi-hash"></i> ID</th>
              <th style="border: none; padding: 1rem; font-weight: 600; color: #495057;"><i class="bi bi-tag"></i> Nombre</th>
              <th style="border: none; padding: 1rem; font-weight: 600; color: #495057;"><i class="bi bi-currency-dollar"></i> Precio</th>
              <th style="border: none; padding: 1rem; font-weight: 600; color: #495057; text-align: center;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in productos" :key="p.id" style="border-bottom: 1px solid #e9ecef; transition: background 0.2s;">
              <td style="padding: 1rem; color: #6c757d;"><code>{{ p.id }}</code></td>
              <td style="padding: 1rem; font-weight: 500; color: #212529;">{{ p.nombre }}</td>
              <td style="padding: 1rem; color: #198754; font-weight: 600;">${{ p.precio.toFixed(2) }}</td>
              <td style="padding: 1rem; text-align: center;">
                <button class="btn btn-sm btn-warning me-2" @click="abrirEdicion(p)" style="border-radius: 8px;">
                  <i class="bi bi-pencil-square"></i> Editar
                </button>
                <button class="btn btn-sm btn-danger" @click="confirmarEliminacion(p)" style="border-radius: 8px;">
                  <i class="bi bi-trash-fill"></i> Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div v-if="showEditModal" class="modal-overlay">
    <div class="modal-backdrop fade show"></div>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content shadow-lg" style="border-radius: 15px; border: none;">
          <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 15px 15px 0 0; border: none;">
            <h5 class="modal-title fw-bold"><i class="bi bi-pencil-square"></i> Editar Producto</h5>
            <button type="button" class="btn-close btn-close-white" @click="showEditModal = false"></button>
          </div>
          <div class="modal-body p-4">
            <div class="mb-4">
              <label class="form-label fw-600">Nombre</label>
              <input v-model="tempProducto.nombre" class="form-control form-control-lg" style="border-radius: 10px; border: 2px solid #e9ecef;" />
            </div>
            <div class="mb-4">
              <label class="form-label fw-600">Precio</label>
              <input v-model.number="tempProducto.precio" type="number" step="0.01" class="form-control form-control-lg" style="border-radius: 10px; border: 2px solid #e9ecef;" />
            </div>
          </div>
          <div class="modal-footer" style="border-top: 1px solid #e9ecef;">
            <button type="button" class="btn btn-secondary" @click="showEditModal = false" style="border-radius: 8px;">
              <i class="bi bi-x-circle"></i> Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="actualizarProducto" style="border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">
              <i class="bi bi-check-circle-fill"></i> Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showDeleteModal" class="modal-overlay">
    <div class="modal-backdrop fade show"></div>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content shadow-lg" style="border-radius: 15px; border: none;">
          <div class="modal-header" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); color: white; border-radius: 15px 15px 0 0; border: none;">
            <h5 class="modal-title fw-bold"><i class="bi bi-exclamation-triangle-fill"></i> ¿Eliminar Producto?</h5>
            <button type="button" class="btn-close btn-close-white" @click="showDeleteModal = false"></button>
          </div>
          <div class="modal-body text-center py-5">
            <div style="font-size: 3rem; margin-bottom: 1rem;">
              <i class="bi bi-trash-fill text-danger"></i>
            </div>
            <p class="mb-2">¿Estás seguro de que deseas eliminar?</p>
            <p><strong style="color: #212529; font-size: 1.1rem;">{{ tempProducto.nombre }}</strong></p>
            <small class="text-muted">Esta acción no se puede deshacer.</small>
          </div>
          <div class="modal-footer" style="border-top: 1px solid #e9ecef;">
            <button type="button" class="btn btn-light" @click="showDeleteModal = false" style="border-radius: 8px;">
              <i class="bi bi-x-circle"></i> Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="ejecutarEliminacion" style="border-radius: 8px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); border: none;">
              <i class="bi bi-check-circle-fill"></i> Sí, Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductoComponent',
  data() {
    return {
      nombre: '',
      precio: 0,
      productos: [],
      showEditModal: false,
      showDeleteModal: false,
      tempProducto: { id: null, nombre: '', precio: 0 }
    }
  },
  mounted() {
    this.cargar()
  },
  methods: {
    cargar() {
      const raw = localStorage.getItem('productos')
      this.productos = raw ? JSON.parse(raw) : []
    },
    guardar() {
      localStorage.setItem('productos', JSON.stringify(this.productos))
    },
    agregarProducto() {
      const id = Date.now()
      this.productos.push({ id, nombre: this.nombre, precio: this.precio })
      this.guardar()
      this.nombre = ''
      this.precio = 0
    },
    abrirEdicion(producto) {
      this.tempProducto = { ...producto }
      this.showEditModal = true
    },
    actualizarProducto() {
      const indice = this.productos.findIndex(p => p.id === this.tempProducto.id)
      if (indice !== -1) {
        this.productos[indice] = { ...this.tempProducto }
        this.guardar()
      }
      this.showEditModal = false
    },
    confirmarEliminacion(producto) {
      this.tempProducto = { ...producto }
      this.showDeleteModal = true
    },
    ejecutarEliminacion() {
      this.productos = this.productos.filter(p => p.id !== this.tempProducto.id)
      this.guardar()
      this.showDeleteModal = false
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal {
  background: transparent;
  z-index: 1050;
  display: block;
}

.table-hover tbody tr:hover {
  background-color: #f1f3f5 !important;
  transition: background-color 0.2s ease;
}

.form-control:focus,
.form-control-lg:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.fw-600 {
  font-weight: 600;
}

.btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>