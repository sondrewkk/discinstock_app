import { watch, ref } from 'vue'

export default function useDiscFilters(retailerFilter, brandFilter, discs) {
  const discsFiltered = ref([])

  const filterDiscs = () => {
    discsFiltered.value = discs.value.filter( disc => {
      const hasRetailer = retailerFilter.value.length === 0 || retailerFilter.value.includes(disc.retailer)
      const hasBrand = brandFilter.value.length === 0 || brandFilter.value.includes(disc.brand)

      return hasRetailer && hasBrand
    })
  }

  watch(discs, filterDiscs)
  watch(retailerFilter, filterDiscs)
  watch(brandFilter, filterDiscs)

  return {
    discsFiltered
  }
}
