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
                class="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseRetailer" 
                aria-expanded="false" 
                aria-controls="collapseRetailer"
              >
                Butikk
              </button>
            </h2>
            <div 
              id="collapseRetailer" 
              class="accordion-collapse collapse" 
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

          <!-- Speed -->
          <div class="accordion-item">
            <h2 
              id="speedHeader"
              class="accordion-header" 
            >
              <button 
                class="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseSpeed" 
                aria-expanded="false" 
                aria-controls="collapseSpeed"
              >
                Speed
              </button>
            </h2>
            <div 
              id="collapseSpeed" 
              class="accordion-collapse collapse" 
              aria-labelledby="speedHeader"
            >
              <div class="accordion-body">
                <FlightSpecPicker 
                  v-model:flightSpecRange="selectedSpeedRange"
                  @flightSpecChange="$emit('update:speedRangeFilter', selectedSpeedRange)"
                />
              </div>
            </div>
          </div>

          <!-- Glide -->
          <div class="accordion-item">
            <h2 
              id="glideHeader"
              class="accordion-header" 
            >
              <button 
                class="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseGlide" 
                aria-expanded="false" 
                aria-controls="collapseGlide"
              >
                Glide
              </button>
            </h2>
            <div 
              id="collapseGlide" 
              class="accordion-collapse collapse" 
              aria-labelledby="glideHeader"
            >
              <div class="accordion-body">
                <FlightSpecPicker 
                  v-model:flightSpecRange="selectedGlideRange"
                  @flightSpecChange="$emit('update:glideRangeFilter', selectedGlideRange)"
                />
              </div>
            </div>
          </div>

          <!-- Turn -->
          <div class="accordion-item">
            <h2 
              id="turnHeader"
              class="accordion-header" 
            >
              <button 
                class="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseTurn" 
                aria-expanded="false" 
                aria-controls="collapseTurn"
              >
                Turn
              </button>
            </h2>
            <div 
              id="collapseTurn" 
              class="accordion-collapse collapse" 
              aria-labelledby="turnHeader"
            >
              <div class="accordion-body">
                <FlightSpecPicker 
                  v-model:flightSpecRange="selectedTurnRange"
                  @flightSpecChange="$emit('update:turnRangeFilter', selectedTurnRange)"
                />
              </div>
            </div>
          </div>

          <!-- Fade -->
          <div class="accordion-item">
            <h2 
              id="fadeHeader"
              class="accordion-header" 
            >
              <button 
                class="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseFade" 
                aria-expanded="false" 
                aria-controls="collapseFade"
              >
                Fade
              </button>
            </h2>
            <div 
              id="collapseFade" 
              class="accordion-collapse collapse" 
              aria-labelledby="fadeHeader"
            >
              <div class="accordion-body">
                <FlightSpecPicker 
                  v-model:flightSpecRange="selectedFadeRange"
                  @flightSpecChange="$emit('update:fadeRangeFilter', selectedFadeRange)"
                />
              </div>
            </div>
          </div>

          <!-- Price -->
          <div class="accordion-item">
            <h2 
              id="priceHeader"
              class="accordion-header" 
            >
              <button 
                class="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapsePrice" 
                aria-expanded="false" 
                aria-controls="collapsePrice"
              >
                Pris
              </button>
            </h2>
            <div 
              id="collapsePrice" 
              class="accordion-collapse collapse" 
              aria-labelledby="priceHeader"
            >
              <div class="accordion-body">
                <div class="d-flex justify-content-center">
                  <div class="mx-3 mt-5 w-100">
                    <PriceRange 
                      v-model:priceRange="selectedPriceRange" 
                      @priceChange="$emit('update:priceRangeFilter', selectedPriceRange)" 
                    />
                  </div>
                </div>
              </div>
            </div>
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
import { ref, toRefs, onBeforeMount, computed, watchEffect } from 'vue'
import { fetchRetailers } from '@/api/retailers'
import { fetchBrands } from '@/api/brands'
import PriceRange from '@/components/PriceRange'
import FlightSpecPicker from '@/components/FlightSpecPicker'

