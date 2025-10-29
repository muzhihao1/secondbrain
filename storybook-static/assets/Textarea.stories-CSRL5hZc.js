import{S as J,i as K,s as L,a as g,n as _,d as T,r as N,b as q,E,c as Q,x as u,e as U,f as Y,g as Z,h as S,j as $}from"./index-CVxsGfYe.js";import{b as c}from"./lifecycle-DaBqEg2E.js";import{g as ee}from"./spread-CgU5AtxT.js";import{S as ae}from"./Stack-00JChciI.js";function re(r){let e,l,i,d,n=[{placeholder:r[1]},{disabled:r[3]},{readOnly:r[4]},{required:r[5]},{rows:r[2]},{class:l="bg-v-bg-elevated text-v-text-primary border rounded-v-md px-v-4 py-v-3 text-v-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed resize-y "+r[7]+" "+(r[6]?"w-full":"")},r[8]],o={};for(let t=0;t<n.length;t+=1)o=g(o,n[t]);return{c(){e=Z("textarea"),this.h()},l(t){e=U(t,"TEXTAREA",{placeholder:!0,rows:!0,class:!0}),Y(e).forEach(T),this.h()},h(){q(e,o)},m(t,s){Q(t,e,s),e.autofocus&&e.focus(),E(e,r[0]),i||(d=[u(e,"input",r[14]),u(e,"input",r[10]),u(e,"change",r[11]),u(e,"focus",r[12]),u(e,"blur",r[13])],i=!0)},p(t,[s]){q(e,o=ee(n,[s&2&&{placeholder:t[1]},s&8&&{disabled:t[3]},s&16&&{readOnly:t[4]},s&32&&{required:t[5]},s&4&&{rows:t[2]},s&192&&l!==(l="bg-v-bg-elevated text-v-text-primary border rounded-v-md px-v-4 py-v-3 text-v-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed resize-y "+t[7]+" "+(t[6]?"w-full":""))&&{class:l},s&256&&t[8]])),s&1&&E(e,t[0])},i:_,o:_,d(t){t&&T(e),i=!1,N(d)}}}function te(r,e,l){let i;const d=["value","placeholder","rows","disabled","readonly","required","error","fullWidth"];let n=S(e,d),{value:o=""}=e,{placeholder:t=""}=e,{rows:s=4}=e,{disabled:v=!1}=e,{readonly:k=!1}=e,{required:w=!1}=e,{error:h=""}=e,{fullWidth:x=!0}=e;function B(a){c.call(this,r,a)}function F(a){c.call(this,r,a)}function G(a){c.call(this,r,a)}function H(a){c.call(this,r,a)}function I(){o=this.value,l(0,o)}return r.$$set=a=>{e=g(g({},e),$(a)),l(8,n=S(e,d)),"value"in a&&l(0,o=a.value),"placeholder"in a&&l(1,t=a.placeholder),"rows"in a&&l(2,s=a.rows),"disabled"in a&&l(3,v=a.disabled),"readonly"in a&&l(4,k=a.readonly),"required"in a&&l(5,w=a.required),"error"in a&&l(9,h=a.error),"fullWidth"in a&&l(6,x=a.fullWidth)},r.$$.update=()=>{r.$$.dirty&512&&l(7,i=h?"border-v-error focus:ring-v-error":"border-v-border focus:ring-v-primary")},[o,t,s,v,k,w,x,i,n,h,B,F,G,H,I]}class y extends J{constructor(e){super(),K(this,e,te,re,L,{value:0,placeholder:1,rows:2,disabled:3,readonly:4,required:5,error:9,fullWidth:6})}}y.__docgen={version:3,name:"Textarea.svelte",data:[{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"placeholder",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"rows",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"number",text:"number"},static:!1,readonly:!1,defaultValue:"4"},{name:"disabled",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"readonly",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"required",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"error",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"fullWidth",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"true"}],computed:[],methods:[],components:[],description:"Textarea - Multi-line text input",keywords:[{name:"component",description:""}],events:[{keywords:[],visibility:"public",description:"",name:"input",parent:"textarea",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"change",parent:"textarea",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"focus",parent:"textarea",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"blur",parent:"textarea",modificators:[],locations:null}],slots:[],refs:[]};const ne={title:"Primitives/Textarea",component:y,tags:["autodocs"]},p={args:{placeholder:"Enter your message...",rows:4}},f={render:()=>({Component:ae,props:{gap:"3"},slots:{default:`
        <Textarea rows="2" placeholder="2 rows" />
        <Textarea rows="6" placeholder="6 rows" />
        <Textarea rows="10" placeholder="10 rows" />
      `}})},m={render:()=>({Component:y,props:{placeholder:"Message",error:"Message is required"}})},b={render:()=>({Component:y,props:{placeholder:"Disabled textarea",disabled:!0}})};var C,V,W;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter your message...',
    rows: 4
  }
}`,...(W=(V=p.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var D,M,O;f.parameters={...f.parameters,docs:{...(D=f.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '3'
    },
    slots: {
      default: \`
        <Textarea rows="2" placeholder="2 rows" />
        <Textarea rows="6" placeholder="6 rows" />
        <Textarea rows="10" placeholder="10 rows" />
      \`
    }
  })
}`,...(O=(M=f.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var R,z,A;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => ({
    Component: Textarea,
    props: {
      placeholder: 'Message',
      error: 'Message is required'
    }
  })
}`,...(A=(z=m.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var P,j,X;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => ({
    Component: Textarea,
    props: {
      placeholder: 'Disabled textarea',
      disabled: true
    }
  })
}`,...(X=(j=b.parameters)==null?void 0:j.docs)==null?void 0:X.source}}};const de=["Default","Rows","WithError","Disabled"];export{p as Default,b as Disabled,f as Rows,m as WithError,de as __namedExportsOrder,ne as default};
