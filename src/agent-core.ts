export type QuizItem = { question: string; options: string[]; correctIndex: number; explanation: string; evidence: string }
export type GlossaryItem = { term: string; definition: string; evidence: string }
export type LessonPack = {
  title: string; objectives: string[]; simplified: string; glossary: GlossaryItem[];
  quiz: QuizItem[]; mode: 'local' | 'cloud'; audit: string[]; createdAt: string;
}
export function sourceCheck(source: string, evidence: string): boolean {
  const canonical = (s: string) => s.toLowerCase().replace(/\s+/g,' ').trim()
  return !!evidence?.trim() && canonical(source).includes(canonical(evidence))
}
export function assessPack(pack: Omit<LessonPack,'audit'>, source: string): string[] {
  const problems: string[]=[]
  if (!pack.title.trim()) problems.push('Lesson has no title.')
  if (!pack.simplified || pack.simplified.trim().length < 80) problems.push('Accessible lesson is too short to verify.')
  if (pack.objectives.length < 1) problems.push('Learning objectives are missing.')
  if (pack.quiz.length < 2) problems.push('Fewer than two practice questions.')
  for(const [i,q] of pack.quiz.entries()) {
    if(q.options.length!==4||!Number.isInteger(q.correctIndex)||q.correctIndex<0||q.correctIndex>3) problems.push(`Question ${i+1}: answers are invalid.`)
    if(!sourceCheck(source,q.evidence)) problems.push(`Question ${i+1}: source quotation not found; teacher verification required.`)
  }
  for(const [i,g] of pack.glossary.entries()) if(!sourceCheck(source,g.evidence)) problems.push(`Glossary ${i+1}: source quotation not found.`)
  if(pack.mode==='local') problems.push('Offline preparation is a structural preview, not AI simplification. Review and edit before publishing.')
  return problems
}
function pieces(text:string) { return text.split(/(?<=[.!?])\s+/).map(x=>x.trim()).filter(x=>x.length>15) }
export function localPack(source:string, title='New lesson'):LessonPack {
  const sentences=pieces(source)
  const paragraphs=source.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean)
  const objectives=['Identify the central idea of this lesson','Explain one key idea using the original source']
  const simplified=paragraphs.map((p,i)=>`Section ${i+1}\n${p}`).join('\n\n')
  const quiz:QuizItem[]=sentences.slice(0,3).map((s,i)=>({
    question:`Which source statement is included in this lesson? (Practice ${i+1})`,
    options:[s,'The source does not discuss this topic.','No source material was provided.','This lesson contains no evidence.'],
    correctIndex:0, explanation:'Compare the answer directly with the source text.',evidence:s
  }))
  const draft={title:title.trim()||'New lesson',objectives,simplified,glossary:[],quiz,mode:'local' as const,createdAt:new Date().toISOString()}
  return {...draft,audit:assessPack(draft,source)}
}
export function compactSource(source:string,max=12000) {return source.trim().slice(0,max)}
