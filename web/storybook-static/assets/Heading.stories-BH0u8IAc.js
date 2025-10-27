import{S as he,i as ke,s as He,d as w,t as xe,k as ye,c as ve,l as P,h as D,a as M,j as Se,m as Te,u as Be,o as Ce,p as _e,q as E,e as ze,f as we,g as Me}from"./index-CVxsGfYe.js";import{g as Ae}from"./spread-CgU5AtxT.js";import"./Text-DuqmmQzd.js";import{S as c}from"./Stack-00JChciI.js";import{B as fe}from"./Box-OVjt4Oy9.js";import"./Separator-C-4VFsIP.js";import"./lifecycle-DaBqEg2E.js";function z(n){let i,t,r;const o=n[16].default,e=Te(o,n,n[15],null);let d=[{class:t=""+n[4]+" "+n[3]+" "+n[2]+" "+n[1]+" "+n[0]+" leading-v-tight"},n[6]],g={};for(let a=0;a<d.length;a+=1)g=M(g,d[a]);return{c(){i=Me(n[5]),e&&e.c(),this.h()},l(a){i=ze(a,(n[5]||"null").toUpperCase(),{class:!0});var s=we(i);e&&e.l(s),s.forEach(w),this.h()},h(){E(n[5])(i,g)},m(a,s){ve(a,i,s),e&&e.m(i,null),r=!0},p(a,s){e&&e.p&&(!r||s&32768)&&Be(e,o,a,a[15],r?_e(o,a[15],s,null):Ce(a[15]),null),E(a[5])(i,g=Ae(d,[(!r||s&31&&t!==(t=""+a[4]+" "+a[3]+" "+a[2]+" "+a[1]+" "+a[0]+" leading-v-tight"))&&{class:t},s&64&&a[6]]))},i(a){r||(ye(e,a),r=!0)},o(a){xe(e,a),r=!1},d(a){a&&w(i),e&&e.d(a)}}}function We(n){let i=n[5],t,r,o=n[5]&&z(n);return{c(){o&&o.c(),t=P()},l(e){o&&o.l(e),t=P()},m(e,d){o&&o.m(e,d),ve(e,t,d),r=!0},p(e,[d]){e[5]?i?He(i,e[5])?(o.d(1),o=z(e),i=e[5],o.c(),o.m(t.parentNode,t)):o.p(e,d):(o=z(e),i=e[5],o.c(),o.m(t.parentNode,t)):i&&(o.d(1),o=null,i=e[5])},i(e){r||(ye(o,e),r=!0)},o(e){xe(o,e),r=!1},d(e){e&&w(t),o&&o.d(e)}}}function Le(n,i,t){let r,o,e,d,g,a,s,W;const L=["level","size","color","weight","align","marginBottom"];let R=D(i,L),{$$slots:be={},$$scope:q}=i,{level:m="2"}=i,{size:T=void 0}=i,{color:B="primary"}=i,{weight:C="bold"}=i,{align:_="left"}=i,{marginBottom:u="0"}=i;return n.$$set=l=>{i=M(M({},i),Se(l)),t(6,R=D(i,L)),"level"in l&&t(7,m=l.level),"size"in l&&t(8,T=l.size),"color"in l&&t(9,B=l.color),"weight"in l&&t(10,C=l.weight),"align"in l&&t(11,_=l.align),"marginBottom"in l&&t(12,u=l.marginBottom),"$$scope"in l&&t(15,q=l.$$scope)},n.$$.update=()=>{n.$$.dirty&128&&t(14,r={1:"5xl",2:"4xl",3:"3xl",4:"2xl",5:"xl",6:"xl"}[m]),n.$$.dirty&16640&&t(13,o=T||r),n.$$.dirty&128&&t(5,e=`h${m}`),n.$$.dirty&8192&&t(4,d=`text-v-${o}`),n.$$.dirty&512&&t(3,g={primary:"text-v-text-primary",secondary:"text-v-text-secondary",accent:"text-v-text-accent"}[B]),n.$$.dirty&1024&&t(2,a=`font-v-${C}`),n.$$.dirty&2048&&t(1,s=`text-${_}`),n.$$.dirty&4096&&t(0,W=u!=="0"?`mb-v-${u}`:"")},[W,s,a,g,d,e,R,m,T,B,C,_,u,o,r,q,be]}class A extends he{constructor(i){super(),ke(this,i,Le,We,He,{level:7,size:8,color:9,weight:10,align:11,marginBottom:12})}}A.__docgen={version:3,name:"Heading.svelte",data:[{name:"level",visibility:"public",description:"Semantic heading level (affects HTML element)",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"1",text:'"1"'},{kind:"const",type:"string",value:"2",text:'"2"'},{kind:"const",type:"string",value:"3",text:'"3"'},{kind:"const",type:"string",value:"4",text:'"4"'},{kind:"const",type:"string",value:"5",text:'"5"'},{kind:"const",type:"string",value:"6",text:'"6"'}],text:'"1" | "2" | "3" | "4" | "5" | "6"'},static:!1,readonly:!1,defaultValue:'"2"'},{name:"size",visibility:"public",description:"Visual size (can differ from semantic level)",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"xl",text:'"xl"'},{kind:"const",type:"string",value:"2xl",text:'"2xl"'},{kind:"const",type:"string",value:"3xl",text:'"3xl"'},{kind:"const",type:"string",value:"4xl",text:'"4xl"'},{kind:"const",type:"string",value:"5xl",text:'"5xl"'}],text:'"xl" | "2xl" | "3xl" | "4xl" | "5xl"'},static:!1,readonly:!1},{name:"color",visibility:"public",description:"Text color",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"primary",text:'"primary"'},{kind:"const",type:"string",value:"secondary",text:'"secondary"'},{kind:"const",type:"string",value:"accent",text:'"accent"'}],text:'"primary" | "secondary" | "accent"'},static:!1,readonly:!1,defaultValue:'"primary"'},{name:"weight",visibility:"public",description:"Font weight",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"normal",text:'"normal"'},{kind:"const",type:"string",value:"medium",text:'"medium"'},{kind:"const",type:"string",value:"semibold",text:'"semibold"'},{kind:"const",type:"string",value:"bold",text:'"bold"'}],text:'"normal" | "medium" | "semibold" | "bold"'},static:!1,readonly:!1,defaultValue:'"bold"'},{name:"align",visibility:"public",description:"Text alignment",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"left",text:'"left"'},{kind:"const",type:"string",value:"center",text:'"center"'},{kind:"const",type:"string",value:"right",text:'"right"'}],text:'"left" | "center" | "right"'},static:!1,readonly:!1,defaultValue:'"left"'},{name:"marginBottom",visibility:"public",description:"Bottom margin spacing",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"2",text:'"2"'},{kind:"const",type:"string",value:"4",text:'"4"'},{kind:"const",type:"string",value:"6",text:'"6"'},{kind:"const",type:"string",value:"0",text:'"0"'},{kind:"const",type:"string",value:"8",text:'"8"'}],text:'"2" | "4" | "6" | "0" | "8"'},static:!1,readonly:!1,defaultValue:'"0"'}],computed:[],methods:[],components:[],description:`Heading - Typography primitive for headings

Provides semantic heading levels (h1-h6) with consistent styling.
Maintains accessibility through proper HTML elements while allowing visual customization.`,keywords:[{name:"component",description:""},{name:"example",description:`<Heading level="1" size="4xl">
Page Title
</Heading>`}],events:[],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};const Ie={title:"Primitives/Heading",component:A,tags:["autodocs"],argTypes:{level:{control:"select",options:["1","2","3","4","5","6"],description:"Semantic HTML level"},size:{control:"select",options:["xl","2xl","3xl","4xl","5xl"],description:"Visual size (overrides default)"},color:{control:"select",options:["primary","secondary","accent"],description:"Text color"},weight:{control:"select",options:["normal","medium","semibold","bold"],description:"Font weight"},align:{control:"select",options:["left","center","right"],description:"Text alignment"},marginBottom:{control:"select",options:["0","2","4","6","8"],description:"Bottom margin"}}},p={args:{level:"2",color:"primary"},render:n=>({Component:A,props:n,slots:{default:"Heading Text"}})},H={render:()=>({Component:c,props:{gap:"4"},slots:{default:`
        <Heading level="1">Heading 1 - 5xl (Page Title)</Heading>
        <Heading level="2">Heading 2 - 4xl (Section Title)</Heading>
        <Heading level="3">Heading 3 - 3xl (Subsection)</Heading>
        <Heading level="4">Heading 4 - 2xl (Minor Heading)</Heading>
        <Heading level="5">Heading 5 - xl (Small Heading)</Heading>
        <Heading level="6">Heading 6 - xl (Smallest Heading)</Heading>
      `}})},x={render:()=>({Component:c,props:{gap:"4"},slots:{default:`
        <Heading level="3" size="5xl">H3 styled as 5xl</Heading>
        <Heading level="2" size="2xl">H2 styled as 2xl</Heading>
        <Heading level="1" size="xl">H1 styled as xl</Heading>
      `}})},y={render:()=>({Component:c,props:{gap:"3"},slots:{default:`
        <Heading level="2" color="primary">Primary Heading</Heading>
        <Heading level="2" color="secondary">Secondary Heading</Heading>
        <Heading level="2" color="accent">Accent Heading</Heading>
      `}})},v={render:()=>({Component:c,props:{gap:"3"},slots:{default:`
        <Heading level="2" weight="normal">Normal Weight</Heading>
        <Heading level="2" weight="medium">Medium Weight</Heading>
        <Heading level="2" weight="semibold">Semibold Weight</Heading>
        <Heading level="2" weight="bold">Bold Weight</Heading>
      `}})},f={render:()=>({Component:c,props:{gap:"4"},slots:{default:`
        <Box padding="4" background="surface" borderRadius="md">
          <Heading level="2" align="left">Left Aligned</Heading>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Heading level="2" align="center">Center Aligned</Heading>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Heading level="2" align="right">Right Aligned</Heading>
        </Box>
      `}})},b={render:()=>({Component:c,props:{gap:"0"},slots:{default:`
        <Heading level="2" marginBottom="2">Small Margin</Heading>
        <Text>Content immediately follows...</Text>

        <Heading level="2" marginBottom="6" style="margin-top: 2rem;">Large Margin</Heading>
        <Text>More space above this content...</Text>
      `}})},h={render:()=>({Component:c,props:{gap:"0"},slots:{default:`
        <Heading level="1" marginBottom="4">Article Title</Heading>
        <Text size="sm" color="tertiary" style="margin-bottom: 2rem;">
          Published on January 15, 2025 · 5 min read
        </Text>

        <Heading level="2" marginBottom="4">Introduction</Heading>
        <Text color="secondary" lineHeight="relaxed" style="margin-bottom: 1.5rem;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <Heading level="3" marginBottom="4">Key Concepts</Heading>
        <Text color="secondary" lineHeight="relaxed" style="margin-bottom: 1.5rem;">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>

        <Heading level="4" marginBottom="2">Implementation Details</Heading>
        <Text color="secondary" lineHeight="relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Text>
      `}})},k={render:()=>({Component:fe,props:{padding:"0",background:"surface",borderRadius:"lg",border:"default"},slots:{default:`
        <Stack gap="0">
          <Box padding="6">
            <Heading level="3" marginBottom="2">Dashboard Overview</Heading>
            <Text size="sm" color="secondary">
              Monitor your key metrics and performance
            </Text>
          </Box>

          <Separator />

          <Box padding="6">
            <Text>Card content goes here...</Text>
          </Box>
        </Stack>
      `}})},S={render:()=>({Component:fe,props:{padding:"12",background:"surface",borderRadius:"xl"},slots:{default:`
        <Stack gap="6">
          <Heading level="1" size="5xl" align="center" color="primary">
            Welcome to the Future
          </Heading>
          <Text size="lg" align="center" color="secondary" lineHeight="relaxed">
            Build amazing experiences with our comprehensive design system
          </Text>
          <div style="display: flex; justify-content: center; gap: 1rem;">
            <button style="padding: 0.75rem 1.5rem; background: var(--interactive-primary-default); color: white; border: none; border-radius: 0.5rem; font-weight: 600;">
              Get Started
            </button>
            <button style="padding: 0.75rem 1.5rem; background: var(--interactive-secondary-default); border: none; border-radius: 0.5rem; font-weight: 600;">
              Learn More
            </button>
          </div>
        </Stack>
      `}})};var V,F,I;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    level: '2',
    color: 'primary'
  },
  render: args => ({
    Component: Heading,
    props: args,
    slots: {
      default: 'Heading Text'
    }
  })
}`,...(I=(F=p.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var N,j,O;H.parameters={...H.parameters,docs:{...(N=H.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '4'
    },
    slots: {
      default: \`
        <Heading level="1">Heading 1 - 5xl (Page Title)</Heading>
        <Heading level="2">Heading 2 - 4xl (Section Title)</Heading>
        <Heading level="3">Heading 3 - 3xl (Subsection)</Heading>
        <Heading level="4">Heading 4 - 2xl (Minor Heading)</Heading>
        <Heading level="5">Heading 5 - xl (Small Heading)</Heading>
        <Heading level="6">Heading 6 - xl (Smallest Heading)</Heading>
      \`
    }
  })
}`,...(O=(j=H.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var U,G,J;x.parameters={...x.parameters,docs:{...(U=x.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '4'
    },
    slots: {
      default: \`
        <Heading level="3" size="5xl">H3 styled as 5xl</Heading>
        <Heading level="2" size="2xl">H2 styled as 2xl</Heading>
        <Heading level="1" size="xl">H1 styled as xl</Heading>
      \`
    }
  })
}`,...(J=(G=x.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,X;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '3'
    },
    slots: {
      default: \`
        <Heading level="2" color="primary">Primary Heading</Heading>
        <Heading level="2" color="secondary">Secondary Heading</Heading>
        <Heading level="2" color="accent">Accent Heading</Heading>
      \`
    }
  })
}`,...(X=(Q=y.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,$;v.parameters={...v.parameters,docs:{...(Y=v.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '3'
    },
    slots: {
      default: \`
        <Heading level="2" weight="normal">Normal Weight</Heading>
        <Heading level="2" weight="medium">Medium Weight</Heading>
        <Heading level="2" weight="semibold">Semibold Weight</Heading>
        <Heading level="2" weight="bold">Bold Weight</Heading>
      \`
    }
  })
}`,...($=(Z=v.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,ne,te;f.parameters={...f.parameters,docs:{...(ee=f.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '4'
    },
    slots: {
      default: \`
        <Box padding="4" background="surface" borderRadius="md">
          <Heading level="2" align="left">Left Aligned</Heading>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Heading level="2" align="center">Center Aligned</Heading>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Heading level="2" align="right">Right Aligned</Heading>
        </Box>
      \`
    }
  })
}`,...(te=(ne=f.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var ie,ae,oe;b.parameters={...b.parameters,docs:{...(ie=b.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '0'
    },
    slots: {
      default: \`
        <Heading level="2" marginBottom="2">Small Margin</Heading>
        <Text>Content immediately follows...</Text>

        <Heading level="2" marginBottom="6" style="margin-top: 2rem;">Large Margin</Heading>
        <Text>More space above this content...</Text>
      \`
    }
  })
}`,...(oe=(ae=b.parameters)==null?void 0:ae.docs)==null?void 0:oe.source}}};var re,le,se;h.parameters={...h.parameters,docs:{...(re=h.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '0'
    },
    slots: {
      default: \`
        <Heading level="1" marginBottom="4">Article Title</Heading>
        <Text size="sm" color="tertiary" style="margin-bottom: 2rem;">
          Published on January 15, 2025 · 5 min read
        </Text>

        <Heading level="2" marginBottom="4">Introduction</Heading>
        <Text color="secondary" lineHeight="relaxed" style="margin-bottom: 1.5rem;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <Heading level="3" marginBottom="4">Key Concepts</Heading>
        <Text color="secondary" lineHeight="relaxed" style="margin-bottom: 1.5rem;">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>

        <Heading level="4" marginBottom="2">Implementation Details</Heading>
        <Text color="secondary" lineHeight="relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Text>
      \`
    }
  })
}`,...(se=(le=h.parameters)==null?void 0:le.docs)==null?void 0:se.source}}};var de,ge,ce;k.parameters={...k.parameters,docs:{...(de=k.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => ({
    Component: Box,
    props: {
      padding: '0',
      background: 'surface',
      borderRadius: 'lg',
      border: 'default'
    },
    slots: {
      default: \`
        <Stack gap="0">
          <Box padding="6">
            <Heading level="3" marginBottom="2">Dashboard Overview</Heading>
            <Text size="sm" color="secondary">
              Monitor your key metrics and performance
            </Text>
          </Box>

          <Separator />

          <Box padding="6">
            <Text>Card content goes here...</Text>
          </Box>
        </Stack>
      \`
    }
  })
}`,...(ce=(ge=k.parameters)==null?void 0:ge.docs)==null?void 0:ce.source}}};var me,ue,pe;S.parameters={...S.parameters,docs:{...(me=S.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => ({
    Component: Box,
    props: {
      padding: '12',
      background: 'surface',
      borderRadius: 'xl'
    },
    slots: {
      default: \`
        <Stack gap="6">
          <Heading level="1" size="5xl" align="center" color="primary">
            Welcome to the Future
          </Heading>
          <Text size="lg" align="center" color="secondary" lineHeight="relaxed">
            Build amazing experiences with our comprehensive design system
          </Text>
          <div style="display: flex; justify-content: center; gap: 1rem;">
            <button style="padding: 0.75rem 1.5rem; background: var(--interactive-primary-default); color: white; border: none; border-radius: 0.5rem; font-weight: 600;">
              Get Started
            </button>
            <button style="padding: 0.75rem 1.5rem; background: var(--interactive-secondary-default); border: none; border-radius: 0.5rem; font-weight: 600;">
              Learn More
            </button>
          </div>
        </Stack>
      \`
    }
  })
}`,...(pe=(ue=S.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};const Ne=["Default","AllLevels","CustomSizes","Colors","Weights","Alignment","WithMargin","ArticleExample","CardHeaderExample","HeroSectionExample"];export{f as Alignment,H as AllLevels,h as ArticleExample,k as CardHeaderExample,y as Colors,x as CustomSizes,p as Default,S as HeroSectionExample,v as Weights,b as WithMargin,Ne as __namedExportsOrder,Ie as default};
