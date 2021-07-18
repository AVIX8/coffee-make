<template>
  <!-- <transition name="load"> -->
  <div v-if="loading" class="loading-page">
    <div class="loading"></div>
  </div>
  <!-- </transition> -->
</template>
<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
<style scoped>
.loading-page {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 100%;
  width: 100%;
  text-align: center;
  background: white;
  z-index: 1000;
}
.loading {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 4px solid rgba(9, 133, 81, 0.705);
  border-radius: 50%;
  border-top-color: #158876;
  animation: spin 1s ease-in-out infinite;
}
.load-enter-active {
  transition: all 0;
}
.load-leave-active {
  transition: all 0.8s;
}
.load-enter,
.load-leave-to {
  opacity: 0;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
