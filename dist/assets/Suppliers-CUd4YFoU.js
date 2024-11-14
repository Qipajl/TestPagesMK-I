import{a0 as f,a3 as p,a1 as R,_ as h,f as g,a4 as w,A as y,r as i,o as _,i as q,w as x,b as S,m as v}from"./index-C2nmCatd.js";import{v as t}from"./validation-D2voD8Jn.js";function I({crudOptions:r}){return{crudOptions:{request:{transformQuery:({page:e,form:o,sort:n})=>{const m=n==null?{}:{orderProp:n.prop,orderAsc:n.asc};return{pageNum:e.currentPage,pageSize:e.pageSize,suppliersBo:{...o},...m}},transformRes:({res:e})=>({total:e.total,records:e.rows}),pageRequest:async e=>await f("/suppliers/listPages",e),addRequest:async({form:e})=>await p("/suppliers/addOrUpdate",e),editRequest:async({form:e,row:o})=>(e.supplierId=o.supplierId,await p("/suppliers/addOrUpdate",e)),delRequest:async({row:e})=>await R("/suppliers/delete",{id:e.supplierId})},pagination:{pageSize:10,pageNum:1},columns:{supplierId:{column:{show:!1},title:"采购商ID",key:"supplier_id",type:"number",form:{show:!1},viewForm:{show:!0}},supplierName:{column:{minWidth:50,align:"center"},title:"采购商名",type:"text",search:{show:!0},form:{rules:t.required}},contactPerson:{column:{minWidth:30},title:"联系人",type:"text",form:{rules:t.required}},phone:{column:{minWidth:45},title:"电话",type:"text",form:{rules:t.phoneRule(!1)}},email:{column:{minWidth:100},title:"邮箱",type:"text",form:{rules:t.emailRule(!1)}},address:{title:"地址",type:"text",form:{rules:t.addressRule()}},createdAt:{title:"创建时间",type:"datetime",search:{title:"时间",show:!0,component:{type:"datetimerange"}},form:{show:!0,value:new Date().toISOString(),component:{valueFormat:"YYYY-MM-DD HH:mm:ss"},rules:t.required}},updatedAt:{title:"更新时间",type:"date",form:{show:!1}}}}}}const O=g({name:"SupplierCrud",setup(){const{crudRef:r,crudBinding:s,crudExpose:a}=w({createCrudOptions:I});return y(()=>{a.doRefresh()}),{crudBinding:s,crudRef:r}}});function B(r,s,a,l,d,c){const u=i("fs-crud"),e=i("fs-page");return _(),q(e,null,{default:x(()=>[S(u,v({ref:"crudRef"},r.crudBinding),null,16)]),_:1})}const k=h(O,[["render",B]]);export{k as default};
