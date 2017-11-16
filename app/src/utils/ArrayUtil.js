import {ALPHA, DATE, RATING} from 'modules/SortModule'

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

export const alphaSort = (a, b) => {
  let aT = a.title.toLowerCase();
  let bT = b.title.toLowerCase();
  return aT < bT ? (aT > bT ? -1 : 0) : 1;
}

export const dateSort = (a, b) => b.timestamp - a.timestamp

export const ratingSort = (a, b) => b.voteScore - a.voteScore

export const postFilter = (category) => category.length > 0
  ? item => item.category === category
  : () => true

export const postSort = (type) => type === ALPHA.type
  ? alphaSort
  : type === DATE.type
  ? dateSort
  : ratingSort