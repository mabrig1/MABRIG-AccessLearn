import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
const base=path.resolve(import.meta.dirname,'..')
let count=0;let errors=0
function visit(dir){for(const name of fs.readdirSync(dir)){const full=path.join(dir,name);const st=fs.statSync(full);if(st.isDirectory()&&name!=='node_modules'&&name!=='dist'){visit(full);continue}if(!/\.(tsx?|jsx?)$/.test(name))continue;count++;const text=fs.readFileSync(full,'utf8');const kind=name.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS;const tree=ts.createSourceFile(full,text,ts.ScriptTarget.Latest,true,kind);for(const x of tree.parseDiagnostics){errors++;console.error(name,x.messageText)}}}
visit(path.join(base,'src'));visit(path.join(base,'functions'));visit(path.join(base,'tests'))
console.log(`${errors?'FAIL':'PASS'}: ${count} TypeScript / TSX / JS files syntactically parsed, ${errors} errors`)
process.exitCode=errors?1:0
