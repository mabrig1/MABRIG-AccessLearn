import assert from 'node:assert/strict'
import {sourceCheck,localPack,assessPack,compactSource} from '../src/agent-core.ts'
const source='Plants convert sunlight into chemical energy during photosynthesis.\n\nCarbon dioxide and water are converted into glucose and oxygen.\n\nLeaf chlorophyll absorbs light energy.'
assert.equal(sourceCheck(source,'plants convert sunlight into chemical energy during photosynthesis.'),true)
assert.equal(sourceCheck(source,'Plants generate gold from sunlight.'),false)
assert.equal(sourceCheck(source,''),false)
assert.equal(compactSource('x'.repeat(20000)).length,12000)
const result=localPack(source,'Lesson')
assert.equal(result.mode,'local')
assert.equal(result.title,'Lesson')
assert.ok(result.quiz.length>=2)
assert.ok(result.audit.some(x=>x.includes('structural preview')))
result.quiz[0].evidence='Not in original'
assert.ok(assessPack(result,source).some(x=>x.includes('not found')))
console.log('PASS: 7 offline agent and evidence safety assertions')
