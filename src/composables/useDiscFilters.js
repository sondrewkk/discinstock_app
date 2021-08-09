import { watch, ref } from 'vue'

export default function useDiscFilters(retailerFilter, brandFilter, priceRangeFilter, discs) {
  const discsFiltered = ref([])

  const filterDiscs = () => {
    discsFiltered.value = discs.value.filter( disc => {
      const hasRetailer = retailerFilter.value.length === 0 || retailerFilter.value.includes(disc.retailer)
      const hasBrand = brandFilter.value.length === 0 || brandFilter.value.includes(disc.brand)
      const hasPriceInRange = priceInRange(disc.price, ...priceRangeFilter.value)

      return hasRetailer && hasBrand && hasPriceInRange
    })
  }

  const priceInRange = (price, min, max) => {
    return price >= min && price <= max
  }

  watch(discs, filterDiscs)
  watch(retailerFilter, filterDiscs)
  watch(brandFilter, filterDiscs)
  watch(priceRangeFilter, filterDiscs)

  return {
    discsFiltered
  }
}
