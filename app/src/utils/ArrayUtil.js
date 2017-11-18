import { ALPHA, DATE } from 'modules/SortModule'

export const uniqueArray = (array, prop = 'id') => {
  const found = {}
  return array.filter(e => {
    if (found[e[prop]]) {
      return false
    }
    found[e[prop]] = true
    return true
  })
}

export const alphaSort = (a, b) => {
  let aT = a.title.toLowerCase()
  let bT = b.title.toLowerCase()
  return aT < bT ? (aT > bT ? -1 : 0) : 1
}

export const dateSort = (a, b) => b.timestamp - a.timestamp

export const ratingSort = (a, b) => b.voteScore - a.voteScore

export const postFilter = category => (category.length > 0 ? item => item.category === category : () => true)

export const postSort = type => (type === ALPHA.type ? alphaSort : type === DATE.type ? dateSort : ratingSort)

// Numeric sort ASC or DESC
export const multiSort = (...fields) => {
  let l = fields.length
  let dir = new Array(l)
  fields = fields.map((f, i) => {
    if (f[0] === '-') {
      dir[i] = -1
      f = f.substring(1)
    } else {
      dir[i] = 1
    }
    return f
  })

  return (a, b) => {
    for (let i = 0; i < l; i++) {
      const o = fields[i]
      if (a[o] > b[o]) return dir[i]
      if (a[o] < b[o]) return -dir[i]
    }
    return 0
  }
}
