import{B as r}from"./Box-OVjt4Oy9.js";import"./index-CVxsGfYe.js";import"./lifecycle-DaBqEg2E.js";import"./spread-CgU5AtxT.js";const D={title:"Primitives/Box",component:r,tags:["autodocs"],argTypes:{padding:{control:"select",options:["0","1","2","3","4","5","6","8","10","12"],description:"Internal spacing"},margin:{control:"select",options:["0","1","2","3","4","5","6","8","10","12"],description:"External spacing"},background:{control:"select",options:["transparent","bg-default","bg-elevated","surface","surface-hover"],description:"Background color"},borderRadius:{control:"select",options:["none","sm","md","lg","xl","full"],description:"Corner rounding"},border:{control:"select",options:["none","default","subtle","strong"],description:"Border style"},display:{control:"select",options:["block","inline-block","flex","inline-flex","grid","inline-grid"],description:"CSS display property"},as:{control:"select",options:["div","section","article","aside","main","header","footer","nav"],description:"HTML element to render"}}},e={args:{padding:"4",background:"surface",borderRadius:"md"},render:H=>({Component:r,props:H,slots:{default:"Box content"}})},d={render:()=>({Component:r,props:{},slots:{default:`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Box padding="2" background="surface" borderRadius="md">p-2</Box>
          <Box padding="4" background="surface" borderRadius="md">p-4</Box>
          <Box padding="6" background="surface" borderRadius="md">p-6</Box>
          <Box padding="8" background="surface" borderRadius="md">p-8</Box>
        </div>
      `}})},o={render:()=>({Component:r,props:{},slots:{default:`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Box padding="4" background="bg-default" borderRadius="md">bg-default</Box>
          <Box padding="4" background="bg-elevated" borderRadius="md">bg-elevated</Box>
          <Box padding="4" background="surface" borderRadius="md">surface</Box>
          <Box padding="4" background="surface-hover" borderRadius="md">surface-hover</Box>
        </div>
      `}})},a={render:()=>({Component:r,props:{},slots:{default:`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <Box padding="4" background="surface" borderRadius="none">none</Box>
          <Box padding="4" background="surface" borderRadius="sm">sm</Box>
          <Box padding="4" background="surface" borderRadius="md">md</Box>
          <Box padding="4" background="surface" borderRadius="lg">lg</Box>
          <Box padding="4" background="surface" borderRadius="xl">xl</Box>
        </div>
      `}})},n={render:()=>({Component:r,props:{},slots:{default:`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Box padding="4" background="surface" borderRadius="md" border="subtle">subtle</Box>
          <Box padding="4" background="surface" borderRadius="md" border="default">default</Box>
          <Box padding="4" background="surface" borderRadius="md" border="strong">strong</Box>
        </div>
      `}})},s={render:()=>({Component:r,props:{},slots:{default:`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <Box as="header" padding="4" background="surface" borderRadius="md">Header Element</Box>
          <Box as="main" padding="4" background="surface" borderRadius="md">Main Content</Box>
          <Box as="aside" padding="4" background="surface" borderRadius="md">Aside Element</Box>
          <Box as="footer" padding="4" background="surface" borderRadius="md">Footer Element</Box>
        </div>
      `}})},i={render:()=>({Component:r,props:{padding:"6",background:"surface",borderRadius:"lg",border:"subtle"},slots:{default:`
        <div>
          <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">Card Title</h3>
          <p style="margin: 0; color: var(--text-secondary);">
            This is an example of using Box as a card component with padding,
            background, border radius, and border.
          </p>
        </div>
      `}})};var t,u,p;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    padding: '4',
    background: 'surface',
    borderRadius: 'md'
  },
  render: args => ({
    Component: Box,
    props: args,
    slots: {
      default: 'Box content'
    }
  })
}`,...(p=(u=e.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var c,l,g;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => ({
    Component: Box,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Box padding="2" background="surface" borderRadius="md">p-2</Box>
          <Box padding="4" background="surface" borderRadius="md">p-4</Box>
          <Box padding="6" background="surface" borderRadius="md">p-6</Box>
          <Box padding="8" background="surface" borderRadius="md">p-8</Box>
        </div>
      \`
    }
  })
}`,...(g=(l=d.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var m,x,b;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => ({
    Component: Box,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Box padding="4" background="bg-default" borderRadius="md">bg-default</Box>
          <Box padding="4" background="bg-elevated" borderRadius="md">bg-elevated</Box>
          <Box padding="4" background="surface" borderRadius="md">surface</Box>
          <Box padding="4" background="surface-hover" borderRadius="md">surface-hover</Box>
        </div>
      \`
    }
  })
}`,...(b=(x=o.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var B,f,k;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => ({
    Component: Box,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <Box padding="4" background="surface" borderRadius="none">none</Box>
          <Box padding="4" background="surface" borderRadius="sm">sm</Box>
          <Box padding="4" background="surface" borderRadius="md">md</Box>
          <Box padding="4" background="surface" borderRadius="lg">lg</Box>
          <Box padding="4" background="surface" borderRadius="xl">xl</Box>
        </div>
      \`
    }
  })
}`,...(k=(f=a.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var R,v,y;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => ({
    Component: Box,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Box padding="4" background="surface" borderRadius="md" border="subtle">subtle</Box>
          <Box padding="4" background="surface" borderRadius="md" border="default">default</Box>
          <Box padding="4" background="surface" borderRadius="md" border="strong">strong</Box>
        </div>
      \`
    }
  })
}`,...(y=(v=n.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var C,h,w;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => ({
    Component: Box,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <Box as="header" padding="4" background="surface" borderRadius="md">Header Element</Box>
          <Box as="main" padding="4" background="surface" borderRadius="md">Main Content</Box>
          <Box as="aside" padding="4" background="surface" borderRadius="md">Aside Element</Box>
          <Box as="footer" padding="4" background="surface" borderRadius="md">Footer Element</Box>
        </div>
      \`
    }
  })
}`,...(w=(h=s.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};var E,S,T;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => ({
    Component: Box,
    props: {
      padding: '6',
      background: 'surface',
      borderRadius: 'lg',
      border: 'subtle'
    },
    slots: {
      default: \`
        <div>
          <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">Card Title</h3>
          <p style="margin: 0; color: var(--text-secondary);">
            This is an example of using Box as a card component with padding,
            background, border radius, and border.
          </p>
        </div>
      \`
    }
  })
}`,...(T=(S=i.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};const F=["Default","WithPadding","Backgrounds","BorderRadius","Borders","SemanticElements","CardExample"];export{o as Backgrounds,a as BorderRadius,n as Borders,i as CardExample,e as Default,s as SemanticElements,d as WithPadding,F as __namedExportsOrder,D as default};
