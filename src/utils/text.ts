const colors = ['#569597', '#7ba1a8', '#f36838', '#ff4777', '#057748', '#574266', '#8d4bbb', '#3d3b4f', '#a1afc9', '#88ada6']

export const defaultColor = '#88ada6'

const textToNumber = (text: string, max: number) => {
  const sum = text.split('').map(t => t.charCodeAt(0)).reduce((a, c) => a + c, 0)
  return sum % max
}

export const textToColor = (text: string) => {
  const num = textToNumber(text, colors.length)
  return colors[num]
}