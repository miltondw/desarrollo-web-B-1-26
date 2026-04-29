<template>
  <div style="min-height: 100vh; background: #f5f7fa;">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f5f7fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

html, body, #app {
  height: 100%;
}

#app {
  background: #f5f7fa;
}

.container {
  padding: 2rem 1rem;
}

.fw-600 {
  font-weight: 600;
}

button {
  cursor: pointer;
  transition: all 0.3s ease;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
