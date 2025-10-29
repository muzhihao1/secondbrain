import{S as r}from"./Stack-00JChciI.js";import"./Box-OVjt4Oy9.js";import"./index-CVxsGfYe.js";import"./lifecycle-DaBqEg2E.js";import"./spread-CgU5AtxT.js";const A={title:"Primitives/Stack",component:r,tags:["autodocs"],argTypes:{gap:{control:"select",options:["0","1","2","3","4","5","6","8","10","12"],description:"Gap between items"},align:{control:"select",options:["start","center","end","stretch"],description:"Horizontal alignment"},justify:{control:"select",options:["start","center","end","space-between","space-around","space-evenly"],description:"Vertical distribution"},wrap:{control:"boolean",description:"Allow wrapping"},as:{control:"select",options:["div","section","ul","ol"],description:"HTML element"}}},a={args:{gap:"4",align:"stretch"},render:v=>({Component:r,props:v,slots:{default:`
        <Box padding="4" background="surface" borderRadius="md">Item 1</Box>
        <Box padding="4" background="surface" borderRadius="md">Item 2</Box>
        <Box padding="4" background="surface" borderRadius="md">Item 3</Box>
      `}})},e={render:()=>({Component:r,props:{},slots:{default:`
        <div style="display: flex; gap: 2rem;">
          <Stack gap="2">
            <Box padding="2" background="surface" borderRadius="md">gap-2</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-2</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-2</Box>
          </Stack>
          <Stack gap="4">
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
          </Stack>
          <Stack gap="8">
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
          </Stack>
        </div>
      `}})},d={render:()=>({Component:r,props:{},slots:{default:`
        <div style="display: flex; gap: 2rem;">
          <Stack gap="4" align="start" style="width: 200px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="3" background="surface" borderRadius="md">Start</Box>
            <Box padding="3" background="surface" borderRadius="md">Aligned</Box>
          </Stack>
          <Stack gap="4" align="center" style="width: 200px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="3" background="surface" borderRadius="md">Center</Box>
            <Box padding="3" background="surface" borderRadius="md">Aligned</Box>
          </Stack>
          <Stack gap="4" align="end" style="width: 200px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="3" background="surface" borderRadius="md">End</Box>
            <Box padding="3" background="surface" borderRadius="md">Aligned</Box>
          </Stack>
        </div>
      `}})},o={render:()=>({Component:r,props:{},slots:{default:`
        <div style="display: flex; gap: 2rem;">
          <Stack gap="0" justify="space-between" style="height: 200px; width: 150px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Top</Box>
            <Box padding="2" background="surface" borderRadius="md">Bottom</Box>
          </Stack>
          <Stack gap="0" justify="space-around" style="height: 200px; width: 150px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
          </Stack>
          <Stack gap="0" justify="space-evenly" style="height: 200px; width: 150px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Evenly</Box>
            <Box padding="2" background="surface" borderRadius="md">Evenly</Box>
          </Stack>
        </div>
      `}})},n={render:()=>({Component:r,props:{gap:"4",as:"div"},slots:{default:`
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">Name</label>
          <input type="text" style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary);" placeholder="Enter name" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">Email</label>
          <input type="email" style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary);" placeholder="Enter email" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">Message</label>
          <textarea style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary); min-height: 100px;" placeholder="Enter message"></textarea>
        </div>
      `}})};var s,t,i;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    gap: '4',
    align: 'stretch'
  },
  render: args => ({
    Component: Stack,
    props: args,
    slots: {
      default: \`
        <Box padding="4" background="surface" borderRadius="md">Item 1</Box>
        <Box padding="4" background="surface" borderRadius="md">Item 2</Box>
        <Box padding="4" background="surface" borderRadius="md">Item 3</Box>
      \`
    }
  })
}`,...(i=(t=a.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var c,p,u;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; gap: 2rem;">
          <Stack gap="2">
            <Box padding="2" background="surface" borderRadius="md">gap-2</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-2</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-2</Box>
          </Stack>
          <Stack gap="4">
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
          </Stack>
          <Stack gap="8">
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
          </Stack>
        </div>
      \`
    }
  })
}`,...(u=(p=e.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var l,g,b;d.parameters={...d.parameters,docs:{...(l=d.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; gap: 2rem;">
          <Stack gap="4" align="start" style="width: 200px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="3" background="surface" borderRadius="md">Start</Box>
            <Box padding="3" background="surface" borderRadius="md">Aligned</Box>
          </Stack>
          <Stack gap="4" align="center" style="width: 200px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="3" background="surface" borderRadius="md">Center</Box>
            <Box padding="3" background="surface" borderRadius="md">Aligned</Box>
          </Stack>
          <Stack gap="4" align="end" style="width: 200px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="3" background="surface" borderRadius="md">End</Box>
            <Box padding="3" background="surface" borderRadius="md">Aligned</Box>
          </Stack>
        </div>
      \`
    }
  })
}`,...(b=(g=d.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var m,x,k;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; gap: 2rem;">
          <Stack gap="0" justify="space-between" style="height: 200px; width: 150px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Top</Box>
            <Box padding="2" background="surface" borderRadius="md">Bottom</Box>
          </Stack>
          <Stack gap="0" justify="space-around" style="height: 200px; width: 150px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
          </Stack>
          <Stack gap="0" justify="space-evenly" style="height: 200px; width: 150px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Evenly</Box>
            <Box padding="2" background="surface" borderRadius="md">Evenly</Box>
          </Stack>
        </div>
      \`
    }
  })
}`,...(k=(x=o.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var f,B,y;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '4',
      as: 'div'
    },
    slots: {
      default: \`
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">Name</label>
          <input type="text" style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary);" placeholder="Enter name" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">Email</label>
          <input type="email" style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary);" placeholder="Enter email" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">Message</label>
          <textarea style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary); min-height: 100px;" placeholder="Enter message"></textarea>
        </div>
      \`
    }
  })
}`,...(y=(B=n.parameters)==null?void 0:B.docs)==null?void 0:y.source}}};const C=["Default","Gaps","Alignment","Distribution","FormExample"];export{d as Alignment,a as Default,o as Distribution,n as FormExample,e as Gaps,C as __namedExportsOrder,A as default};
