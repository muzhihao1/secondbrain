import{S as re,i as oe,s as ce,a as T,m as de,d as y,r as ue,t as fe,k as pe,b as O,K as U,v as h,u as be,o as me,p as he,c as ie,w as g,x as C,e as w,f as M,y as I,g as z,z as B,h as F,j as ge,A as ke,B as _e,C as ye}from"./index-CVxsGfYe.js";import{b as N}from"./lifecycle-DaBqEg2E.js";import{g as ve}from"./spread-CgU5AtxT.js";import{S as q}from"./Stack-00JChciI.js";import"./Inline-Ky187HZW.js";function G(s){let e,l;return{c(){e=z("span"),l=ye(s[2]),this.h()},l(n){e=w(n,"SPAN",{class:!0});var o=M(e);l=_e(o,s[2]),o.forEach(y),this.h()},h(){h(e,"class","text-v-base text-v-text-primary select-none")},m(n,o){ie(n,e,o),g(e,l)},p(n,o){o&4&&ke(l,n[2])},d(n){n&&y(e)}}}function Se(s){let e,l,n,o,d,f,p,u,k,b,m,r,v,E,S=[{type:"checkbox"},{disabled:s[1]},{"aria-label":n=s[3]||s[2]},{class:"sr-only peer"},s[5]],_={};for(let t=0;t<S.length;t+=1)_=T(_,S[t]);let a=s[2]&&G(s);const A=s[8].default,c=de(A,s,s[7],null);return{c(){e=z("label"),l=z("input"),o=B(),d=z("div"),f=z("div"),k=B(),a&&a.c(),b=B(),c&&c.c(),this.h()},l(t){e=w(t,"LABEL",{class:!0});var i=M(e);l=w(i,"INPUT",{type:!0,"aria-label":!0,class:!0}),o=I(i),d=w(i,"DIV",{class:!0});var K=M(d);f=w(K,"DIV",{class:!0}),M(f).forEach(y),K.forEach(y),k=I(i),a&&a.l(i),b=I(i),c&&c.l(i),i.forEach(y),this.h()},h(){O(l,_),U(l,"svelte-js1prl"),h(f,"class",p="absolute top-0.5 left-0.5 "+s[4].thumb+" bg-white rounded-v-full transition-transform duration-200 "+(s[0]?s[4].translate:"")+" svelte-js1prl"),h(d,"class",u="relative "+s[4].container+" bg-v-secondary rounded-v-full transition-colors duration-200 peer-checked:bg-v-primary peer-focus:ring-2 peer-focus:ring-v-primary peer-focus:ring-offset-2 svelte-js1prl"),h(e,"class",m="inline-flex items-center gap-v-3 cursor-pointer "+(s[1]?"opacity-50 cursor-not-allowed":""))},m(t,i){ie(t,e,i),g(e,l),l.autofocus&&l.focus(),l.checked=s[0],g(e,o),g(e,d),g(d,f),g(e,k),a&&a.m(e,null),g(e,b),c&&c.m(e,null),r=!0,v||(E=[C(l,"change",s[12]),C(l,"change",s[9]),C(l,"focus",s[10]),C(l,"blur",s[11])],v=!0)},p(t,[i]){O(l,_=ve(S,[{type:"checkbox"},(!r||i&2)&&{disabled:t[1]},(!r||i&12&&n!==(n=t[3]||t[2]))&&{"aria-label":n},{class:"sr-only peer"},i&32&&t[5]])),i&1&&(l.checked=t[0]),U(l,"svelte-js1prl"),(!r||i&17&&p!==(p="absolute top-0.5 left-0.5 "+t[4].thumb+" bg-white rounded-v-full transition-transform duration-200 "+(t[0]?t[4].translate:"")+" svelte-js1prl"))&&h(f,"class",p),(!r||i&16&&u!==(u="relative "+t[4].container+" bg-v-secondary rounded-v-full transition-colors duration-200 peer-checked:bg-v-primary peer-focus:ring-2 peer-focus:ring-v-primary peer-focus:ring-offset-2 svelte-js1prl"))&&h(d,"class",u),t[2]?a?a.p(t,i):(a=G(t),a.c(),a.m(e,b)):a&&(a.d(1),a=null),c&&c.p&&(!r||i&128)&&be(c,A,t,t[7],r?he(A,t[7],i,null):me(t[7]),null),(!r||i&2&&m!==(m="inline-flex items-center gap-v-3 cursor-pointer "+(t[1]?"opacity-50 cursor-not-allowed":"")))&&h(e,"class",m)},i(t){r||(pe(c,t),r=!0)},o(t){fe(c,t),r=!1},d(t){t&&y(e),a&&a.d(),c&&c.d(t),v=!1,ue(E)}}}function we(s,e,l){let n;const o=["checked","disabled","label","ariaLabel","size"];let d=F(e,o),{$$slots:f={},$$scope:p}=e,{checked:u=!1}=e,{disabled:k=!1}=e,{label:b=""}=e,{ariaLabel:m=""}=e,{size:r="md"}=e;function v(a){N.call(this,s,a)}function E(a){N.call(this,s,a)}function S(a){N.call(this,s,a)}function _(){u=this.checked,l(0,u)}return s.$$set=a=>{e=T(T({},e),ge(a)),l(5,d=F(e,o)),"checked"in a&&l(0,u=a.checked),"disabled"in a&&l(1,k=a.disabled),"label"in a&&l(2,b=a.label),"ariaLabel"in a&&l(3,m=a.ariaLabel),"size"in a&&l(6,r=a.size),"$$scope"in a&&l(7,p=a.$$scope)},s.$$.update=()=>{s.$$.dirty&64&&l(4,n={sm:{container:"w-8 h-5",thumb:"w-3 h-3",translate:"translate-x-3"},md:{container:"w-11 h-6",thumb:"w-5 h-5",translate:"translate-x-5"},lg:{container:"w-14 h-7",thumb:"w-6 h-6",translate:"translate-x-7"}}[r])},[u,k,b,m,n,d,r,p,f,v,E,S,_]}class ne extends re{constructor(e){super(),oe(this,e,we,Se,ce,{checked:0,disabled:1,label:2,ariaLabel:3,size:6})}}ne.__docgen={version:3,name:"Switch.svelte",data:[{name:"checked",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"disabled",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"label",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"ariaLabel",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"size",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'}],computed:[],methods:[],components:[],description:"Switch - Toggle control",keywords:[{name:"component",description:""}],events:[{keywords:[],visibility:"public",description:"",name:"change",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"focus",parent:"input",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"blur",parent:"input",modificators:[],locations:null}],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};const je={title:"Primitives/Switch",component:ne,tags:["autodocs"]},D={args:{label:"Enable notifications",checked:!1}},L={args:{label:"Enabled",checked:!0}},j={render:()=>({Component:q,props:{gap:"3"},slots:{default:`
        <Switch size="sm" label="Small switch" />
        <Switch size="md" label="Medium switch" />
        <Switch size="lg" label="Large switch" />
      `}})},V={render:()=>({Component:q,props:{gap:"2"},slots:{default:`
        <Switch label="Disabled off" disabled />
        <Switch label="Disabled on" checked disabled />
      `}})},P={render:()=>({Component:q,props:{gap:"4"},slots:{default:`
        <Switch label="Push notifications" checked />
        <Switch label="Email notifications" />
        <Switch label="SMS notifications" disabled />
      `}})};var H,J,Q;D.parameters={...D.parameters,docs:{...(H=D.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    label: 'Enable notifications',
    checked: false
  }
}`,...(Q=(J=D.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var R,W,X;L.parameters={...L.parameters,docs:{...(R=L.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Enabled',
    checked: true
  }
}`,...(X=(W=L.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,x;j.parameters={...j.parameters,docs:{...(Y=j.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '3'
    },
    slots: {
      default: \`
        <Switch size="sm" label="Small switch" />
        <Switch size="md" label="Medium switch" />
        <Switch size="lg" label="Large switch" />
      \`
    }
  })
}`,...(x=(Z=j.parameters)==null?void 0:Z.docs)==null?void 0:x.source}}};var $,ee,ae;V.parameters={...V.parameters,docs:{...($=V.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '2'
    },
    slots: {
      default: \`
        <Switch label="Disabled off" disabled />
        <Switch label="Disabled on" checked disabled />
      \`
    }
  })
}`,...(ae=(ee=V.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var te,se,le;P.parameters={...P.parameters,docs:{...(te=P.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '4'
    },
    slots: {
      default: \`
        <Switch label="Push notifications" checked />
        <Switch label="Email notifications" />
        <Switch label="SMS notifications" disabled />
      \`
    }
  })
}`,...(le=(se=P.parameters)==null?void 0:se.docs)==null?void 0:le.source}}};const Ve=["Default","Checked","Sizes","Disabled","SettingsExample"];export{L as Checked,D as Default,V as Disabled,P as SettingsExample,j as Sizes,Ve as __namedExportsOrder,je as default};
