<template>
  <div class="d-flex">
    <button 
      class="btn btn-secondary"
      type="button"
      data-bs-toggle="offcanvas" 
      data-bs-target="#filterMenu" 
      aria-controls="filterMenu"
      @click="$emit('clicked')"
    >
      Vis filter
    </button>  

    <!-- Offcanvas menu -->
    <div 
      id="filterMenu"
      class="offcanvas offcanvas-start" 
      tabindex="-1"  
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <h5 
          id="filterMenuTitle"
          class="offcanvas-title"  
        >
          Filter
        </h5>
        <button 
          type="button" 
          class="btn-close text-reset" 
          data-bs-dismiss="offcanvas" 
          aria-label="Close"
        />
      </div>

      <div class="offcanvas-body">
        <div 
          id="filterMenuOptions"
          class="accordion" 
        >
          <!-- Retailer -->
          <div class="accordion-item">
            <h2 
              id="reatilerHeader"
              class="accordion-header" 
            >
              <button 
                class="accordion-button" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseRetailer" 
                aria-expanded="true" 
                aria-controls="collapseRetailer"
              >
                Butikk
              </button>
            </h2>
            <div 
              id="collapseRetailer" 
              class="accordion-collapse collapse show" 
              aria-labelledby="reatilerHeader"
            >
              <div class="accordion-body">
                <div class="form-check">
                  <div 
                    v-for="retailer in retailersList" 
                    :key="retailer._id"
                  >
                    <input 
                      :id="retailer.name"
                      v-model="checkedRetailers"
                      class="form-check-input" 
                      type="checkbox"    
                      :value="retailer.name"
                      @change="$emit('update:retailerFilter', checkedRetailers)"              
                    >
                    <label 
                      class="form-check-label" 
                      :for="retailer.name"
                    >
                      {{ retailer.name.charAt(0).toUpperCase() + retailer.name.substring(1) }}
                    </label>
                  </div>
                </div>      
              </div>
            </div>
          </div>

          <!-- Brand -->
          <div class="accordion-item">
            <h2 
              id="brandHeader"
              class="accordion-header" 
            >
              <button 
                class="accordion-button" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseBrand" 
                aria-expanded="true" 
                aria-controls="collapseBrand"
              >
                Merke
              </button>
            </h2>
            <div 
              id="collapseBrand" 
              class="accordion-collapse collapse show" 
              aria-labelledby="brandHeader"
            >
              <div class="accordion-body">
                <div class="form-check">
                  <div 
                    v-for="brand in brandsList" 
                    :key="brand.name"
                  >
                    <input 
                      :id="brand.name"
                      v-model="checkedBrands"
                      class="form-check-input" 
                      type="checkbox"    
                      :value="brand.name"
                      @change="$emit('update:brandFilter', checkedBrands)"              
                    >
                    <label 
                      class="form-check-label" 
                      :for="brand.name"
                    >
                      {{ brand.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { fetchRetailers } from '@/api/retailers'
import { fetchBrands } from '@/api/brands'

export default {
  props: {
    retailerFilter: {
      type: Array,
      default: () => []
    },
    brandsFilter: {
      type: Array,
      default: () => []
    },
  },
  emits: ["clicked", "update:retailerFilter", "update:brandFilter"],
  setup() {
    const retailersList = ref([])
    const checkedRetailers = ref([])
    const brandsList = ref([])
    const checkedBrands = ref([])

    const getRetailers = async () => {
      retailersList.value = await fetchRetailers()
    }

    const getBrands = async () => {
      brandsList.value = await fetchBrands()
    }

    onBeforeMount(getRetailers)
    onBeforeMount(getBrands)

    return {
      retailersList,
      checkedRetailers,
      brandsList,
      checkedBrands,
    }
  },
}
</script>

<style scoped>
  .btn {
    box-shadow: none !important;
    outline: none !important;
  }
</style>
