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

  <footer class="bg-dark text-center text-white mt-5">
    <div class="container p-4 pb-0">
      <section class="mb-4">
        <!-- Facebook -->
        <a 
          class="link-secondary" 
          href="https://www.facebook.com/discinstock"
        >
          <p class="h4 mb-2"> 
            <BIconFacebook /> 
          </p>
        </a>
      </section>
    </div>

    <div 
      class="text-center p-3" 
      style="background-color: rgba(0, 0, 0, 0.2);"
    >
      © 2021 Copyright:
      <a 
        class="text-white" 
        href="https://discinstock.no/"
      >
        Discinstock.no
      </a>
    </div>
  </footer>
</template>

<script>
import { useRouter } from 'vue-router'
import { BIconFacebook } from 'bootstrap-icons-vue'

export default {
  name: 'App',
  components: {
    BIconFacebook
  },
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
