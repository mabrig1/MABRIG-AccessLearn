import {describe,it,expect} from 'vitest'
import {sourceCheck,localPack,assessPack,compactSource} from '../src/agent-core'
import {example} from '../src/sample'
describe('evidence guard',()=>{
 it('accepts exact normalised source quotes',()=>expect(sourceCheck('Plants use sunlight.','plants   use sunlight.')).toBe(true))
 it('rejects fabricated source evidence',()=>expect(sourceCheck('Plants use sunlight.','Plants use electricity.')).toBe(false))
 it('rejects empty source evidence',()=>expect(sourceCheck('Plants use sunlight.','')).toBe(false))
 it('bounds source length for network cost',()=>expect(compactSource('X'.repeat(30000)).length).toBe(12000))
 it('creates working local preparation',()=>{const pack=localPack(example,'Biology');expect(pack.quiz.length).toBeGreaterThanOrEqual(2);expect(pack.title).toBe('Biology');expect(pack.mode).toBe('local');expect(pack.audit.some(x=>x.includes('structural preview'))).toBe(true)})
 it('rejects badly formed answer options',()=>{const pack=localPack(example,'Biology');pack.quiz[0].options=[];const issues=assessPack(pack,example);expect(issues.some(x=>x.includes('answers are invalid'))).toBe(true)})
 it('rejects unsupported evidence',()=>{const pack=localPack(example,'Biology');pack.quiz[0].evidence='A nuclear fission plant';const issues=assessPack(pack,example);expect(issues.some(x=>x.includes('not found'))).toBe(true)})
})
