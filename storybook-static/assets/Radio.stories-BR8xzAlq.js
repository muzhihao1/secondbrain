import{S as W,i as X,s as Y,a as D,m as Z,D as x,d as L,r as $,t as ee,k as ae,b as w,u as le,o as te,p as ie,v as C,c as H,w as S,x as y,e as V,f as J,y as E,g as A,z as P,h as O,j as se,A as ne,B as oe,C as re}from"./index-CVxsGfYe.js";import{b as z}from"./lifecycle-DaBqEg2E.js";import{g as ue}from"./spread-CgU5AtxT.js";import{S as K}from"./Stack-00JChciI.js";function B(t){let e,l;return{c(){e=A("span"),l=re(t[4]),this.h()},l(o){e=V(o,"SPAN",{class:!0});var d=J(e);l=oe(d,t[4]),d.forEach(L),this.h()},h(){C(e,"class","text-v-base text-v-text-primary select-none")},m(o,d){H(o,e,d),S(e,l)},p(o,d){d&16&&ne(l,o[4])},d(o){o&&L(e)}}}function de(t){let e,l,o,d,f,p,u,b,c,v,g=[{type:"radio"},{name:t[1]},{__value:t[2]},{disabled:t[3]},{"aria-label":o=t[5]||t[4]},{class:"w-v-5 h-v-5 rounded-v-full border-2 border-v-border bg-v-bg-elevated text-v-primary focus:ring-2 focus:ring-v-primary focus:ring-offset-0 disabled:cursor-not-allowed transition-colors duration-200 "},t[6]],m={};for(let a=0;a<g.length;a+=1)m=D(m,g[a]);let n=t[4]&&B(t);const _=t[8].default,r=Z(_,t,t[7],null);return b=x(t[13][0]),{c(){e=A("label"),l=A("input"),d=P(),n&&n.c(),f=P(),r&&r.c(),this.h()},l(a){e=V(a,"LABEL",{class:!0});var i=J(e);l=V(i,"INPUT",{type:!0,name:!0,"aria-label":!0,class:!0}),d=E(i),n&&n.l(i),f=E(i),r&&r.l(i),i.forEach(L),this.h()},h(){w(l,m),C(e,"class",p="inline-flex items-center gap-v-2 cursor-pointer "+(t[3]?"opacity-50 cursor-not-allowed":"")),b.p(l)},m(a,i){H(a,e,i),S(e,l),l.autofocus&&l.focus(),l.checked=l.__value===t[0],S(e,d),n&&n.m(e,null),S(e,f),r&&r.m(e,null),u=!0,c||(v=[y(l,"change",t[12]),y(l,"change",t[9]),y(l,"focus",t[10]),y(l,"blur",t[11])],c=!0)},p(a,[i]){w(l,m=ue(g,[{type:"radio"},(!u||i&2)&&{name:a[1]},(!u||i&4)&&{__value:a[2]},(!u||i&8)&&{disabled:a[3]},(!u||i&48&&o!==(o=a[5]||a[4]))&&{"aria-label":o},{class:"w-v-5 h-v-5 rounded-v-full border-2 border-v-border bg-v-bg-elevated text-v-primary focus:ring-2 focus:ring-v-primary focus:ring-offset-0 disabled:cursor-not-allowed transition-colors duration-200 "},i&64&&a[6]])),i&1&&(l.checked=l.__value===a[0]),a[4]?n?n.p(a,i):(n=B(a),n.c(),n.m(e,f)):n&&(n.d(1),n=null),r&&r.p&&(!u||i&128)&&le(r,_,a,a[7],u?ie(_,a[7],i,null):te(a[7]),null),(!u||i&8&&p!==(p="inline-flex items-center gap-v-2 cursor-pointer "+(a[3]?"opacity-50 cursor-not-allowed":"")))&&C(e,"class",p)},i(a){u||(ae(r,a),u=!0)},o(a){ee(r,a),u=!1},d(a){a&&L(e),n&&n.d(),r&&r.d(a),b.r(),c=!1,$(v)}}}function ce(t,e,l){const o=["name","value","group","disabled","label","ariaLabel"];let d=O(e,o),{$$slots:f={},$$scope:p}=e,{name:u=""}=e,{value:b=""}=e,{group:c=""}=e,{disabled:v=!1}=e,{label:g=""}=e,{ariaLabel:m=""}=e;const n=[[]];function _(s){z.call(this,t,s)}function r(s){z.call(this,t,s)}function a(s){z.call(this,t,s)}function i(){c=this.__value,l(0,c)}return t.$$set=s=>{e=D(D({},e),se(s)),l(6,d=O(e,o)),"name"in s&&l(1,u=s.name),"value"in s&&l(2,b=s.value),"group"in s&&l(0,c=s.group),"disabled"in s&&l(3,v=s.disabled),"label"in s&&l(4,g=s.label),"ariaLabel"in s&&l(5,m=s.ariaLabel),"$$scope"in s&&l(7,p=s.$$scope)},[c,u,b,v,g,m,d,p,f,_,r,a,i,n]}class Q extends W{constructor(e){super(),X(this,e,ce,de,Y,{name:1,value:2,group:0,disabled:3,label:4,ariaLabel:5})}}Q.__docgen={version:3,name:"Radio.svelte",data:[{name:"name",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"group",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"disabled",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"label",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"ariaLabel",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'}],computed:[],methods:[],components:[],description:"Radio - Single selection from group",keywords:[{name:"component",description:""}],events:[{keywords:[],visibility:"public",description:"",name:"change",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"focus",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"blur",parent:"input",modificators:[],locations:null}],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};const ge={title:"Primitives/Radio",component:Q,tags:["autodocs"]},h={args:{name:"option",value:"1",label:"Option 1"}},k={render:()=>({Component:K,props:{gap:"2"},slots:{default:`
        <Radio name="size" value="small" label="Small" />
        <Radio name="size" value="medium" label="Medium" />
        <Radio name="size" value="large" label="Large" />
      `}})},R={render:()=>({Component:K,props:{gap:"2"},slots:{default:`
        <Radio name="option" value="1" label="Disabled option" disabled />
        <Radio name="option" value="2" label="Available option" />
      `}})};var G,M,N;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    name: 'option',
    value: '1',
    label: 'Option 1'
  }
}`,...(N=(M=h.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};var j,q,I;k.parameters={...k.parameters,docs:{...(j=k.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '2'
    },
    slots: {
      default: \`
        <Radio name="size" value="small" label="Small" />
        <Radio name="size" value="medium" label="Medium" />
        <Radio name="size" value="large" label="Large" />
      \`
    }
  })
}`,...(I=(q=k.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};var T,U,F;R.parameters={...R.parameters,docs:{...(T=R.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '2'
    },
    slots: {
      default: \`
        <Radio name="option" value="1" label="Disabled option" disabled />
        <Radio name="option" value="2" label="Available option" />
      \`
    }
  })
}`,...(F=(U=R.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};const ve=["Default","Group","Disabled"];export{h as Default,R as Disabled,k as Group,ve as __namedExportsOrder,ge as default};
