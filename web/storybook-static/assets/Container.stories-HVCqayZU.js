import{S as U,i as V,s as N,d as v,t as H,k as X,c as I,l as h,h as C,a as b,j as G,m as W,u as j,o as O,p as A,q as _,e as F,f as J,g as K}from"./index-CVxsGfYe.js";import{g as Q}from"./spread-CgU5AtxT.js";import"./Box-OVjt4Oy9.js";import{S as Y}from"./Stack-00JChciI.js";import"./lifecycle-DaBqEg2E.js";function y(o){let t,r,i;const n=o[7].default,e=W(n,o,o[6],null);let d=[{class:r="mx-auto w-full "+o[2]+" "+o[1]},o[3]],c={};for(let a=0;a<d.length;a+=1)c=b(c,d[a]);return{c(){t=K(o[0]),e&&e.c(),this.h()},l(a){t=F(a,(o[0]||"null").toUpperCase(),{class:!0});var s=J(t);e&&e.l(s),s.forEach(v),this.h()},h(){_(o[0])(t,c)},m(a,s){I(a,t,s),e&&e.m(t,null),i=!0},p(a,s){e&&e.p&&(!i||s&64)&&j(e,n,a,a[6],i?A(n,a[6],s,null):O(a[6]),null),_(a[0])(t,c=Q(d,[(!i||s&6&&r!==(r="mx-auto w-full "+a[2]+" "+a[1]))&&{class:r},s&8&&a[3]]))},i(a){i||(X(e,a),i=!0)},o(a){H(e,a),i=!1},d(a){a&&v(t),e&&e.d(a)}}}function Z(o){let t=o[0],r,i,n=o[0]&&y(o);return{c(){n&&n.c(),r=h()},l(e){n&&n.l(e),r=h()},m(e,d){n&&n.m(e,d),I(e,r,d),i=!0},p(e,[d]){e[0]?t?N(t,e[0])?(n.d(1),n=y(e),t=e[0],n.c(),n.m(r.parentNode,r)):n.p(e,d):(n=y(e),t=e[0],n.c(),n.m(r.parentNode,r)):t&&(n.d(1),n=null,t=e[0])},i(e){i||(X(n,e),i=!0)},o(e){H(n,e),i=!1},d(e){e&&v(r),n&&n.d(e)}}}function $(o,t,r){let i,n;const e=["size","padding","as"];let d=C(t,e),{$$slots:c={},$$scope:a}=t,{size:s="lg"}=t,{padding:m="4"}=t,{as:k="div"}=t;return o.$$set=l=>{t=b(b({},t),G(l)),r(3,d=C(t,e)),"size"in l&&r(4,s=l.size),"padding"in l&&r(5,m=l.padding),"as"in l&&r(0,k=l.as),"$$scope"in l&&r(6,a=l.$$scope)},o.$$.update=()=>{o.$$.dirty&16&&r(2,i={sm:"max-w-v-sm",md:"max-w-v-md",lg:"max-w-v-lg",xl:"max-w-v-xl","2xl":"max-w-v-2xl",full:"max-w-full"}[s]),o.$$.dirty&32&&r(1,n=m!=="0"?`px-v-${m}`:"")},[k,n,i,d,s,m,a,c]}class p extends U{constructor(t){super(),V(this,t,$,Z,N,{size:4,padding:5,as:0})}}p.__docgen={version:3,name:"Container.svelte",data:[{name:"size",visibility:"public",description:"Maximum width constraint",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'},{kind:"const",type:"string",value:"xl",text:'"xl"'},{kind:"const",type:"string",value:"2xl",text:'"2xl"'},{kind:"const",type:"string",value:"full",text:'"full"'}],text:'"sm" | "md" | "lg" | "xl" | "2xl" | "full"'},static:!1,readonly:!1,defaultValue:'"lg"'},{name:"padding",visibility:"public",description:"Horizontal padding",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"0",text:'"0"'},{kind:"const",type:"string",value:"2",text:'"2"'},{kind:"const",type:"string",value:"4",text:'"4"'},{kind:"const",type:"string",value:"6",text:'"6"'},{kind:"const",type:"string",value:"8",text:'"8"'}],text:'"0" | "2" | "4" | "6" | "8"'},static:!1,readonly:!1,defaultValue:'"4"'},{name:"as",visibility:"public",description:"HTML element to render",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"div",text:'"div"'},{kind:"const",type:"string",value:"main",text:'"main"'},{kind:"const",type:"string",value:"section",text:'"section"'},{kind:"const",type:"string",value:"article",text:'"article"'}],text:'"div" | "main" | "section" | "article"'},static:!1,readonly:!1,defaultValue:'"div"'}],computed:[],methods:[],components:[],description:`Container - Content width constrainer

Limits content width to standard breakpoints and centers horizontally.
Ideal for creating consistent page layouts with controlled content width.`,keywords:[{name:"component",description:""},{name:"example",description:`<Container size="lg">
<h1>Page Title</h1>
<p>Content constrained to readable width...</p>
</Container>`}],events:[],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};const re={title:"Primitives/Container",component:p,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg","xl","2xl","full"],description:"Max width constraint"},padding:{control:"select",options:["0","2","4","6","8"],description:"Horizontal padding"},as:{control:"select",options:["div","main","section","article"],description:"HTML element"}}},u={args:{size:"lg",padding:"4"},render:o=>({Component:p,props:o,slots:{default:`
        <Box padding="6" background="surface" borderRadius="lg">
          <h2 style="margin: 0 0 1rem 0; color: var(--text-primary);">Contained Content</h2>
          <p style="margin: 0; color: var(--text-secondary);">
            This content is constrained to a maximum width and centered horizontally.
            It provides a consistent, readable layout across different screen sizes.
          </p>
        </Box>
      `}})},g={render:()=>({Component:Y,props:{gap:"6"},slots:{default:`
        <Container size="sm" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>SM (640px)</strong> - Narrow content
          </Box>
        </Container>
        <Container size="md" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>MD (768px)</strong> - Medium content
          </Box>
        </Container>
        <Container size="lg" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>LG (1024px)</strong> - Default width
          </Box>
        </Container>
        <Container size="xl" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>XL (1280px)</strong> - Wide content
          </Box>
        </Container>
        <Container size="2xl" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>2XL (1536px)</strong> - Extra wide
          </Box>
        </Container>
      `}})},x={render:()=>({Component:p,props:{size:"lg",padding:"6",as:"main"},slots:{default:`
        <Stack gap="8">
          <Box as="header">
            <h1 style="margin: 0; color: var(--text-primary); font-size: 2.5rem;">
              Page Title
            </h1>
            <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary);">
              Subtitle or description goes here
            </p>
          </Box>

          <Stack gap="4">
            <Box padding="6" background="surface" borderRadius="lg">
              <h2 style="margin: 0 0 1rem 0; color: var(--text-primary);">Section 1</h2>
              <p style="margin: 0; color: var(--text-secondary);">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Box>

            <Box padding="6" background="surface" borderRadius="lg">
              <h2 style="margin: 0 0 1rem 0; color: var(--text-primary);">Section 2</h2>
              <p style="margin: 0; color: var(--text-secondary);">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </Box>
          </Stack>
        </Stack>
      `}})},f={render:()=>({Component:p,props:{size:"md",padding:"0"},slots:{default:`
        <Box padding="4" background="surface" borderRadius="none" style="border: 2px solid var(--surface-border-accent);">
          Container with no padding - content touches edges on mobile
        </Box>
      `}})};var B,z,S;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    padding: '4'
  },
  render: args => ({
    Component: Container,
    props: args,
    slots: {
      default: \`
        <Box padding="6" background="surface" borderRadius="lg">
          <h2 style="margin: 0 0 1rem 0; color: var(--text-primary);">Contained Content</h2>
          <p style="margin: 0; color: var(--text-secondary);">
            This content is constrained to a maximum width and centered horizontally.
            It provides a consistent, readable layout across different screen sizes.
          </p>
        </Box>
      \`
    }
  })
}`,...(S=(z=u.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};var w,R,L;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '6'
    },
    slots: {
      default: \`
        <Container size="sm" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>SM (640px)</strong> - Narrow content
          </Box>
        </Container>
        <Container size="md" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>MD (768px)</strong> - Medium content
          </Box>
        </Container>
        <Container size="lg" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>LG (1024px)</strong> - Default width
          </Box>
        </Container>
        <Container size="xl" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>XL (1280px)</strong> - Wide content
          </Box>
        </Container>
        <Container size="2xl" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>2XL (1536px)</strong> - Extra wide
          </Box>
        </Container>
      \`
    }
  })
}`,...(L=(R=g.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var M,P,T;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => ({
    Component: Container,
    props: {
      size: 'lg',
      padding: '6',
      as: 'main'
    },
    slots: {
      default: \`
        <Stack gap="8">
          <Box as="header">
            <h1 style="margin: 0; color: var(--text-primary); font-size: 2.5rem;">
              Page Title
            </h1>
            <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary);">
              Subtitle or description goes here
            </p>
          </Box>

          <Stack gap="4">
            <Box padding="6" background="surface" borderRadius="lg">
              <h2 style="margin: 0 0 1rem 0; color: var(--text-primary);">Section 1</h2>
              <p style="margin: 0; color: var(--text-secondary);">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Box>

            <Box padding="6" background="surface" borderRadius="lg">
              <h2 style="margin: 0 0 1rem 0; color: var(--text-primary);">Section 2</h2>
              <p style="margin: 0; color: var(--text-secondary);">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </Box>
          </Stack>
        </Stack>
      \`
    }
  })
}`,...(T=(P=x.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var q,D,E;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => ({
    Component: Container,
    props: {
      size: 'md',
      padding: '0'
    },
    slots: {
      default: \`
        <Box padding="4" background="surface" borderRadius="none" style="border: 2px solid var(--surface-border-accent);">
          Container with no padding - content touches edges on mobile
        </Box>
      \`
    }
  })
}`,...(E=(D=f.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};const ie=["Default","Sizes","PageLayoutExample","NoPadding"];export{u as Default,f as NoPadding,x as PageLayoutExample,g as Sizes,ie as __namedExportsOrder,re as default};
