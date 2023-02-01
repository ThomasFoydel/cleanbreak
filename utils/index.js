export function findWithAttr(array, attr, val) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === val) return array[i]
  }
  return null
}

export function findIndexWithAttr(array, attr, val) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === val) return i
  }
  return -1
}
