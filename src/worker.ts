/** Cloudflare Workers Builds adapter. Pages Functions remain supported. */
import {onRequestPost} from '../functions/api/agents'
type WorkerEnv={
 ASSETS:{fetch:(request:Request)=>Promise<Response>};
 OPENROUTER_API_KEY?:string;OPENROUTER_MODEL?:string;
 OPENROUTER_PLANNER_MODEL?:string;OPENROUTER_ADAPTER_MODEL?:string;OPENROUTER_ASSESSMENT_MODEL?:string;
 AI_ALLOWED_EMAILS?:string;SUPABASE_URL?:string;SUPABASE_ANON_KEY?:string;ALLOWED_ORIGIN?:string
}
export default {
 async fetch(request:Request,env:WorkerEnv):Promise<Response>{
  const url=new URL(request.url)
  if(url.pathname==='/api/health')return Response.json({service:'MABRIG AccessLearn',version:'0.2.0',status:'ok'},{headers:{'Cache-Control':'no-store'}})
  if(url.pathname==='/api/agents'){
   if(request.method!=='POST')return Response.json({error:'Method not allowed'},{status:405,headers:{Allow:'POST'}})
   return onRequestPost({request,env})
  }
  if(url.pathname.startsWith('/api/'))return Response.json({error:'Unknown API route'},{status:404})
  return env.ASSETS.fetch(request)
 }
}
