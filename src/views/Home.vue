<template>
  <div class="container py-3">
    <div class="punshline p-3 pb-md-4 mx-auto text-center">
      <p class="fs-5 text-muted">
        Sjekk om disken finnes på lager i en av nettbutikkene i Norge!
      </p>
    </div>
    
    <SearchBar
      v-model:searchBarInput="discName"
      placeholder="Disk navn"
      class="mx-auto mb-5 pb-md-4"
      @clearInput="discName = ''"
    />

    <div class="d-flex flex-column flex-md-row mx-3 pt-4 pt-md-5">
      <div class="mx-auto mb-2 mx-md-5 ps-md-3">
        <SearchFilterButton
          v-model:retailerFilter="retailerFilter" 
          v-model:brandFilter="brandFilter"
          @click="onFilterButtonClicked"
          @clearFilter="onClearFilter"
        />
      </div>
      <div class="sort-select flex-md-fill mb-2 ms-md-5">
        <SearchResultSortSelect         
          v-model:sortMode="sortMode"
          v-model:selected="sortOptionSelected"
          :sort-options="sortOptions"
        />
      </div>
    </div>

    <div class="row justify-content-center negmargin">
      <SearchResults 
        class="gy-4"
        :disc-name="discName" 
        :retailer-filter="retailerFilter"
        :brand-filter="brandFilter"
        :result-view-reset-trigger="resetViewState"
      />
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
import SearchFilterButton from '@/components/SearchFilterButton'
import SearchResultSortSelect from '@/components/SearchResultSortSelect'
import { onBeforeMount, ref } from 'vue'
import useRouteQuery from '@/composables/useRouteQuery'

export default {
  name: 'Home',
  components: {
    SearchBar,
    SearchResults,
    SearchFilterButton,
    SearchResultSortSelect,
  },
  setup(){   
    const discName = ref("")
    const retailerFilter = ref([])
    const brandFilter = ref([])
    const resetViewState = ref(false)
    const sortOptionSelected = ref("random")
    const sortMode = ref(1)
    const sortOptions = ref([
      { text: "Tilfeldig", value: "random" },
      { text: "Disk navn", value: "discname"},
      { text: "Butikk", value: "retailer" },
      { text: "Merke", value: "brand" },
    ])
    
    const { getRouteQuery } = useRouteQuery(discName)
    
    const onFilterButtonClicked = () => {
      resetViewState.value = !resetViewState.value
    }

    const onClearFilter = () => {
      retailerFilter.value = []
      brandFilter.value = []
      resetViewState.value = !resetViewState.value
    }

    onBeforeMount(() => discName.value = getRouteQuery())

    return {
      discName,
      retailerFilter,
      brandFilter,
      resetViewState,
      sortOptions,
      sortMode,
      sortOptionSelected,
      onFilterButtonClicked,
      onClearFilter,
    }
  },
}
</script>

<style scoped>
  .punshline {
    max-width: 700px;
  }

  .negmargin {
    margin-top: -3rem !important;
  }

  .sort-select {
    min-width: 40%;
  }
  
</style>
