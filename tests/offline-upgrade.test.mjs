import assert from 'node:assert/strict'
import {answerFromSource} from '../src/offline-coach.ts'
import {createBackup,parseBackup} from '../src/backup.ts'
const src='Photosynthesis uses sunlight to create chemical energy. Water and carbon dioxide are important in photosynthesis.'
assert.match(answerFromSource(src,'What uses sunlight?').evidence,/Photosynthesis uses sunlight/)
assert.equal(answerFromSource(src,'How does a volcano erupt?').evidence,'')
assert.equal(answerFromSource(src,'?').evidence,'')
const lesson={id:'a',title:'Biology',source:src,status:'published',createdAt:'2026-10-19',completed:false,pack:{title:'Biology',objectives:['understand'],simplified:src,glossary:[],quiz:[],audit:[],mode:'local',createdAt:'2026-10-19'}}
assert.equal(parseBackup(createBackup([lesson]))[0].title,'Biology')
assert.throws(()=>parseBackup(JSON.stringify({format:'accesslearn-library',version:1,lessons:[{id:'bad'}]})))
assert.throws(()=>parseBackup('invalid'))
assert.throws(()=>parseBackup(JSON.stringify({format:'accesslearn-library',version:1,lessons:[lesson,lesson]})))
console.log('PASS: offline Q&A and backup validation')
