import { ref, watch } from 'vue'

export default function useDiscSort(selectedSortMethod, sortMode, discs) {
  let discsSorted = ref([])

  const sortDiscs = () => {
    switch(selectedSortMethod.value){
      case "random"   : discsSorted.value = shuffleArray(discs.value)
                        break
      case "discname" : discsSorted.value = sortBy("name")
                        break 
      case "retailer" : discsSorted.value = sortBy("retailer")
                        break
      case "brand"    : discsSorted.value = sortBy("brand")
                        break
      default         : discsSorted.value = discs.value
    }
  }

  const sortBy = (key) => {
    return discs.value.sort(
      (a, b) => sortMode.value > 0 ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
    )
  }

  const shuffleArray = (array) => {
    let m = array.length, t, i

    // While there remain elements to shuffle...
    while(m) {

      // Pick a remaining element...
      i = Math.floor(Math.random() * m--)

      // And swap it with the current element.
      t = array[m]
      array[m] = array[i]
      array[i] = t
    }

    return array
  }

  watch(discs, sortDiscs)
  watch(selectedSortMethod, sortDiscs)
  watch(sortMode, sortDiscs)

  return {
    discsSorted
  }
}
