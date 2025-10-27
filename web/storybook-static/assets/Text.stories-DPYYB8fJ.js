import{T as G}from"./Text-DuqmmQzd.js";import{S as e}from"./Stack-00JChciI.js";import{B as j}from"./Box-OVjt4Oy9.js";import"./index-CVxsGfYe.js";import"./lifecycle-DaBqEg2E.js";import"./spread-CgU5AtxT.js";const F={title:"Primitives/Text",component:G,tags:["autodocs"],argTypes:{size:{control:"select",options:["xs","sm","base","lg","xl"],description:"Text size"},color:{control:"select",options:["primary","secondary","tertiary","accent","success","warning","error","inverse"],description:"Text color"},weight:{control:"select",options:["light","normal","medium","semibold","bold"],description:"Font weight"},align:{control:"select",options:["left","center","right","justify"],description:"Text alignment"},lineHeight:{control:"select",options:["tight","normal","relaxed","loose"],description:"Line height"},truncate:{control:"boolean",description:"Truncate with ellipsis"},as:{control:"select",options:["p","span","div","label"],description:"HTML element"}}},t={args:{size:"base",color:"primary"},render:N=>({Component:G,props:N,slots:{default:"This is default text content with normal styling."}})},r={render:()=>({Component:e,props:{gap:"3"},slots:{default:`
        <Text size="xs">Extra small text (xs)</Text>
        <Text size="sm">Small text (sm)</Text>
        <Text size="base">Base text (base)</Text>
        <Text size="lg">Large text (lg)</Text>
        <Text size="xl">Extra large text (xl)</Text>
      `}})},o={render:()=>({Component:e,props:{gap:"2"},slots:{default:`
        <Text color="primary">Primary text color</Text>
        <Text color="secondary">Secondary text color</Text>
        <Text color="tertiary">Tertiary text color</Text>
        <Text color="accent">Accent text color</Text>
        <Text color="success">Success text color</Text>
        <Text color="warning">Warning text color</Text>
        <Text color="error">Error text color</Text>
        <Box background="surface" padding="2">
          <Text color="inverse">Inverse text color</Text>
        </Box>
      `}})},n={render:()=>({Component:e,props:{gap:"2"},slots:{default:`
        <Text weight="light">Light weight</Text>
        <Text weight="normal">Normal weight</Text>
        <Text weight="medium">Medium weight</Text>
        <Text weight="semibold">Semibold weight</Text>
        <Text weight="bold">Bold weight</Text>
      `}})},a={render:()=>({Component:e,props:{gap:"4"},slots:{default:`
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="left">Left aligned text content</Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="center">Center aligned text content</Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="right">Right aligned text content</Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="justify">
            Justified text will stretch to fill the full width of the container.
            This is particularly useful for long paragraphs where you want even spacing.
          </Text>
        </Box>
      `}})},i={render:()=>({Component:e,props:{gap:"4"},slots:{default:`
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="tight">
            Tight line height creates compact text. Good for headings and labels.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="normal">
            Normal line height is the default. Balanced for most content.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="relaxed">
            Relaxed line height creates more breathing room. Good for readability.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="loose">
            Loose line height creates maximum spacing. Best for poetry or emphasis.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
      `}})},s={render:()=>({Component:j,props:{padding:"4",background:"surface",borderRadius:"md"},slots:{default:`
        <Text truncate>
          This is a very long text that will be truncated with an ellipsis when it exceeds the container width. You won't see the full content.
        </Text>
      `}})},l={render:()=>({Component:e,props:{gap:"4"},slots:{default:`
        <Text size="lg" weight="semibold" color="primary">
          Article Title
        </Text>
        <Text size="base" color="secondary" lineHeight="relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </Text>
        <Text size="base" color="secondary" lineHeight="relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </Text>
      `}})},d={render:()=>({Component:e,props:{gap:"2"},slots:{default:`
        <Text as="label" size="sm" weight="medium" color="primary">
          Email Address
        </Text>
        <input
          type="email"
          style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary);"
          placeholder="Enter your email"
        />
        <Text as="span" size="xs" color="tertiary">
          We'll never share your email with anyone else.
        </Text>
      `}})};var c,x,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    size: 'base',
    color: 'primary'
  },
  render: args => ({
    Component: Text,
    props: args,
    slots: {
      default: 'This is default text content with normal styling.'
    }
  })
}`,...(p=(x=t.parameters)==null?void 0:x.docs)==null?void 0:p.source}}};var u,m,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '3'
    },
    slots: {
      default: \`
        <Text size="xs">Extra small text (xs)</Text>
        <Text size="sm">Small text (sm)</Text>
        <Text size="base">Base text (base)</Text>
        <Text size="lg">Large text (lg)</Text>
        <Text size="xl">Extra large text (xl)</Text>
      \`
    }
  })
}`,...(g=(m=r.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var T,h,b;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '2'
    },
    slots: {
      default: \`
        <Text color="primary">Primary text color</Text>
        <Text color="secondary">Secondary text color</Text>
        <Text color="tertiary">Tertiary text color</Text>
        <Text color="accent">Accent text color</Text>
        <Text color="success">Success text color</Text>
        <Text color="warning">Warning text color</Text>
        <Text color="error">Error text color</Text>
        <Box background="surface" padding="2">
          <Text color="inverse">Inverse text color</Text>
        </Box>
      \`
    }
  })
}`,...(b=(h=o.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var f,y,w;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '2'
    },
    slots: {
      default: \`
        <Text weight="light">Light weight</Text>
        <Text weight="normal">Normal weight</Text>
        <Text weight="medium">Medium weight</Text>
        <Text weight="semibold">Semibold weight</Text>
        <Text weight="bold">Bold weight</Text>
      \`
    }
  })
}`,...(w=(y=n.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var B,k,S;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '4'
    },
    slots: {
      default: \`
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="left">Left aligned text content</Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="center">Center aligned text content</Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="right">Right aligned text content</Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="justify">
            Justified text will stretch to fill the full width of the container.
            This is particularly useful for long paragraphs where you want even spacing.
          </Text>
        </Box>
      \`
    }
  })
}`,...(S=(k=a.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var z,v,L;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '4'
    },
    slots: {
      default: \`
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="tight">
            Tight line height creates compact text. Good for headings and labels.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="normal">
            Normal line height is the default. Balanced for most content.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="relaxed">
            Relaxed line height creates more breathing room. Good for readability.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="loose">
            Loose line height creates maximum spacing. Best for poetry or emphasis.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
      \`
    }
  })
}`,...(L=(v=i.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};var C,R,E;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => ({
    Component: Box,
    props: {
      padding: '4',
      background: 'surface',
      borderRadius: 'md'
    },
    slots: {
      default: \`
        <Text truncate>
          This is a very long text that will be truncated with an ellipsis when it exceeds the container width. You won't see the full content.
        </Text>
      \`
    }
  })
}`,...(E=(R=s.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var H,A,W;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '4'
    },
    slots: {
      default: \`
        <Text size="lg" weight="semibold" color="primary">
          Article Title
        </Text>
        <Text size="base" color="secondary" lineHeight="relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </Text>
        <Text size="base" color="secondary" lineHeight="relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </Text>
      \`
    }
  })
}`,...(W=(A=l.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};var P,q,D;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => ({
    Component: Stack,
    props: {
      gap: '2'
    },
    slots: {
      default: \`
        <Text as="label" size="sm" weight="medium" color="primary">
          Email Address
        </Text>
        <input
          type="email"
          style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary);"
          placeholder="Enter your email"
        />
        <Text as="span" size="xs" color="tertiary">
          We'll never share your email with anyone else.
        </Text>
      \`
    }
  })
}`,...(D=(q=d.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};const O=["Default","Sizes","Colors","Weights","Alignment","LineHeights","Truncate","ParagraphExample","LabelExample"];export{a as Alignment,o as Colors,t as Default,d as LabelExample,i as LineHeights,l as ParagraphExample,r as Sizes,s as Truncate,n as Weights,O as __namedExportsOrder,F as default};
