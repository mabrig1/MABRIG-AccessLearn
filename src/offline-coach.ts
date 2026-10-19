/** Strict extractive retrieval. Never generates new external facts. */
const stop=new Set('what where when which who whom whose why how does do did are is the a an in on of for to and or this that can my me i you lesson please explain tell about with from'.split(' '))
export function answerFromSource(source:string,question:string):{answer:string;evidence:string}{
 const tokens=[...new Set((question.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu)||[]).filter(x=>!stop.has(x)))].slice(0,20)
 if(tokens.length===0)return {answer:'Ask a specific question using words from the lesson.',evidence:''}
 const segments=source.split(/(?<=[.!?])\s+|\n+/).map(x=>x.trim()).filter(x=>x.length>15&&x.length<750)
 const scored=segments.map(s=>({s,score:tokens.reduce((n,t)=>n+(s.toLowerCase().includes(t)?1:0),0)})).sort((a,b)=>b.score-a.score)
 if(!scored[0]||scored[0].score===0)return {answer:'I could not find an answer in this lesson. Ask your teacher or check another approved source.',evidence:''}
 return {answer:'The closest relevant statement in your lesson is quoted below. Check the original text and ask your teacher if you need more explanation.',evidence:scored[0].s}
}
