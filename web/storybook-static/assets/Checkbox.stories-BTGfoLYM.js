import{S as X,i as Y,s as Z,a as L,m as $,d as S,r as ee,t as ae,k as le,b as A,u as se,o as te,p as ie,v as x,c as M,w as C,x as k,e as O,f as Q,y as V,g as w,z as E,h as P,j as ne,A as oe,B as re,C as ce}from"./index-CVxsGfYe.js";import{b as D}from"./lifecycle-DaBqEg2E.js";import{g as de}from"./spread-CgU5AtxT.js";import{S as R}from"./Stack-00JChciI.js";function B(t){let a,s;return{c(){a=w("span"),s=ce(t[2]),this.h()},l(n){a=O(n,"SPAN",{class:!0});var c=Q(a);s=re(c,t[2]),c.forEach(S),this.h()},h(){x(a,"class","text-v-base text-v-text-primary select-none")},m(n,c){M(n,a,c),C(a,s)},p(n,c){c&4&&oe(s,n[2])},d(n){n&&S(a)}}}function ue(t){let a,s,n,c,b,d,o,f,m,p=[{type:"checkbox"},{__value:t[3]},{disabled:t[1]},{"aria-label":n=t[4]||t[2]},{class:"w-v-5 h-v-5 rounded-v-sm border-2 border-v-border bg-v-bg-elevated text-v-primary focus:ring-2 focus:ring-v-primary focus:ring-offset-0 disabled:cursor-not-allowed transition-colors duration-200 "},t[5]],u={};for(let l=0;l<p.length;l+=1)u=L(u,p[l]);let i=t[2]&&B(t);const h=t[7].default,r=$(h,t,t[6],null);return{c(){a=w("label"),s=w("input"),c=E(),i&&i.c(),b=E(),r&&r.c(),this.h()},l(l){a=O(l,"LABEL",{class:!0});var e=Q(a);s=O(e,"INPUT",{type:!0,"aria-label":!0,class:!0}),c=V(e),i&&i.l(e),b=V(e),r&&r.l(e),e.forEach(S),this.h()},h(){A(s,u),x(a,"class",d="inline-flex items-center gap-v-2 cursor-pointer "+(t[1]?"opacity-50 cursor-not-allowed":""))},m(l,e){M(l,a,e),C(a,s),s.autofocus&&s.focus(),s.checked=t[0],C(a,c),i&&i.m(a,null),C(a,b),r&&r.m(a,null),o=!0,f||(m=[k(s,"change",t[11]),k(s,"change",t[8]),k(s,"focus",t[9]),k(s,"blur",t[10])],f=!0)},p(l,[e]){A(s,u=de(p,[{type:"checkbox"},(!o||e&8)&&{__value:l[3]},(!o||e&2)&&{disabled:l[1]},(!o||e&20&&n!==(n=l[4]||l[2]))&&{"aria-label":n},{class:"w-v-5 h-v-5 rounded-v-sm border-2 border-v-border bg-v-bg-elevated text-v-primary focus:ring-2 focus:ring-v-primary focus:ring-offset-0 disabled:cursor-not-allowed transition-colors duration-200 "},e&32&&l[5]])),e&1&&(s.checked=l[0]),l[2]?i?i.p(l,e):(i=B(l),i.c(),i.m(a,b)):i&&(i.d(1),i=null),r&&r.p&&(!o||e&64)&&se(r,h,l,l[6],o?ie(h,l[6],e,null):te(l[6]),null),(!o||e&2&&d!==(d="inline-flex items-center gap-v-2 cursor-pointer "+(l[1]?"opacity-50 cursor-not-allowed":"")))&&x(a,"class",d)},i(l){o||(le(r,l),o=!0)},o(l){ae(r,l),o=!1},d(l){l&&S(a),i&&i.d(),r&&r.d(l),f=!1,ee(m)}}}function be(t,a,s){const n=["checked","disabled","label","value","ariaLabel"];let c=P(a,n),{$$slots:b={},$$scope:d}=a,{checked:o=!1}=a,{disabled:f=!1}=a,{label:m=""}=a,{value:p=""}=a,{ariaLabel:u=""}=a;function i(e){D.call(this,t,e)}function h(e){D.call(this,t,e)}function r(e){D.call(this,t,e)}function l(){o=this.checked,s(0,o)}return t.$$set=e=>{a=L(L({},a),ne(e)),s(5,c=P(a,n)),"checked"in e&&s(0,o=e.checked),"disabled"in e&&s(1,f=e.disabled),"label"in e&&s(2,m=e.label),"value"in e&&s(3,p=e.value),"ariaLabel"in e&&s(4,u=e.ariaLabel),"$$scope"in e&&s(6,d=e.$$scope)},[o,f,m,p,u,c,d,b,i,h,r,l]}class W extends X{constructor(a){super(),Y(this,a,be,ue,Z,{checked:0,disabled:1,label:2,value:3,ariaLabel:4})}}W.__docgen={version:3,name:"Checkbox.svelte",data:[{name:"checked",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"disabled",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"label",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"ariaLabel",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'}],computed:[],methods:[],components:[],description:"Checkbox - Binary selection control",keywords:[{name:"component",description:""}],events:[{keywords:[],visibility:"public",description:"",name:"change",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"focus",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"blur",parent:"input",modificators:[],locations:null}],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};const ke={title:"Primitives/Checkbox",component:W,tags:["autodocs"]},_={args:{label:"Accept terms and conditions",checked:!1}},g={args:{label:"I agree",checked:!0}},y={render:()=>({Component:R,props:{gap:"2"},slots:{default:`
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" checked disabled />
      `}})},v={render:()=>({Component:R,props:{gap:"2"},slots:{default:`
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" checked />
      `}})};var I,G,N;_.parameters={..._.parameters,docs:{...(I=_.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions',
    checked: false
  }
}`,...(N=(G=_.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var j,q,z;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'I agree',
    checked: true
  }
}`,...(z=(q=g.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var T,U,F;y.parameters={...y.parameters,docs:{...(T=y.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '2'
    },
    slots: {
      default: \`
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" checked disabled />
      \`
    }
  })
}`,...(F=(U=y.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var H,J,K;v.parameters={...v.parameters,docs:{...(H=v.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '2'
    },
    slots: {
      default: \`
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" checked />
      \`
    }
  })
}`,...(K=(J=v.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const _e=["Default","Checked","Disabled","Group"];export{g as Checked,_ as Default,y as Disabled,v as Group,_e as __namedExportsOrder,ke as default};
