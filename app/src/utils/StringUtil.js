export const dash = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
export const timestamp = time => new Date(time).toLocaleString().split(',')[0] 