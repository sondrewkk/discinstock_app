import { ref, watch } from "vue";

export default function useDiscNameSearch(discName, discs) {
  const discsMatchingNameSearch = ref([])

  const filterDiscByName = () => {
    discsMatchingNameSearch.value = discs.value.filter( disc => {
      const re = new RegExp(discName.value, "i")
      return disc.name.match(re)
    })
  }

  watch(discs, filterDiscByName)
  watch(discName, filterDiscByName)

  return {
    discsMatchingNameSearch,
  }
}
