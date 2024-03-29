<template>
  <div class="container pt-3">
    <div class="punshline p-3 pb-md-4 mx-auto text-center">
      <p class="fs-5 text-muted">
        Sjekk om disken finnes på lager i en av nettbutikkene i Norge!
      </p>
    </div>
    
    <SearchBar
      v-model:searchBarInput="discName"
      placeholder="Disk navn"
      class="mx-auto"
      @clearInput="discName = ''"
    />

    <div class="d-flex mt-5 pt-sm-3 pt-lg-4">
      <div class="mb-2 mx-auto">
        <SearchFilterButton
          v-model:retailerFilter="retailerFilter" 
          v-model:brandFilter="brandFilter"
          v-model:priceRangeFilter="priceRangeFilter"
          v-model:speedRangeFilter="speedRangeFilter"
          v-model:glideRangeFilter="glideRangeFilter"
          v-model:turnRangeFilter="turnRangeFilter"
          v-model:fadeRangeFilter="fadeRangeFilter"
          @click="onFilterButtonClicked"
          @clearFilter="onClearFilter"
          @flightSpecChanged="onFlightSpecChanged"
        />
      </div>
    </div>

    <div class="d-flex mb-2 justify-content-sm-center justify-content-lg-end">
      <div class="flex-fill mx-3 flex-sm-grow-0">
        <SearchResultSortSelect         
          v-model:sortMode="sortMode"
          v-model:selected="sortOptionSelected"
          :sort-options="sortOptions"
          @change="onSortChange"
        />
      </div>
    </div>

    <div class="row justify-content-center remove-top-gutter">
      <SearchResults 
        class="gy-4"
        :disc-name="discName" 
        :retailer-filter="retailerFilter"
        :brand-filter="brandFilter"
        :price-range-filter="priceRangeFilter"
        :speed-range-filter="speedRangeFilter"
        :glide-range-filter="glideRangeFilter"
        :turn-range-filter="turnRangeFilter"
        :fade-range-filter="fadeRangeFilter"
        :flight-spec-changed="flightSpecChanged"
        :result-view-reset-trigger="resetViewState"
        :sort-discs-by="sortOptionSelected"
        :sort-mode="sortMode"
      />
    </div> 
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import SearchResults from '@/components/SearchResults.vue'
import SearchFilterButton from '@/components/SearchFilterButton.vue'
import SearchResultSortSelect from '@/components/SearchResultSortSelect.vue'
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
    const priceRangeFilter = ref([0, 500])
    const speedRangeFilter = ref([1, 15])
    const glideRangeFilter = ref([1, 7])
    const turnRangeFilter = ref([-5, 1])
    const fadeRangeFilter = ref([0, 6])
    
    const flightSpecChanged = ref(false)
    const resetViewState = ref(false)
    const { getRouteQuery } = useRouteQuery(discName, retailerFilter)
    let query = getRouteQuery()

    const sortOptionSelected = ref(query.name === undefined ? "random": "discname")
    const sortMode = ref(1)
    const sortOptions = ref([
      { text: "Tilfeldig", value: "random" },
      { text: "Disk navn", value: "discname" },
      { text: "Butikk", value: "retailer" },
      { text: "Pris", value: "price" },
      { text: "Sist oppdatert", value: "updated" },
    ])
    
    const onFilterButtonClicked = () => {
      resetViewState.value = !resetViewState.value
    }

    const onClearFilter = () => {
      resetViewState.value = !resetViewState.value
    }

    const onSortChange = () => {
      resetViewState.value = !resetViewState.value
    }

    const onFlightSpecChanged = (val) => {
      flightSpecChanged.value = val
    }

    // Set default values used when discs is filtered from first load
    onBeforeMount(() => {
      if(query.name){
        discName.value = query.name
      }

      if(query.retailer){
        if(Array.isArray(query.retailer)){
          retailerFilter.value = [...query.retailer]
        } else {
          retailerFilter.value.push(query.retailer)
        }
        
      }
    })

    return {
      discName,
      retailerFilter,
      brandFilter,
      priceRangeFilter,
      speedRangeFilter,
      glideRangeFilter,
      turnRangeFilter,
      fadeRangeFilter,
      resetViewState,
      sortOptions,
      sortMode,
      sortOptionSelected,
      flightSpecChanged,
      onFilterButtonClicked,
      onClearFilter,
      onSortChange,
      onFlightSpecChanged,
    }
  },
}
</script>

<style scoped>
  .punshline {
    max-width: 700px;
  }

  .remove-top-gutter {
    margin-top: -3rem !important;
  }
  
</style>
