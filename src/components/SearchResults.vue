<template>
  <div 
    ref="resultsComponent"
    class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 mb-3"  
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
    }
  },
  setup(props) {
    const { discName } = toRefs(props)
    const resultsComponent = ref(null)

    const { discs } = useDiscs()
    const { discsMatchingNameSearch } = useDiscNameSearch(discName, discs)
    const { discVisibleWithScroll } = useDiscsAutoScroll(resultsComponent, discsMatchingNameSearch)

    return {
      discs: discVisibleWithScroll,
      resultsComponent,
    }
  }
}
</script>
