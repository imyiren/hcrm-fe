export default function removeArrItemByCode(list, code) {
  const len = list.length
  let index = null;
  for (let i = 0; i < len; i++) {
    if (list[i].code === code) {
      index = i
      break;
    }
  }
  if (index !== null) {
    list.splice(index, 1);
  }
  return list
}
