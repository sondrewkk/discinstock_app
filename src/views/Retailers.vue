<template>
  <div class="container-fluid">
    <div class="d-flex flex-sm-column flex-md-row align-items-md-center justify-content-evenly flex-wrap">
      <div
        v-for="retailer in retailers" 
        :key="retailer.name" 
        class="m-5 p-2"
      >
        <a :href="retailer.link">
          <img 
            class="retailer-logo" 
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
  .retailer-logo {
    max-height: 300px;
    max-width: 350px;
  }
</style>
