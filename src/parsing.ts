export async function extractText(file:File):Promise<string> {
  const ext=file.name.toLowerCase().split('.').pop()
  if(file.size>8*1024*1024) throw new Error('Maximum file size is 8 MB for this prototype.')
  if(ext==='txt'||ext==='md') return file.text()
  if(ext==='docx') {
    const mammoth=await import('mammoth/mammoth.browser')
    const data=await file.arrayBuffer()
    const result=await mammoth.extractRawText({arrayBuffer:data})
    return result.value.trim()
  }
  if(ext==='pdf') {
    const pdfjs=await import('pdfjs-dist')
    pdfjs.GlobalWorkerOptions.workerSrc=new URL('pdfjs-dist/build/pdf.worker.min.mjs',import.meta.url).toString()
    const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise
    const chunks:string[]=[]
    for(let i=1;i<=Math.min(pdf.numPages,60);i++) {
      const page=await pdf.getPage(i)
      const content=await page.getTextContent()
      chunks.push(content.items.map(item=>('str' in item?item.str:'')).join(' '))
    }
    const out=chunks.join('\n\n').trim()
    if(out.length<50) throw new Error('This PDF appears scanned or image-only. OCR is not included in this MVP. Please provide accessible text or DOCX.')
    return out
  }
  throw new Error('Upload a PDF, DOCX, TXT or Markdown file.')
}
