export const dash = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
export const dateStamp = time => new Date(time).toLocaleString().split(',')[0]
export const capitalize = str => str.split(" ").map((w) => w.toUpperCase()[0] + w.slice(1)).join(" ")