<template>
  <div class="container py-3">
    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
      <p class="fs-5 text-muted">
        Sjekk om disken finnes på lager i en av nettbutikkene i Norge!
      </p>
    </div>
    
    <div>
      <SearchBar v-model:searchBarInput="discName" />
    </div>

    <div class="row justify-content-center">
      <SearchResults :disc-name="discName" />
    </div>
  </div>
</template>

<script>

import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
import { onBeforeMount, ref } from 'vue'
import useRouteQuery from '@/composables/useRouteQuery'

export default {
  name: 'Home',
  components: {
    SearchBar,
    SearchResults
  },
  setup(){
    const discName = ref("")
    const { getRouteQuery } = useRouteQuery(discName)

    onBeforeMount(() => discName.value = getRouteQuery())

    return {
      discName,
    }
  },
}
</script>

<style scoped>

  .pricing-header {
    max-width: 700px;
  }

  .search-bar {
    max-width: 700px;
  }

</style>
