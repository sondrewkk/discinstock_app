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
          @click="onFilterButtonClicked"
          @clearFilter="onClearFilter"
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
        :result-view-reset-trigger="resetViewState"
        :sort-discs-by="sortOptionSelected"
        :sort-mode="sortMode"
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
    const priceRangeFilter = ref([0, 500])
    const resetViewState = ref(false)
    const { getRouteQuery } = useRouteQuery(discName)
    const sortOptionSelected = ref(getRouteQuery() === "" ? "random": "discname")
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
      retailerFilter.value = []
      brandFilter.value = []
      priceRangeFilter.value = [0, 500]
      resetViewState.value = !resetViewState.value
    }

    const onSortChange = () => {
      resetViewState.value = !resetViewState.value
    }

    onBeforeMount(() => discName.value = getRouteQuery())

    return {
      discName,
      retailerFilter,
      brandFilter,
      priceRangeFilter,
      resetViewState,
      sortOptions,
      sortMode,
      sortOptionSelected,
      onFilterButtonClicked,
      onClearFilter,
      onSortChange,
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
