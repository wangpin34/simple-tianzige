import * as htmlToImage from 'html-to-image'

function savePNG(element: HTMLElement, filename: string) {
  htmlToImage.toPng(element)
  .then(function (dataUrl) {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `${filename}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
}

export { savePNG }
