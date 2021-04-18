<template>

  <div v-if="!loading" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
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
 import { ref, onMounted } from 'vue'
 import { fetchDiscs } from '@/api/discs'
 import DiscCard from './DiscCard'

export default {
  name: "SearchResults",
  components: {
    DiscCard
  },
  props: {
    searchQuery: String
  },
  setup() {
    const discs = ref([])
    const loading = ref(true)
    const getDiscs = async () => {
      loading.value = true
      discs.value = await fetchDiscs()
      loading.value = false
    }

    onMounted(getDiscs)

    return {
      discs,
      loading,
      getDiscs
    }
  }
}
</script>

<style>

</style>
