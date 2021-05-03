<template>

  <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
    <div v-for="disc in discs" :key="disc._id" class="col">
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
 import { ref, onMounted, watch, toRefs } from 'vue'
 import { fetchDiscs, searchDiscs } from '@/api/discs'
 import DiscCard from './DiscCard'

export default {
  name: "SearchResults",
  components: {
    DiscCard
  },
  props: {
    searchQuery: String
  },
  setup(props) {
    const { searchQuery } = toRefs(props)

    const discs = ref([])
    const getDiscs = async () => {
      discs.value = await fetchDiscs()
    }

    const getDiscsByName = async () => {
      console.log(`Searching for ${searchQuery.value}`)
      discs.value = await searchDiscs(searchQuery.value)
    }

    onMounted(getDiscs)

    watch(searchQuery, getDiscsByName)

    return {
      discs,
      getDiscs,
    }
  }
}
</script>

<style>

</style>
