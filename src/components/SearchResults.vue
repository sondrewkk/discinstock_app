<template>
  <div 
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
      />
    </div>
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
    const { discName, retailerFilter, brandFilter, resultViewResetTrigger, sortDiscsBy, sortMode } = toRefs(props)
    const resultsComponent = ref(null)

    const { discs } = useDiscs()
    const { discsMatchingNameSearch } = useDiscNameSearch(discName, discs)
    const { discsFiltered } = useDiscFilters(retailerFilter, brandFilter, discsMatchingNameSearch)
    const { discsSorted } = useDiscSort(sortDiscsBy, sortMode, discsFiltered)
    const { discVisibleWithScroll } = useDiscsAutoScroll(resultsComponent, resultViewResetTrigger, discsSorted)

    return {
      discs: discVisibleWithScroll,
      resultsComponent,
    }
  }
}
</script>
