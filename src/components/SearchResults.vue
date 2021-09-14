<template>
  <div 
    v-if="discs.length > 0"
    ref="resultsComponent"
    class="row row-cols-2 row-cols-md-3 row-cols-lg-4"  
  >
    <div 
      v-for="disc in discs" 
      :key="disc._id" 
      class="col"
    >
      <DiscCard 
        :name="disc.name"
        :image="disc.image"
        :url="disc.url"
        :retailer="disc.retailer"
        :price="disc.price"
        :brand="disc.brand"
        :speed="disc.speed"
        :glide="disc.glide"
        :turn="disc.turn"
        :fade="disc.fade"
        :last-updated="new Date(disc.last_updated)"
      />
    </div>
  </div> 
  <div 
    v-else
    class="d-flex flex-column align-items-center mt-5 pt-5"
  >
    <div 
      v-if="loading" 
      class="spinner-border spinner-border-lg text-secondary" 
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <span 
      v-else 
      class="fs-4 mt-4"
    >
      Fant dessverre ingen disker
    </span>
  </div>
</template>

<script>
 import { toRefs, ref } from 'vue'
 import useDiscs from '@/composables/useDiscs'
 import useDiscNameSearch from '@/composables/useDiscNameSearch'
 import useDiscsAutoScroll from '@/composables/useDiscsAutoScroll'
 import useDiscFilters from '@/composables/useDiscFilters'
 import useDiscSort from '@/composables/useDiscSort'
 import DiscCard from './DiscCard'

export default {
  name: "SearchResults",
  components: {
    DiscCard,
  },
  props: {
    discName: {
      type: String,
      default: ""
    },
    retailerFilter: {
      type: Array,
      required: true,
      default: () => []
    },
    brandFilter: {
      type: Array,
      required: true,
      default: () => []
    },
    priceRangeFilter: {
      type: Array,
      required: true,
      default: () => [],
    },
    resultViewResetTrigger: {
      type: Boolean,
      required: true
    },
    sortDiscsBy: {
      type: String,
      required: true,
    },
    sortMode: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { 
      discName, 
      retailerFilter, 
      brandFilter, 
      priceRangeFilter, 
      resultViewResetTrigger, 
      sortDiscsBy, 
      sortMode 
    } = toRefs(props)

    const loading = ref(true)

    const resultsComponent = ref(null)
    const { discs } = useDiscs(loading)
    const { discsMatchingNameSearch } = useDiscNameSearch(discName, discs)
    const { discsFiltered } = useDiscFilters(retailerFilter, brandFilter, priceRangeFilter, discsMatchingNameSearch)
    const { discsSorted } = useDiscSort(sortDiscsBy, sortMode, discsFiltered)
    const { discVisibleWithScroll } = useDiscsAutoScroll(resultsComponent, resultViewResetTrigger, discsSorted)

    return {
      loading,
      discs: discVisibleWithScroll,
      resultsComponent,
    }
  }
}
</script>
