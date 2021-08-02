import { ref, watch } from 'vue'

export default function useDiscSort(sortBy, sortMode, discs) {
  let discsSorted = ref([])
  let currentSortMode = ref(sortMode.value)

  const sortDiscs = () => {
    console.log(`sort by: ${sortBy.value} | sort mode: ${sortMode.value}`)
    
    switch(sortBy.value){
      case "random"   : discsSorted.value = shuffleArray(discs.value)
                        break
      case "discname" : discsSorted.value = discs.value.sort((a, b) => a.name.localeCompare(b.name))
                        break 
      case "retailer" : discsSorted.value = discs.value.sort((a, b) => a.retailer.localeCompare(b.retailer))
                        break
      case "brand"    : discsSorted.value = discs.value.sort((a, b) => a.brand.localeCompare(b.brand))
                        break
      default         : discsSorted.value = discs.value
    }

    applySortMode()
  }

  const applySortMode = () => {
    console.log("Sort mode changed")

    if(currentSortMode.value != sortMode.value)
    {
      console.log("rev")
      discsSorted.value.reverse()
      currentSortMode.value = sortMode.value
    }
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
  watch(sortBy, sortDiscs)
  watch(sortMode, applySortMode)

  return {
    discsSorted
  }
}
