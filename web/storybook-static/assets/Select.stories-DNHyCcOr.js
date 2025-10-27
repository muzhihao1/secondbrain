import{S as ae,i as re,s as de,a as q,n as P,d as b,F as ce,r as ue,b as I,G as L,H as y,c as N,w as V,x as v,I as pe,e as W,f as J,l as T,g as D,h as w,j as fe,A as ee,E,B as te,C as le,J as me}from"./index-CVxsGfYe.js";import{b as C}from"./lifecycle-DaBqEg2E.js";import{g as he}from"./spread-CgU5AtxT.js";import{S as be}from"./Stack-00JChciI.js";function A(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function M(t,e,s){const d=t.slice();return d[15]=e[s],d}function j(t){let e,s,d;return{c(){e=D("option"),s=le(t[2]),this.h()},l(c){e=W(c,"OPTION",{});var a=J(e);s=te(a,t[2]),a.forEach(b),this.h()},h(){e.__value="",E(e,e.__value),e.disabled=!0,e.selected=d=t[0]===""},m(c,a){N(c,e,a),V(e,s)},p(c,a){a&4&&ee(s,c[2]),a&3&&d!==(d=c[0]==="")&&(e.selected=d)},d(c){c&&b(e)}}}function B(t){let e,s=t[15].label+"",d,c;return{c(){e=D("option"),d=le(s),this.h()},l(a){e=W(a,"OPTION",{});var i=J(e);d=te(i,s),i.forEach(b),this.h()},h(){e.__value=c=t[15].value,E(e,e.__value)},m(a,i){N(a,e,i),V(e,d)},p(a,i){i&2&&s!==(s=a[15].label+"")&&ee(d,s),i&2&&c!==(c=a[15].value)&&(e.__value=c,E(e,e.__value))},d(a){a&&b(e)}}}function ge(t){let e,s,d,c,a,i=t[2]&&j(t),f=A(t[1]),r=[];for(let l=0;l<f.length;l+=1)r[l]=B(M(t,f,l));let m=[{disabled:t[3]},{required:t[4]},{class:d="bg-v-bg-elevated text-v-text-primary border rounded-v-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed "+t[7]+" "+t[6]+" "+(t[5]?"w-full":"")},t[8]],p={};for(let l=0;l<m.length;l+=1)p=q(p,m[l]);return{c(){e=D("select"),i&&i.c(),s=T();for(let l=0;l<r.length;l+=1)r[l].c();this.h()},l(l){e=W(l,"SELECT",{class:!0});var u=J(e);i&&i.l(u),s=T();for(let o=0;o<r.length;o+=1)r[o].l(u);u.forEach(b),this.h()},h(){I(e,p),t[0]===void 0&&pe(()=>t[14].call(e))},m(l,u){N(l,e,u),i&&i.m(e,null),V(e,s);for(let o=0;o<r.length;o+=1)r[o]&&r[o].m(e,null);"value"in p&&(p.multiple?L:y)(e,p.value),e.autofocus&&e.focus(),y(e,t[0],!0),c||(a=[v(e,"change",t[14]),v(e,"change",t[11]),v(e,"focus",t[12]),v(e,"blur",t[13])],c=!0)},p(l,[u]){if(l[2]?i?i.p(l,u):(i=j(l),i.c(),i.m(e,s)):i&&(i.d(1),i=null),u&2){f=A(l[1]);let o;for(o=0;o<f.length;o+=1){const g=M(l,f,o);r[o]?r[o].p(g,u):(r[o]=B(g),r[o].c(),r[o].m(e,null))}for(;o<r.length;o+=1)r[o].d(1);r.length=f.length}I(e,p=he(m,[u&8&&{disabled:l[3]},u&16&&{required:l[4]},u&224&&d!==(d="bg-v-bg-elevated text-v-text-primary border rounded-v-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed "+l[7]+" "+l[6]+" "+(l[5]?"w-full":""))&&{class:d},u&256&&l[8]])),u&504&&"value"in p&&(p.multiple?L:y)(e,p.value),u&3&&y(e,l[0])},i:P,o:P,d(l){l&&b(e),i&&i.d(),ce(r,l),c=!1,ue(a)}}}function ye(t,e,s){let d,c;const a=["value","options","placeholder","size","disabled","required","error","fullWidth"];let i=w(e,a),{value:f=""}=e,{options:r=[]}=e,{placeholder:m="Select an option"}=e,{size:p="md"}=e,{disabled:l=!1}=e,{required:u=!1}=e,{error:o=""}=e,{fullWidth:g=!1}=e;function se(n){C.call(this,t,n)}function ie(n){C.call(this,t,n)}function oe(n){C.call(this,t,n)}function ne(){f=me(this),s(0,f),s(1,r)}return t.$$set=n=>{e=q(q({},e),fe(n)),s(8,i=w(e,a)),"value"in n&&s(0,f=n.value),"options"in n&&s(1,r=n.options),"placeholder"in n&&s(2,m=n.placeholder),"size"in n&&s(9,p=n.size),"disabled"in n&&s(3,l=n.disabled),"required"in n&&s(4,u=n.required),"error"in n&&s(10,o=n.error),"fullWidth"in n&&s(5,g=n.fullWidth)},t.$$.update=()=>{t.$$.dirty&512&&s(7,d={sm:"px-v-3 py-v-2 text-v-sm",md:"px-v-4 py-v-3 text-v-base",lg:"px-v-5 py-v-4 text-v-lg"}[p]),t.$$.dirty&1024&&s(6,c=o?"border-v-error focus:ring-v-error":"border-v-border focus:ring-v-primary")},[f,r,m,l,u,g,c,d,i,p,o,se,ie,oe,ne]}class z extends ae{constructor(e){super(),re(this,e,ye,ge,de,{value:0,options:1,placeholder:2,size:9,disabled:3,required:4,error:10,fullWidth:5})}}z.__docgen={version:3,name:"Select.svelte",data:[{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"options",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"array",text:"{ value: string; label: string; }[]"},static:!1,readonly:!1,defaultValue:"[]"},{name:"placeholder",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"Select an option"'},{name:"size",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'},{name:"disabled",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"required",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"error",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"fullWidth",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"}],computed:[],methods:[],components:[],description:"Select - Dropdown selection",keywords:[{name:"component",description:""}],events:[{keywords:[],visibility:"public",description:"",name:"change",parent:"select",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"focus",parent:"select",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"blur",parent:"select",modificators:[],locations:null}],slots:[],refs:[]};const h=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}],Oe={title:"Primitives/Select",component:z,tags:["autodocs"]},_={args:{options:h,placeholder:"Choose an option",size:"md"}},k={render:()=>({Component:be,props:{gap:"3"},slots:{default:`
        <Select size="sm" options=${JSON.stringify(h)} placeholder="Small" />
        <Select size="md" options=${JSON.stringify(h)} placeholder="Medium" />
        <Select size="lg" options=${JSON.stringify(h)} placeholder="Large" />
      `}})},S={render:()=>({Component:z,props:{options:h,error:"Selection required"}})},O={render:()=>({Component:z,props:{options:h,disabled:!0}})};var F,G,H;_.parameters={..._.parameters,docs:{...(F=_.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    options: mockOptions,
    placeholder: 'Choose an option',
    size: 'md'
  }
}`,...(H=(G=_.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var K,Q,R;k.parameters={...k.parameters,docs:{...(K=k.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '3'
    },
    slots: {
      default: \`
        <Select size="sm" options=\${JSON.stringify(mockOptions)} placeholder="Small" />
        <Select size="md" options=\${JSON.stringify(mockOptions)} placeholder="Medium" />
        <Select size="lg" options=\${JSON.stringify(mockOptions)} placeholder="Large" />
      \`
    }
  })
}`,...(R=(Q=k.parameters)==null?void 0:Q.docs)==null?void 0:R.source}}};var U,X,Y;S.parameters={...S.parameters,docs:{...(U=S.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => ({
    Component: Select,
    props: {
      options: mockOptions,
      error: 'Selection required'
    }
  })
}`,...(Y=(X=S.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,x,$;O.parameters={...O.parameters,docs:{...(Z=O.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => ({
    Component: Select,
    props: {
      options: mockOptions,
      disabled: true
    }
  })
}`,...($=(x=O.parameters)==null?void 0:x.docs)==null?void 0:$.source}}};const ze=["Default","Sizes","WithError","Disabled"];export{_ as Default,O as Disabled,k as Sizes,S as WithError,ze as __namedExportsOrder,Oe as default};
