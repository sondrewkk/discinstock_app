<template>
  <div class="container py-3">
    <div class="punshline p-3 pb-md-4 mx-auto text-center">
      <p class="fs-5 text-muted">
        Sjekk om disken finnes på lager i en av nettbutikkene i Norge!
      </p>
    </div>
    
    <div class="d-flex flex-column justify-content-center">
      <SearchBar
        v-model:searchBarInput="discName"
        class="mb-4 w-75 mx-auto"
        @clearInput="discName = ''"
      />
      <SearchFilterButton
        v-model:retailerFilter="retailerFilter" 
        v-model:brandFilter="brandFilter"
        class="mx-auto"
      />
    </div>

    <div class="row justify-content-center">
      <SearchResults 
        :disc-name="discName" 
        :retailer-filter="retailerFilter"
        :brand-filter="brandFilter"
      />
    </div>
  </div>
</template>

<script>

import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
import SearchFilterButton from '@/components/SearchFilterButton'
import { onBeforeMount, ref } from 'vue'
import useRouteQuery from '@/composables/useRouteQuery'

export default {
  name: 'Home',
  components: {
    SearchBar,
    SearchResults,
    SearchFilterButton,
  },
  setup(){   
    const discName = ref("")
    const retailerFilter = ref([])
    const brandFilter = ref([])

    const { getRouteQuery } = useRouteQuery(discName)
    onBeforeMount(() => discName.value = getRouteQuery())

    return {
      discName,
      retailerFilter,
      brandFilter,
    }
  },
}
</script>

<style scoped>
  .punshline {
    max-width: 700px;
  }
  
</style>
