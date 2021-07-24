import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function useRouteQuery(discName) {
  const route = useRoute()
  const router = useRouter()
  
  const getRouteQuery = () => {
    if ("name" in route.query) {
      return route.query.name;
    }
  }

  const onDiscNameChanged = () => {
    if(discName.value !== undefined && discName.value.length == 0){
      router.replace({ query: null })
    }
    else {
        router.replace({ query: { name: discName.value }})
    }
  }
  
  watch(discName, onDiscNameChanged)

  return {
    getRouteQuery
  }
}
