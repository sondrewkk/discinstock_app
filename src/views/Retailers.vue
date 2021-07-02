<template>
  <div class="container-fluid">
    <div class="d-flex flex-column align-items-center retailers mx-auto mt-5">
      <div
        v-for="retailer in retailers" 
        :key="retailer.name" 
        class="mb-5"
      >
        <a :href="retailer.link">
          <img 
            class="img-fluid" 
            :src="retailer.logo"
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { fetchRetailers } from '@/api/retailers'

export default {
  name: 'Retailers',
  setup() {
    const retailers = ref([])
    const getRetailers = async () => {
      retailers.value = await fetchRetailers()
    }
    
    onMounted(() => getRetailers())

    return {
      retailers
    }
  }
}
</script>

<style scoped>
  .retailers {
    max-width: 75%;
  }
</style>
