<template>
  <div class="container py-3">
    <header class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <a href="/">
        <img 
          src="@/assets/discinstock_logo.svg" 
          height="60"
        >
      </a>
    </header>

    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
      <p class="fs-5 text-muted">
        Sjekk om disken finnes på lager i en av nettbutikkene i Norge!
      </p>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-6">
        <SearchBar
          type="text"
          :start-query="startQuery"
          @search="searchQuery = $event"
        />
      </div> 

      <SearchResults :search-query="searchQuery" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

export default {
  name: 'Home',
  components: {
    SearchBar,
    SearchResults
  },
  setup() {
    const route = useRoute()
    const startQuery = ref("")
    
    if("name" in route.query){
      startQuery.value = route.query.name
    }

    const searchQuery = ref(startQuery.value)

    return {
      searchQuery,
      startQuery
    }
  }
}
</script>
