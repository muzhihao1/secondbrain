import{S as ae,i as ie,s as re,a as x,n as E,d as se,r as oe,b as T,c as de,x as s,e as ue,g as pe,h as q,j as ce}from"./index-CVxsGfYe.js";import{b as o}from"./lifecycle-DaBqEg2E.js";import{g as me}from"./spread-CgU5AtxT.js";import{S as z}from"./Stack-00JChciI.js";import"./Text-DuqmmQzd.js";function ye(l){let e,a,d,p,u=[{type:l[1]},{placeholder:l[2]},{disabled:l[3]},{readOnly:l[4]},{required:l[5]},{value:l[0]},{class:a="bg-v-bg-elevated text-v-text-primary border rounded-v-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed "+l[8]+" "+l[7]+" "+l[6]},l[9]],r={};for(let n=0;n<u.length;n+=1)r=x(r,u[n]);return{c(){e=pe("input"),this.h()},l(n){e=ue(n,"INPUT",{type:!0,placeholder:!0,class:!0}),this.h()},h(){T(e,r)},m(n,i){de(n,e,i),"value"in r&&(e.value=r.value),e.autofocus&&e.focus(),d||(p=[s(e,"input",l[20]),s(e,"input",l[13]),s(e,"change",l[14]),s(e,"focus",l[15]),s(e,"blur",l[16]),s(e,"keydown",l[17]),s(e,"keyup",l[18]),s(e,"keypress",l[19])],d=!0)},p(n,[i]){T(e,r=me(u,[i&2&&{type:n[1]},i&4&&{placeholder:n[2]},i&8&&{disabled:n[3]},i&16&&{readOnly:n[4]},i&32&&{required:n[5]},i&1&&e.value!==n[0]&&{value:n[0]},i&448&&a!==(a="bg-v-bg-elevated text-v-text-primary border rounded-v-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed "+n[8]+" "+n[7]+" "+n[6])&&{class:a},i&512&&n[9]])),"value"in r&&(e.value=r.value)},i:E,o:E,d(n){n&&se(e),d=!1,oe(p)}}}function fe(l,e,a){let d,p,u;const r=["value","type","placeholder","size","disabled","readonly","required","error","fullWidth"];let n=q(e,r),{value:i=""}=e,{type:S="text"}=e,{placeholder:w=""}=e,{size:g="md"}=e,{disabled:_=!1}=e,{readonly:C=!1}=e,{required:W=!1}=e,{error:k=""}=e,{fullWidth:I=!1}=e;function X(t){o.call(this,l,t)}function Y(t){o.call(this,l,t)}function Z(t){o.call(this,l,t)}function $(t){o.call(this,l,t)}function ee(t){o.call(this,l,t)}function te(t){o.call(this,l,t)}function le(t){o.call(this,l,t)}const ne=t=>{a(0,i=t.target.value)};return l.$$set=t=>{e=x(x({},e),ce(t)),a(9,n=q(e,r)),"value"in t&&a(0,i=t.value),"type"in t&&a(1,S=t.type),"placeholder"in t&&a(2,w=t.placeholder),"size"in t&&a(10,g=t.size),"disabled"in t&&a(3,_=t.disabled),"readonly"in t&&a(4,C=t.readonly),"required"in t&&a(5,W=t.required),"error"in t&&a(11,k=t.error),"fullWidth"in t&&a(12,I=t.fullWidth)},l.$$.update=()=>{l.$$.dirty&1024&&a(8,d={sm:"px-v-3 py-v-2 text-v-sm",md:"px-v-4 py-v-3 text-v-base",lg:"px-v-5 py-v-4 text-v-lg"}[g]),l.$$.dirty&2048&&a(7,p=k?"border-v-error focus:ring-v-error":"border-v-border focus:ring-v-primary"),l.$$.dirty&4096&&a(6,u=I?"w-full":"")},[i,S,w,_,C,W,u,p,d,n,g,k,I,X,Y,Z,$,ee,te,le,ne]}class v extends ae{constructor(e){super(),ie(this,e,fe,ye,re,{value:0,type:1,placeholder:2,size:10,disabled:3,readonly:4,required:5,error:11,fullWidth:12})}}v.__docgen={version:3,name:"Input.svelte",data:[{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"type",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"number",text:'"number"'},{kind:"const",type:"string",value:"text",text:'"text"'},{kind:"const",type:"string",value:"email",text:'"email"'},{kind:"const",type:"string",value:"password",text:'"password"'},{kind:"const",type:"string",value:"tel",text:'"tel"'},{kind:"const",type:"string",value:"url",text:'"url"'}],text:'"number" | "text" | "email" | "password" | "tel" | "url"'},static:!1,readonly:!1,defaultValue:'"text"'},{name:"placeholder",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"size",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'},{name:"disabled",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"readonly",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"required",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"error",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"fullWidth",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"}],computed:[],methods:[],components:[],description:`Input - Text input field

Standard text input with consistent styling and validation states.`,keywords:[{name:"component",description:""},{name:"example",description:`<Input
bind:value={email}
type="email"
placeholder="Enter email"
error="Invalid email"
/>`}],events:[{keywords:[],visibility:"public",description:"",name:"input",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"change",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"focus",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"blur",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"keydown",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"keyup",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"keypress",parent:"input",modificators:[],locations:null}],slots:[],refs:[]};const Ie={title:"Primitives/Input",component:v,tags:["autodocs"]},c={args:{placeholder:"Enter text...",size:"md"}},m={render:()=>({Component:z,props:{gap:"3"},slots:{default:`
        <Input size="sm" placeholder="Small input" />
        <Input size="md" placeholder="Medium input" />
        <Input size="lg" placeholder="Large input" />
      `}})},y={render:()=>({Component:z,props:{gap:"3"},slots:{default:`
        <Input type="text" placeholder="Text" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="number" placeholder="Number" />
        <Input type="tel" placeholder="Phone" />
        <Input type="url" placeholder="URL" />
      `}})},f={render:()=>({Component:z,props:{gap:"2"},slots:{default:`
        <Input placeholder="Email" error="Invalid email address" />
        <Text size="sm" color="error">Invalid email address</Text>
      `}})},b={render:()=>({Component:v,props:{placeholder:"Disabled input",disabled:!0}})},h={render:()=>({Component:v,props:{placeholder:"Full width input",fullWidth:!0}})};var V,P,D;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...',
    size: 'md'
  }
}`,...(D=(P=c.parameters)==null?void 0:P.docs)==null?void 0:D.source}}};var F,L,N;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '3'
    },
    slots: {
      default: \`
        <Input size="sm" placeholder="Small input" />
        <Input size="md" placeholder="Medium input" />
        <Input size="lg" placeholder="Large input" />
      \`
    }
  })
}`,...(N=(L=m.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var O,U,M;y.parameters={...y.parameters,docs:{...(O=y.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '3'
    },
    slots: {
      default: \`
        <Input type="text" placeholder="Text" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="number" placeholder="Number" />
        <Input type="tel" placeholder="Phone" />
        <Input type="url" placeholder="URL" />
      \`
    }
  })
}`,...(M=(U=y.parameters)==null?void 0:U.docs)==null?void 0:M.source}}};var R,j,A;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '2'
    },
    slots: {
      default: \`
        <Input placeholder="Email" error="Invalid email address" />
        <Text size="sm" color="error">Invalid email address</Text>
      \`
    }
  })
}`,...(A=(j=f.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var B,G,H;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => ({
    Component: Input,
    props: {
      placeholder: 'Disabled input',
      disabled: true
    }
  })
}`,...(H=(G=b.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var J,K,Q;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => ({
    Component: Input,
    props: {
      placeholder: 'Full width input',
      fullWidth: true
    }
  })
}`,...(Q=(K=h.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};const xe=["Default","Sizes","Types","WithError","Disabled","FullWidth"];export{c as Default,b as Disabled,h as FullWidth,m as Sizes,y as Types,f as WithError,xe as __namedExportsOrder,Ie as default};