export default {
  components: {
    PriceRange,
    FlightSpecPicker,
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
    },
    speedRangeFilter: {
      type: Array,
      default: () => [],
    },
    glideRangeFilter: {
      type: Array,
      default: () => [],
    },
    turnRangeFilter: {
      type: Array,
      default: () => [],
    },
    fadeRangeFilter: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["clicked", "clearFilter", "flightSpecChanged", "update:retailerFilter", "update:brandFilter", "update:priceRangeFilter", "update:speedRangeFilter", "update:glideRangeFilter", "update:turnRangeFilter", "update:fadeRangeFilter"],
  setup(props, { emit }) {
    const { retailerFilter, brandsFilter, priceRangeFilter, speedRangeFilter, glideRangeFilter, turnRangeFilter, fadeRangeFilter } = toRefs(props)
    const retailersList = ref([])
    const checkedRetailers = ref([...retailerFilter.value])
    const brandsList = ref([])
    const checkedBrands = ref([...brandsFilter.value])
    const selectedPriceRange = ref(priceRangeFilter.value)
    const defaultPriceRange = [...priceRangeFilter.value]
    const selectedSpeedRange = ref(speedRangeFilter.value)
    const defaultSpeedRange = [...speedRangeFilter.value]
    const selectedGlideRange = ref(glideRangeFilter.value)
    const defaultGlideRange = [...glideRangeFilter.value]
    const selectedTurnRange = ref(turnRangeFilter.value)
    const defaultTurnRange = [...turnRangeFilter.value]
    const selectedFadeRange = ref(fadeRangeFilter.value)
    const defaultFadeRange = [...fadeRangeFilter.value]

    const hasFlightSpecChange = computed(() => {
      const hasSpeedRangeChange = speedRangeFilter.value[0] !== defaultSpeedRange[0] || speedRangeFilter.value[1] !== defaultSpeedRange[1]
      const hasGlideRangeChange = glideRangeFilter.value[0] !== defaultGlideRange[0] || glideRangeFilter.value[1] !== defaultGlideRange[1]
      const hasTurnRangeChange = turnRangeFilter.value[0] !== defaultTurnRange[0] || turnRangeFilter.value[1] !== defaultTurnRange[1]
      const hasFadeRangeChange = fadeRangeFilter.value[0] !== defaultFadeRange[0] || fadeRangeFilter.value[1] !== defaultFadeRange[1]

      return hasSpeedRangeChange || hasGlideRangeChange || hasTurnRangeChange || hasFadeRangeChange
    })

    watchEffect(() => emit("flightSpecChanged", hasFlightSpecChange.value))

    const getRetailers = async () => {
      retailersList.value = await fetchRetailers()
    }

    const getBrands = async () => {
      brandsList.value = await fetchBrands()
    }

    const clearFilter = () => {
      checkedRetailers.value = []
      checkedBrands.value = []
      selectedPriceRange.value = [...defaultPriceRange]
      selectedSpeedRange.value = [...defaultSpeedRange]
      selectedGlideRange.value = [...defaultGlideRange]
      selectedTurnRange.value = [...defaultTurnRange]
      selectedFadeRange.value = [...defaultFadeRange]

      emit("update:retailerFilter", checkedRetailers.value)
      emit("update:brandFilter", checkedBrands.value)
      emit("update:priceRangeFilter", selectedPriceRange.value)
      emit("update:speedRangeFilter", selectedSpeedRange.value)
      emit("update:glideRangeFilter", selectedGlideRange.value)
      emit("update:turnRangeFilter", selectedTurnRange.value)
      emit("update:fadeRangeFilter", selectedFadeRange.value)
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
      selectedSpeedRange,
      selectedGlideRange,
      selectedTurnRange,
      selectedFadeRange,
      clearFilter,
    }
  },
}
</script>
