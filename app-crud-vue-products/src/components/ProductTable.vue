<template>
  <div>
    <div class="mb-3">
      <input 
        v-model="searchQuery" 
        type="text" 
        class="form-control" 
        placeholder="Buscar por nombre o categoría..."
      />
    </div>

    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Nombre</th><th>Precio</th><th>Descripción</th><th>Categoría</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in filteredProducts" :key="p.id">
          <td>{{p.title}}</td>
          <td>{{p.price}}</td>
          <td>{{p.description}}</td>
          <td>{{p.category}}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="$emit('edit',p.id)">Editar</button>
            <button class="btn btn-danger btn-sm ms-2" @click="$emit('delete',p.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="filteredProducts.length === 0">
          <td colspan="5" class="text-center">No se encontraron productos.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['products'],
  data() {
    return {
      searchQuery: '' 
    }
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase().trim();
      
      return this.products.filter(p => {
        return (
          p.title.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query)
        );
      });
    }
  }
}
</script>