const regex = /[\u4e00-\u9fa5]/
export function isChineseChar(char: string) {
  if (char.length !== 1) {
    console.warn('invalid char(expect 1 char):' + char)
    return false
  }
  return regex.test(char)
}
export function filterNotChineseChar(str: string) {
  return str
    .split('')
    .filter((s) => isChineseChar(s))
    .join('')
}

export function textToHanziList(text: string) {
  return text.split('').map((s, index) => ({
    id: index,
    char: s,
    isChinese: isChineseChar(s),
  }))
}
