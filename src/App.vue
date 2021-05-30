<template>
  <div class="container py-3">
    <header class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <a href=""><img src="@/assets/discinstock_logo.png"></a>
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
          @search="searchQuery = $event"
        />
      </div> 

      <SearchResults :search-query="searchQuery" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
 import SearchBar from './components/SearchBar'
 import SearchResults from './components/SearchResults'

export default {
  name: 'App',
  components: {
     SearchBar,
     SearchResults
  },
  setup() {
     const searchQuery = ref("")

    return {
       searchQuery
    }
  }
}
</script>

<style>
  html {
    height: 100%;
  }

  body {
    background-image: linear-gradient(180deg, #eee, #fff 100px, #fff);
    height: 100%;
    margin: 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .container {
    max-width: 960px;
  }

  .pricing-header {
    max-width: 700px;
  }

  .search-bar {
    max-width: 700px;
  }

</style>
