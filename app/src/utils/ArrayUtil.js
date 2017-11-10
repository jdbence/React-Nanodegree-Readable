export const uniqueArray = (array, prop='id') => {
  const found = {}
  return array.filter(e => {
    if(found[e[prop]]){
      return false
    }
    found[e[prop]] = true
    return true
  })
}