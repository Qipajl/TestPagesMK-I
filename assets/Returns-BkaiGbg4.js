import{$ as f,a0 as c,a1 as R,a3 as w,a7 as q,_ as g,f as h,a4 as y,a5 as _,A as I,r as i,o as v,i as D,w as b,b as x,m as B,a6 as C}from"./index-C2nmCatd.js";import{v as u}from"./validation-D2voD8Jn.js";function $({crudOptions:r}){return{crudOptions:{request:{transformQuery:({page:e,form:t,sort:n})=>{const m=n==null?{}:{orderProp:n.prop,orderAsc:n.asc};return{pageNum:e.currentPage,pageSize:e.pageSize,returnsBo:{...t},...m}},transformRes:({res:e})=>({total:e.total,records:e.rows}),pageRequest:async e=>await c("/returns/listPages",e),addRequest:async({form:e})=>await w("/returns/add",e),editRequest:async({form:e,row:t})=>(e.returnId=t.returnId,await c("/returns/addOrUpdate",e)),delRequest:async({row:e})=>await R("/returns/delete",{id:e.returnId})},pagination:{pageSize:10,pageNum:1},columns:{returnId:{column:{show:!1},title:"资产ID",key:"return_id",type:"number",form:{show:!1},viewForm:{show:!0}},orderId:{column:{show:!1},title:"部门ID",type:"number",search:{show:!0},form:{rules:u.required}},productId:{title:"资产名称",type:"dict-select",search:{show:!0},form:{rules:u.required},dict:f({value:"productId",label:"productName",url:"/products/list",getData:async e=>{try{return(await q(e.url)).data}catch(t){return console.error("获取字典数据失败:",t),[]}}})},quantity:{title:"折损数量",type:"number",form:{rules:u.required}},returnDate:{title:"折损日期",type:"date",form:{show:!0,component:{valueFormat:"YYYY-MM-DD"}}},reason:{title:"折损原因",type:"text",form:{show:!0}}}}}}const k=h({name:"ReturnsCrud",setup(){const{crudRef:r,crudBinding:a,crudExpose:s}=y({createCrudOptions:$}),o=C();return _(o,()=>{s.doRefresh()}),I(()=>{s.doRefresh()}),{crudBinding:a,crudRef:r}}});function N(r,a,s,o,p,l){const d=i("fs-crud"),e=i("fs-page");return v(),D(e,null,{default:b(()=>[x(d,B({ref:"crudRef"},r.crudBinding),null,16)]),_:1})}const Y=g(k,[["render",N]]);export{Y as default};
