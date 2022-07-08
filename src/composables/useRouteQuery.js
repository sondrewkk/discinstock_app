import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function useRouteQuery(discName, retialerFilter) {
  const route = useRoute()
  const router = useRouter()
  const setUrlNameParamDelay = 1200
  let timerId = -1
  
  const getRouteQuery = () => {
    return route.query
  }

  const onDiscNameChanged = () => {
    if(timerId !== -1){
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      // If disk name has not changed in .3 seconds, set name param to disc name
      let query = route.query
      let name = discName.value.length == 0 ? undefined : discName.value
      router.replace({query: {...query, name: name}})
      timerId = -1
    }, setUrlNameParamDelay)
  }
  
  watch(discName, onDiscNameChanged)

  const onRetailerFilterChanged = () => {
    let query = route.query
    let retailer = retialerFilter.value
    router.replace({query: {...query, retailer: retailer}})
  }

  watch(retialerFilter, onRetailerFilterChanged)

  return {
    getRouteQuery
  }
}
