<template>
  <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 mb-3">
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

  <button 
    v-if="showMore"
    type="button" 
    class="btn btn-outline-secondary w-25"
    @click="getDiscs" 
  >
    Vis mer
  </button>
</template>

<script>
 import { ref, onMounted, watch, toRefs } from 'vue'
 import { fetchDiscs, searchDiscs } from '@/api/discs'
 import DiscCard from './DiscCard'

export default {
  name: "SearchResults",
  components: {
    DiscCard,
  },
  props: {
    searchQuery: {
      type: String,
      default: ""
    },
  },
  setup(props) {
    const { searchQuery } = toRefs(props)

    let skip = ref(0)
    let limit = ref(20)
    let showMore = ref(false)

    const discs = ref([])
    const getDiscs = async () => {
      const response = await fetchDiscs(skip.value, limit.value)
      response.data.map(disc => discs.value.push(disc))
      
      if(response.pagination["next"] != null){ 
        console.log("Has pagination")
        showMore.value = true

        const params = new URL(response.pagination["next"]).searchParams
        skip.value += parseInt(params.get("limit"))   
      }
      else {
        showMore.value = true
      }
    }

    const getDiscsByName = async () => {
      showMore.value = false
      discs.value = await searchDiscs(searchQuery.value)
    }

    onMounted(getDiscs)

    watch(searchQuery, getDiscsByName)

    return {
      discs,
      getDiscs,
      showMore,
    }
  }
}
</script>

<style>

</style>
