export const dash = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
export const dateStamp = time => new Date(time).toLocaleString().split(',')[0]
export const capitalize = str =>
  str
    .split(' ')
    .map(w => w.toUpperCase()[0] + w.slice(1))
    .join(' ')

export const rnd = (length = 10) => {
  if (length > 0) {
    let str = ''
    let total = Math.ceil(length / 10)
    for (let i = 0; i < total; i++) {
      str += Math.random()
        .toString(36)
        .substr(2, 10)
    }
    return str.substr(0, length)
  }
  return ''
}

// https://stackoverflow.com/a/16348977
export const color = function(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}
