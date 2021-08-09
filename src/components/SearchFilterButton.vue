<template>
  <div>
    <button 
      class="btn btn-secondary text-nowrap"
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

      <div class="d-flex flex-column offcanvas-body">
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
                class="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseBrand" 
                aria-expanded="false" 
                aria-controls="collapseBrand"
              >
                Merke
              </button>
            </h2>
            <div 
              id="collapseBrand" 
              class="accordion-collapse collapse" 
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

          <!-- Price -->
          <div class="my-5 pt-5 mx-4">
            <PriceRange 
              v-model:priceRange="selectedPriceRange" 
              @priceChange="$emit('update:priceRangeFilter', selectedPriceRange)" 
            />
          </div>
        </div>

        <!-- Reset filter button -->
        <button 
          class="btn btn-warning mx-auto mt-3" 
          type="button"
          @click="clearFilter"
        >
          Nullstill
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, onBeforeMount } from 'vue'
import { fetchRetailers } from '@/api/retailers'
import { fetchBrands } from '@/api/brands'
import PriceRange from '@/components/PriceRange'

export default {
  components: {
    PriceRange
  },
  props: {
    retailerFilter: {
      type: Array,
      default: () => []
    },
    brandsFilter: {
      type: Array,
      default: () => []
    },
    priceRangeFilter: {
      type: Array,
      default: () => [],
    }
  },
  emits: ["clicked", "clearFilter", "update:retailerFilter", "update:brandFilter", "update:priceRangeFilter"],
  setup(props, { emit }) {
    const { priceRangeFilter } = toRefs(props)

    const retailersList = ref([])
    const checkedRetailers = ref([])
    const brandsList = ref([])
    const checkedBrands = ref([])
    const selectedPriceRange = ref(priceRangeFilter.value)

    const getRetailers = async () => {
      retailersList.value = await fetchRetailers()
    }

    const getBrands = async () => {
      brandsList.value = await fetchBrands()
    }

    const clearFilter = () => {
      checkedRetailers.value = []
      checkedBrands.value = []
      selectedPriceRange.value = [0, 500]
      emit("clearFilter")
    }

    onBeforeMount(getRetailers)
    onBeforeMount(getBrands)

    return {
      retailersList,
      checkedRetailers,
      brandsList,
      checkedBrands,
      selectedPriceRange,
      clearFilter,
    }
  },
}
</script>
