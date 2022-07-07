import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function useRouteQuery(discName, retialerFilter) {
  const route = useRoute()
  const router = useRouter()
  
  const getRouteQuery = () => {
    return route.query
  }

  const onDiscNameChanged = () => {
    let query = route.query
    let name = discName.value.length == 0 ? undefined : discName.value
    router.replace({query: {...query, name: name}})
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
