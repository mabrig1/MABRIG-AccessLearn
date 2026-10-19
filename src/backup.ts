/** Backups contain original teacher material: store them privately. */
export type LibraryBackupLesson = {
  id: string; title: string; source: string; pack: {
    title: string; objectives: string[]; simplified: string;
    glossary: {term:string;definition:string;evidence:string}[];
    quiz: {question:string;options:string[];correctIndex:number;explanation:string;evidence:string}[];
    mode: 'local'|'cloud';audit:string[];createdAt:string
  }; status: 'sample'|'published'|'draft';createdAt:string;completed:boolean
}
export function createBackup(lessons: LibraryBackupLesson[]): string {
  return JSON.stringify({format:'accesslearn-library',version:1,exportedAt:new Date().toISOString(),lessons},null,2)
}
export function parseBackup(raw: string): LibraryBackupLesson[] {
  if (raw.length>2*1024*1024) throw new Error('Backup exceeds 2 MB.')
  let value: unknown
  try { value=JSON.parse(raw) } catch {throw new Error('Backup is not valid JSON.')}
  const obj=value as Record<string,unknown>
  if(!obj||obj.format!=='accesslearn-library'||obj.version!==1||!Array.isArray(obj.lessons)||obj.lessons.length>100)
    throw new Error('Unsupported AccessLearn backup format or lesson count.')
  const text=(x:unknown,max:number):x is string=>typeof x==='string'&&x.length<=max
  const strArray=(x:unknown,max:number)=>Array.isArray(x)&&x.length<=max&&x.every(y=>text(y,12000))
  const validLesson=(x:unknown):x is LibraryBackupLesson=>{
    if(!x||typeof x!=='object')return false
    const l=x as Record<string,unknown>, pack=l.pack as Record<string,unknown>
    if(!text(l.id,100)||!l.id||!text(l.title,120)||!text(l.source,12000)||!text(l.createdAt,80)||typeof l.completed!=='boolean'||!['sample','published','draft'].includes(String(l.status)))return false
    if(!pack||typeof pack!=='object'||!text(pack.title,120)||!text(pack.simplified,12000)||!['local','cloud'].includes(String(pack.mode))||!text(pack.createdAt,80)||!strArray(pack.objectives,10)||!strArray(pack.audit,30))return false
    if(!Array.isArray(pack.quiz)||pack.quiz.length>10||!pack.quiz.every((q:unknown)=>{
      const a=q as Record<string,unknown>
      return a&&text(a.question,400)&&strArray(a.options,4)&&a.options.length===4&&Number.isInteger(a.correctIndex)&&Number(a.correctIndex)>=0&&Number(a.correctIndex)<4&&text(a.explanation,500)&&text(a.evidence,350)
    }))return false
    return Array.isArray(pack.glossary)&&pack.glossary.length<=20&&pack.glossary.every((g:unknown)=>{const a=g as Record<string,unknown>;return a&&text(a.term,70)&&text(a.definition,300)&&text(a.evidence,350)})
  }
  if(!obj.lessons.every(validLesson))throw new Error('Backup contains invalid lesson data.')
  if(new Set(obj.lessons.map(l=>l.id)).size!==obj.lessons.length)throw new Error('Backup contains duplicate IDs.')
  return obj.lessons
}
