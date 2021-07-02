<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid border-bottom py-2">
      <a 
        class="navbar-brand me-5" 
        href="/"
      >
        <img 
          src="@/assets/discinstock_logo.svg" 
          height="60"
        >
      </a>
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNavAltMarkup" 
        aria-controls="navbarNavAltMarkup" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div 
        id="navbarNavAltMarkup"
        class="collapse navbar-collapse" 
      >
        <div class="navbar-nav">
          <router-link 
            v-for="route in routes" 
            :key="route.name" 
            class="nav-link" 
            active-class="active"
            :to="route.path"
          >
            {{ route.name }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const routes = router.getRoutes()
    
    // Remove 404 route
    routes.pop()

    return {
      routes
    }
  },
}
</script>
