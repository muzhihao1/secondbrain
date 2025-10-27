import{I as n}from"./Inline-Ky187HZW.js";import"./Box-OVjt4Oy9.js";import"./Button-BDDUOite.js";import"./index-CVxsGfYe.js";import"./lifecycle-DaBqEg2E.js";import"./spread-CgU5AtxT.js";const W={title:"Primitives/Inline",component:n,tags:["autodocs"],argTypes:{gap:{control:"select",options:["0","1","2","3","4","5","6","8","10","12"],description:"Gap between items"},align:{control:"select",options:["start","center","end","stretch","baseline"],description:"Vertical alignment"},justify:{control:"select",options:["start","center","end","space-between","space-around","space-evenly"],description:"Horizontal distribution"},wrap:{control:"boolean",description:"Allow wrapping"},as:{control:"select",options:["div","span","nav","ul"],description:"HTML element"}}},d={args:{gap:"2",align:"center"},render:S=>({Component:n,props:S,slots:{default:`
        <Box padding="3" background="surface" borderRadius="md">Item 1</Box>
        <Box padding="3" background="surface" borderRadius="md">Item 2</Box>
        <Box padding="3" background="surface" borderRadius="md">Item 3</Box>
      `}})},r={render:()=>({Component:n,props:{},slots:{default:`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <Inline gap="1">
            <Box padding="2" background="surface" borderRadius="md">gap-1</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-1</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-1</Box>
          </Inline>
          <Inline gap="4">
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
          </Inline>
          <Inline gap="8">
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
          </Inline>
        </div>
      `}})},e={render:()=>({Component:n,props:{},slots:{default:`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <Inline gap="4" align="start" style="height: 100px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Start</Box>
            <Box padding="4" background="surface" borderRadius="md">Aligned</Box>
          </Inline>
          <Inline gap="4" align="center" style="height: 100px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Center</Box>
            <Box padding="4" background="surface" borderRadius="md">Aligned</Box>
          </Inline>
          <Inline gap="4" align="end" style="height: 100px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">End</Box>
            <Box padding="4" background="surface" borderRadius="md">Aligned</Box>
          </Inline>
        </div>
      `}})},a={render:()=>({Component:n,props:{},slots:{default:`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <Inline gap="0" justify="space-between" style="width: 100%; border: 1px solid var(--surface-border-subtle); padding: 1rem;">
            <Box padding="2" background="surface" borderRadius="md">Left</Box>
            <Box padding="2" background="surface" borderRadius="md">Right</Box>
          </Inline>
          <Inline gap="0" justify="space-around" style="width: 100%; border: 1px solid var(--surface-border-subtle); padding: 1rem;">
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
          </Inline>
          <Inline gap="0" justify="center" style="width: 100%; border: 1px solid var(--surface-border-subtle); padding: 1rem;">
            <Box padding="2" background="surface" borderRadius="md">Centered</Box>
            <Box padding="2" background="surface" borderRadius="md">Items</Box>
          </Inline>
        </div>
      `}})},o={render:()=>({Component:n,props:{gap:"2",align:"center"},slots:{default:`
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="ghost">More Options</Button>
      `}})},s={render:()=>({Component:n,props:{gap:"2",wrap:!0},slots:{default:`
        <Box padding="2" background="surface" borderRadius="md">Tag 1</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 2</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 3</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 4</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 5</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 6</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 7</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 8</Box>
      `}})},i={render:()=>({Component:n,props:{gap:"6",align:"center",justify:"space-between",as:"nav"},slots:{default:`
        <Box padding="2" background="surface" borderRadius="md" style="font-weight: 600;">Logo</Box>
        <Inline gap="4">
          <Box padding="2">Home</Box>
          <Box padding="2">About</Box>
          <Box padding="2">Contact</Box>
        </Inline>
        <Button size="sm">Sign In</Button>
      `}})};var u,t,p;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    gap: '2',
    align: 'center'
  },
  render: args => ({
    Component: Inline,
    props: args,
    slots: {
      default: \`
        <Box padding="3" background="surface" borderRadius="md">Item 1</Box>
        <Box padding="3" background="surface" borderRadius="md">Item 2</Box>
        <Box padding="3" background="surface" borderRadius="md">Item 3</Box>
      \`
    }
  })
}`,...(p=(t=d.parameters)==null?void 0:t.docs)==null?void 0:p.source}}};var g,c,l;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <Inline gap="1">
            <Box padding="2" background="surface" borderRadius="md">gap-1</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-1</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-1</Box>
          </Inline>
          <Inline gap="4">
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
          </Inline>
          <Inline gap="8">
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
          </Inline>
        </div>
      \`
    }
  })
}`,...(l=(c=r.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var b,x,B;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <Inline gap="4" align="start" style="height: 100px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Start</Box>
            <Box padding="4" background="surface" borderRadius="md">Aligned</Box>
          </Inline>
          <Inline gap="4" align="center" style="height: 100px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Center</Box>
            <Box padding="4" background="surface" borderRadius="md">Aligned</Box>
          </Inline>
          <Inline gap="4" align="end" style="height: 100px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">End</Box>
            <Box padding="4" background="surface" borderRadius="md">Aligned</Box>
          </Inline>
        </div>
      \`
    }
  })
}`,...(B=(x=e.parameters)==null?void 0:x.docs)==null?void 0:B.source}}};var m,f,R;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <Inline gap="0" justify="space-between" style="width: 100%; border: 1px solid var(--surface-border-subtle); padding: 1rem;">
            <Box padding="2" background="surface" borderRadius="md">Left</Box>
            <Box padding="2" background="surface" borderRadius="md">Right</Box>
          </Inline>
          <Inline gap="0" justify="space-around" style="width: 100%; border: 1px solid var(--surface-border-subtle); padding: 1rem;">
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
          </Inline>
          <Inline gap="0" justify="center" style="width: 100%; border: 1px solid var(--surface-border-subtle); padding: 1rem;">
            <Box padding="2" background="surface" borderRadius="md">Centered</Box>
            <Box padding="2" background="surface" borderRadius="md">Items</Box>
          </Inline>
        </div>
      \`
    }
  })
}`,...(R=(f=a.parameters)==null?void 0:f.docs)==null?void 0:R.source}}};var k,I,y;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '2',
      align: 'center'
    },
    slots: {
      default: \`
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="ghost">More Options</Button>
      \`
    }
  })
}`,...(y=(I=o.parameters)==null?void 0:I.docs)==null?void 0:y.source}}};var v,h,C;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '2',
      wrap: true
    },
    slots: {
      default: \`
        <Box padding="2" background="surface" borderRadius="md">Tag 1</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 2</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 3</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 4</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 5</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 6</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 7</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 8</Box>
      \`
    }
  })
}`,...(C=(h=s.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var w,T,A;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '6',
      align: 'center',
      justify: 'space-between',
      as: 'nav'
    },
    slots: {
      default: \`
        <Box padding="2" background="surface" borderRadius="md" style="font-weight: 600;">Logo</Box>
        <Inline gap="4">
          <Box padding="2">Home</Box>
          <Box padding="2">About</Box>
          <Box padding="2">Contact</Box>
        </Inline>
        <Button size="sm">Sign In</Button>
      \`
    }
  })
}`,...(A=(T=i.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};const z=["Default","Gaps","Alignment","Distribution","ButtonGroup","WithWrapping","NavbarExample"];export{e as Alignment,o as ButtonGroup,d as Default,a as Distribution,r as Gaps,i as NavbarExample,s as WithWrapping,z as __namedExportsOrder,W as default};
