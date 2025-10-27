import{S as tn,i as an,s as on,m as sn,d as x,r as rn,t as ln,k as cn,u as un,o as dn,p as pn,v as d,c as hn,x as m,e as mn,f as vn,g as bn}from"./index-CVxsGfYe.js";import{b as v}from"./lifecycle-DaBqEg2E.js";import{I as p}from"./Inline-Ky187HZW.js";import"./spread-CgU5AtxT.js";function gn(n){let e,o,r,c,h;const u=n[11].default,i=sn(u,n,n[10],null);return{c(){e=bn("button"),i&&i.c(),this.h()},l(t){e=mn(t,"BUTTON",{type:!0,"aria-label":!0,class:!0});var s=vn(e);i&&i.l(s),s.forEach(x),this.h()},h(){d(e,"type",n[1]),e.disabled=n[0],d(e,"aria-label",n[2]),d(e,"class",o="inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-v-primary focus:ring-offset-2 "+n[6]+" "+n[5]+" "+n[4]+" "+n[3]+" svelte-1uhibkj")},m(t,s){hn(t,e,s),i&&i.m(e,null),r=!0,c||(h=[m(e,"click",n[12]),m(e,"mouseenter",n[13]),m(e,"mouseleave",n[14]),m(e,"focus",n[15]),m(e,"blur",n[16])],c=!0)},p(t,[s]){i&&i.p&&(!r||s&1024)&&un(i,u,t,t[10],r?pn(u,t[10],s,null):dn(t[10]),null),(!r||s&2)&&d(e,"type",t[1]),(!r||s&1)&&(e.disabled=t[0]),(!r||s&4)&&d(e,"aria-label",t[2]),(!r||s&120&&o!==(o="inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-v-primary focus:ring-offset-2 "+t[6]+" "+t[5]+" "+t[4]+" "+t[3]+" svelte-1uhibkj"))&&d(e,"class",o)},i(t){r||(cn(i,t),r=!0)},o(t){ln(i,t),r=!1},d(t){t&&x(e),i&&i.d(t),c=!1,rn(h)}}}function fn(n,e,o){let r,c,h,u,{$$slots:i={},$$scope:t}=e,{variant:s="ghost"}=e,{size:L="md"}=e,{disabled:k=!1}=e,{shape:w="square"}=e,{type:M="button"}=e,{ariaLabel:_=""}=e;function Y(a){v.call(this,n,a)}function Z(a){v.call(this,n,a)}function $(a){v.call(this,n,a)}function nn(a){v.call(this,n,a)}function en(a){v.call(this,n,a)}return n.$$set=a=>{"variant"in a&&o(7,s=a.variant),"size"in a&&o(8,L=a.size),"disabled"in a&&o(0,k=a.disabled),"shape"in a&&o(9,w=a.shape),"type"in a&&o(1,M=a.type),"ariaLabel"in a&&o(2,_=a.ariaLabel),"$$scope"in a&&o(10,t=a.$$scope)},n.$$.update=()=>{n.$$.dirty&128&&o(6,r={primary:"bg-v-primary hover:bg-v-primary-hover active:bg-v-primary-active text-white",secondary:"bg-v-secondary hover:bg-v-secondary-hover active:bg-v-secondary-active text-v-text-primary",ghost:"bg-transparent hover:bg-v-surface active:bg-v-surface-active text-v-text-primary"}[s]),n.$$.dirty&256&&o(5,c={sm:"p-v-1 text-v-sm",md:"p-v-2 text-v-base",lg:"p-v-3 text-v-lg"}[L]),n.$$.dirty&512&&o(4,h=w==="circle"?"rounded-v-full":"rounded-v-md"),n.$$.dirty&1&&o(3,u=k?"opacity-50 cursor-not-allowed":"cursor-pointer")},[k,M,_,u,h,c,r,s,L,w,t,i,Y,Z,$,nn,en]}class C extends tn{constructor(e){super(),an(this,e,fn,gn,on,{variant:7,size:8,disabled:0,shape:9,type:1,ariaLabel:2})}}C.__docgen={version:3,name:"IconButton.svelte",data:[{name:"variant",visibility:"public",description:"Button variant",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"primary",text:'"primary"'},{kind:"const",type:"string",value:"secondary",text:'"secondary"'},{kind:"const",type:"string",value:"ghost",text:'"ghost"'}],text:'"primary" | "secondary" | "ghost"'},static:!1,readonly:!1,defaultValue:'"ghost"'},{name:"size",visibility:"public",description:"Button size",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'},{name:"disabled",visibility:"public",description:"Disabled state",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"shape",visibility:"public",description:"Shape of the button",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"square",text:'"square"'},{kind:"const",type:"string",value:"circle",text:'"circle"'}],text:'"square" | "circle"'},static:!1,readonly:!1,defaultValue:'"square"'},{name:"type",visibility:"public",description:"HTML button type",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"button",text:'"button"'},{kind:"const",type:"string",value:"submit",text:'"submit"'},{kind:"const",type:"string",value:"reset",text:'"reset"'}],text:'"button" | "submit" | "reset"'},static:!1,readonly:!1,defaultValue:'"button"'},{name:"ariaLabel",visibility:"public",description:"Accessible label (required)",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'}],computed:[],methods:[],components:[],description:`IconButton - Button with icon only

Interactive button that displays only an icon without text.
Provides accessible alternative text through aria-label.`,keywords:[{name:"component",description:""},{name:"example",description:`<IconButton
aria-label="Close dialog"
variant="ghost"
size="md"
on:click={handleClose}
>
<CloseIcon />
</IconButton>`}],events:[{keywords:[],visibility:"public",description:"",name:"click",parent:"button",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"mouseenter",parent:"button",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"mouseleave",parent:"button",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"focus",parent:"button",modificators:[],locations:null},{keywords:[],visibility:"public",description:"",name:"blur",parent:"button",modificators:[],locations:null}],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};const l=({size:n=20})=>`
  <svg width="${n}" height="${n}" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
  </svg>
`,Ln={title:"Primitives/IconButton",component:C,tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost"],description:"Button visual style"},size:{control:"select",options:["sm","md","lg"],description:"Button size"},shape:{control:"select",options:["square","circle"],description:"Button shape"},disabled:{control:"boolean",description:"Disabled state"},ariaLabel:{control:"text",description:"Accessible label"},type:{control:"select",options:["button","submit","reset"],description:"HTML button type"},onClick:{action:"clicked"}}},b={args:{variant:"ghost",size:"md",shape:"square",ariaLabel:"Add item"},render:n=>({Component:C,props:n,slots:{default:l({size:20})}})},g={render:()=>({Component:p,props:{gap:"2",align:"center"},slots:{default:`
        <IconButton variant="primary" ariaLabel="Primary action">
          ${l({size:20})}
        </IconButton>
        <IconButton variant="secondary" ariaLabel="Secondary action">
          ${l({size:20})}
        </IconButton>
        <IconButton variant="ghost" ariaLabel="Ghost action">
          ${l({size:20})}
        </IconButton>
      `}})},f={render:()=>({Component:p,props:{gap:"2",align:"center"},slots:{default:`
        <IconButton size="sm" ariaLabel="Small">
          ${l({size:16})}
        </IconButton>
        <IconButton size="md" ariaLabel="Medium">
          ${l({size:20})}
        </IconButton>
        <IconButton size="lg" ariaLabel="Large">
          ${l({size:24})}
        </IconButton>
      `}})},y={render:()=>({Component:p,props:{gap:"2",align:"center"},slots:{default:`
        <IconButton shape="square" ariaLabel="Square button">
          ${l({size:20})}
        </IconButton>
        <IconButton shape="circle" ariaLabel="Circle button">
          ${l({size:20})}
        </IconButton>
      `}})},I={render:()=>({Component:p,props:{gap:"2",align:"center"},slots:{default:`
        <IconButton variant="primary" disabled ariaLabel="Disabled primary">
          ${l({size:20})}
        </IconButton>
        <IconButton variant="secondary" disabled ariaLabel="Disabled secondary">
          ${l({size:20})}
        </IconButton>
        <IconButton variant="ghost" disabled ariaLabel="Disabled ghost">
          ${l({size:20})}
        </IconButton>
      `}})},B={render:()=>({Component:p,props:{gap:"2",align:"center"},slots:{default:`
        <IconButton ariaLabel="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="Search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="Settings">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="More options">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="Favorite">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </IconButton>
      `}})},z={render:()=>({Component:p,props:{gap:"1",align:"center"},slots:{default:`
        <IconButton variant="ghost" ariaLabel="Bold" shape="square">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2a1 1 0 00-1 1v10a1 1 0 001 1h5a4 4 0 001.606-7.652A3.5 3.5 0 009 2H4zm4.5 9H5V9h3.5a1.5 1.5 0 110 3zM5 7V5h3a1.5 1.5 0 110 3H5z"/>
          </svg>
        </IconButton>

        <IconButton variant="ghost" ariaLabel="Italic" shape="square">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5.5 2a.5.5 0 000 1h2.768l-2.736 10H3.5a.5.5 0 000 1h5a.5.5 0 000-1H5.732L8.468 3h1.532a.5.5 0 000-1h-5z"/>
          </svg>
        </IconButton>

        <IconButton variant="ghost" ariaLabel="Underline" shape="square">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 2a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 013 2zm0 11a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 013 13zm5-9a3 3 0 00-3 3v2a3 3 0 106 0V7a3 3 0 00-3-3z"/>
          </svg>
        </IconButton>
      `}})};var S,q,A;b.parameters={...b.parameters,docs:{...(S=b.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md',
    shape: 'square',
    ariaLabel: 'Add item'
  },
  render: args => ({
    Component: IconButton,
    props: args,
    slots: {
      default: MockIcon({
        size: 20
      })
    }
  })
}`,...(A=(q=b.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var H,V,D;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '2',
      align: 'center'
    },
    slots: {
      default: \`
        <IconButton variant="primary" ariaLabel="Primary action">
          \${MockIcon({
        size: 20
      })}
        </IconButton>
        <IconButton variant="secondary" ariaLabel="Secondary action">
          \${MockIcon({
        size: 20
      })}
        </IconButton>
        <IconButton variant="ghost" ariaLabel="Ghost action">
          \${MockIcon({
        size: 20
      })}
        </IconButton>
      \`
    }
  })
}`,...(D=(V=g.parameters)==null?void 0:V.docs)==null?void 0:D.source}}};var T,j,E;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '2',
      align: 'center'
    },
    slots: {
      default: \`
        <IconButton size="sm" ariaLabel="Small">
          \${MockIcon({
        size: 16
      })}
        </IconButton>
        <IconButton size="md" ariaLabel="Medium">
          \${MockIcon({
        size: 20
      })}
        </IconButton>
        <IconButton size="lg" ariaLabel="Large">
          \${MockIcon({
        size: 24
      })}
        </IconButton>
      \`
    }
  })
}`,...(E=(j=f.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};var P,U,F;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '2',
      align: 'center'
    },
    slots: {
      default: \`
        <IconButton shape="square" ariaLabel="Square button">
          \${MockIcon({
        size: 20
      })}
        </IconButton>
        <IconButton shape="circle" ariaLabel="Circle button">
          \${MockIcon({
        size: 20
      })}
        </IconButton>
      \`
    }
  })
}`,...(F=(U=y.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var G,O,N;I.parameters={...I.parameters,docs:{...(G=I.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '2',
      align: 'center'
    },
    slots: {
      default: \`
        <IconButton variant="primary" disabled ariaLabel="Disabled primary">
          \${MockIcon({
        size: 20
      })}
        </IconButton>
        <IconButton variant="secondary" disabled ariaLabel="Disabled secondary">
          \${MockIcon({
        size: 20
      })}
        </IconButton>
        <IconButton variant="ghost" disabled ariaLabel="Disabled ghost">
          \${MockIcon({
        size: 20
      })}
        </IconButton>
      \`
    }
  })
}`,...(N=(O=I.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};var J,K,Q;B.parameters={...B.parameters,docs:{...(J=B.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '2',
      align: 'center'
    },
    slots: {
      default: \`
        <IconButton ariaLabel="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="Search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="Settings">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="More options">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="Favorite">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </IconButton>
      \`
    }
  })
}`,...(Q=(K=B.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var R,W,X;z.parameters={...z.parameters,docs:{...(R=z.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '1',
      align: 'center'
    },
    slots: {
      default: \`
        <IconButton variant="ghost" ariaLabel="Bold" shape="square">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2a1 1 0 00-1 1v10a1 1 0 001 1h5a4 4 0 001.606-7.652A3.5 3.5 0 009 2H4zm4.5 9H5V9h3.5a1.5 1.5 0 110 3zM5 7V5h3a1.5 1.5 0 110 3H5z"/>
          </svg>
        </IconButton>

        <IconButton variant="ghost" ariaLabel="Italic" shape="square">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5.5 2a.5.5 0 000 1h2.768l-2.736 10H3.5a.5.5 0 000 1h5a.5.5 0 000-1H5.732L8.468 3h1.532a.5.5 0 000-1h-5z"/>
          </svg>
        </IconButton>

        <IconButton variant="ghost" ariaLabel="Underline" shape="square">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 2a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 013 2zm0 11a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 013 13zm5-9a3 3 0 00-3 3v2a3 3 0 106 0V7a3 3 0 00-3-3z"/>
          </svg>
        </IconButton>
      \`
    }
  })
}`,...(X=(W=z.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};const kn=["Default","Variants","Sizes","Shapes","Disabled","CommonIcons","ToolbarExample"];export{B as CommonIcons,b as Default,I as Disabled,y as Shapes,f as Sizes,z as ToolbarExample,g as Variants,kn as __namedExportsOrder,Ln as default};
