import{S as V}from"./Separator-C-4VFsIP.js";import{S as s}from"./Stack-00JChciI.js";import{I as A}from"./Inline-Ky187HZW.js";import{B as M}from"./Box-OVjt4Oy9.js";import"./index-CVxsGfYe.js";import"./lifecycle-DaBqEg2E.js";import"./spread-CgU5AtxT.js";const _={title:"Primitives/Separator",component:V,tags:["autodocs"],argTypes:{orientation:{control:"select",options:["horizontal","vertical"],description:"Separator orientation"},variant:{control:"select",options:["default","subtle","strong"],description:"Visual style"},spacing:{control:"select",options:["0","2","4","6","8"],description:"Spacing around separator"},label:{control:"text",description:"ARIA label"}}},n={args:{orientation:"horizontal",variant:"default",spacing:"0"},render:D=>({Component:s,props:{gap:"0"},slots:{default:`
        <Box padding="4" background="surface">Section 1</Box>
        <Separator {...args} />
        <Box padding="4" background="surface">Section 2</Box>
      `}})},r={render:()=>({Component:s,props:{gap:"6"},slots:{default:`
        <div>
          <p style="margin-bottom: 1rem; color: var(--text-primary);">Subtle</p>
          <Separator variant="subtle" />
        </div>

        <div>
          <p style="margin-bottom: 1rem; color: var(--text-primary);">Default</p>
          <Separator variant="default" />
        </div>

        <div>
          <p style="margin-bottom: 1rem; color: var(--text-primary);">Strong</p>
          <Separator variant="strong" />
        </div>
      `}})},t={render:()=>({Component:s,props:{gap:"0"},slots:{default:`
        <Box padding="4" background="surface">Content Above</Box>
        <Separator spacing="4" />
        <Box padding="4" background="surface">Content Below</Box>

        <Separator spacing="8" />

        <Box padding="4" background="surface">More Content</Box>
      `}})},e={render:()=>({Component:A,props:{gap:"0",align:"stretch"},slots:{default:`
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Left Content
        </Box>
        <Separator orientation="vertical" />
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Right Content
        </Box>
      `}})},a={render:()=>({Component:A,props:{gap:"0",align:"stretch"},slots:{default:`
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Left
        </Box>
        <Separator orientation="vertical" spacing="4" />
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Middle
        </Box>
        <Separator orientation="vertical" spacing="4" />
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Right
        </Box>
      `}})},o={render:()=>({Component:M,props:{padding:"0",background:"surface",borderRadius:"lg",border:"default"},slots:{default:`
        <Stack gap="0">
          <Box padding="6">
            <h3 style="margin: 0; color: var(--text-primary);">Card Header</h3>
            <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary);">Card subtitle</p>
          </Box>

          <Separator />

          <Box padding="6">
            <p style="margin: 0; color: var(--text-primary);">Main content goes here...</p>
          </Box>

          <Separator />

          <Box padding="6">
            <Inline gap="2">
              <button style="padding: 0.5rem 1rem; background: var(--interactive-primary-default); color: white; border: none; border-radius: 0.5rem;">Action</button>
              <button style="padding: 0.5rem 1rem; background: var(--interactive-secondary-default); border: none; border-radius: 0.5rem;">Cancel</button>
            </Inline>
          </Box>
        </Stack>
      `}})},i={render:()=>({Component:M,props:{padding:"2",background:"surface",borderRadius:"md",border:"default"},slots:{default:`
        <Stack gap="0">
          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--text-primary); cursor: pointer;">
            Profile Settings
          </button>
          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--text-primary); cursor: pointer;">
            Account
          </button>

          <Separator variant="subtle" spacing="2" />

          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--text-primary); cursor: pointer;">
            Help & Support
          </button>

          <Separator variant="subtle" spacing="2" />

          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--color-semantic-error-500); cursor: pointer;">
            Sign Out
          </button>
        </Stack>
      `}})};var p,d,c;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal',
    variant: 'default',
    spacing: '0'
  },
  render: args => ({
    Component: Stack,
    props: {
      gap: '0'
    },
    slots: {
      default: \`
        <Box padding="4" background="surface">Section 1</Box>
        <Separator {...args} />
        <Box padding="4" background="surface">Section 2</Box>
      \`
    }
  })
}`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var l,g,u;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '6'
    },
    slots: {
      default: \`
        <div>
          <p style="margin-bottom: 1rem; color: var(--text-primary);">Subtle</p>
          <Separator variant="subtle" />
        </div>

        <div>
          <p style="margin-bottom: 1rem; color: var(--text-primary);">Default</p>
          <Separator variant="default" />
        </div>

        <div>
          <p style="margin-bottom: 1rem; color: var(--text-primary);">Strong</p>
          <Separator variant="strong" />
        </div>
      \`
    }
  })
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var m,x,b;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '0'
    },
    slots: {
      default: \`
        <Box padding="4" background="surface">Content Above</Box>
        <Separator spacing="4" />
        <Box padding="4" background="surface">Content Below</Box>

        <Separator spacing="8" />

        <Box padding="4" background="surface">More Content</Box>
      \`
    }
  })
}`,...(b=(x=t.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,y,S;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '0',
      align: 'stretch'
    },
    slots: {
      default: \`
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Left Content
        </Box>
        <Separator orientation="vertical" />
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Right Content
        </Box>
      \`
    }
  })
}`,...(S=(y=e.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var v,B,h;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => ({
    Component: Inline,
    props: {
      gap: '0',
      align: 'stretch'
    },
    slots: {
      default: \`
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Left
        </Box>
        <Separator orientation="vertical" spacing="4" />
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Middle
        </Box>
        <Separator orientation="vertical" spacing="4" />
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Right
        </Box>
      \`
    }
  })
}`,...(h=(B=a.parameters)==null?void 0:B.docs)==null?void 0:h.source}}};var k,C,w;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
            <h3 style="margin: 0; color: var(--text-primary);">Card Header</h3>
            <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary);">Card subtitle</p>
          </Box>

          <Separator />

          <Box padding="6">
            <p style="margin: 0; color: var(--text-primary);">Main content goes here...</p>
          </Box>

          <Separator />

          <Box padding="6">
            <Inline gap="2">
              <button style="padding: 0.5rem 1rem; background: var(--interactive-primary-default); color: white; border: none; border-radius: 0.5rem;">Action</button>
              <button style="padding: 0.5rem 1rem; background: var(--interactive-secondary-default); border: none; border-radius: 0.5rem;">Cancel</button>
            </Inline>
          </Box>
        </Stack>
      \`
    }
  })
}`,...(w=(C=o.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var j,I,R;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => ({
    Component: Box,
    props: {
      padding: '2',
      background: 'surface',
      borderRadius: 'md',
      border: 'default'
    },
    slots: {
      default: \`
        <Stack gap="0">
          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--text-primary); cursor: pointer;">
            Profile Settings
          </button>
          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--text-primary); cursor: pointer;">
            Account
          </button>

          <Separator variant="subtle" spacing="2" />

          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--text-primary); cursor: pointer;">
            Help & Support
          </button>

          <Separator variant="subtle" spacing="2" />

          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--color-semantic-error-500); cursor: pointer;">
            Sign Out
          </button>
        </Stack>
      \`
    }
  })
}`,...(R=(I=i.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};const T=["Default","Variants","WithSpacing","Vertical","VerticalWithSpacing","CardSections","MenuExample"];export{o as CardSections,n as Default,i as MenuExample,r as Variants,e as Vertical,a as VerticalWithSpacing,t as WithSpacing,T as __namedExportsOrder,_ as default};
