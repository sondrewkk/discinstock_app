import { watch, ref } from 'vue'

export default function useDiscFilters(
  retailerFilter, 
  brandFilter, 
  priceRangeFilter, 
  speedRangeFilter, 
  glideRangeFilter, 
  turnRangeFilter, 
  fadeRangeFilter, 
  flightSpecChanged, 
  discs) 
{
  const discsFiltered = ref([])

  const filterDiscs = () => {
    discsFiltered.value = discs.value.filter( disc => {
      const hasRetailer = retailerFilter.value.length === 0 || retailerFilter.value.includes(disc.retailer)
      const hasBrand = brandFilter.value.length === 0 || brandFilter.value.includes(disc.brand)
      const hasPriceInRange = valueInRange(disc.price, ...priceRangeFilter.value)
      
      let flightSpecInRange = true
      
      if(flightSpecChanged.value === true) {
        const hasSpeedInRange = valueInRange(disc.speed, ...speedRangeFilter.value)
        const hasGlideInRange = valueInRange(disc.glide, ...glideRangeFilter.value)
        const hasTurnInRange = valueInRange(disc.turn, ...turnRangeFilter.value)
        const hasFadeInRange = valueInRange(disc.fade, ...fadeRangeFilter.value)
        
        flightSpecInRange = hasSpeedInRange && hasGlideInRange && hasTurnInRange && hasFadeInRange
      }
        
      return hasRetailer && hasBrand && hasPriceInRange && flightSpecInRange
    })
  }

  const valueInRange = (value, min, max) => {
    return value >= min && value <= max
  }

  watch(discs, filterDiscs)
  watch(retailerFilter, filterDiscs)
  watch(brandFilter, filterDiscs)
  watch(priceRangeFilter, filterDiscs)
  watch(speedRangeFilter, filterDiscs)
  watch(glideRangeFilter, filterDiscs)
  watch(turnRangeFilter, filterDiscs)
  watch(fadeRangeFilter, filterDiscs)
  watch(flightSpecChanged, filterDiscs)
  
  return {
    discsFiltered
  }
}
