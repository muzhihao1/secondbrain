import{B as n}from"./Button-BDDUOite.js";import"./index-CVxsGfYe.js";import"./lifecycle-DaBqEg2E.js";const K={title:"Primitives/Button",component:n,tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost"],description:"Button visual style variant"},size:{control:"select",options:["sm","md","lg"],description:"Button size"},disabled:{control:"boolean",description:"Disabled state"},fullWidth:{control:"boolean",description:"Full width button"},type:{control:"select",options:["button","submit","reset"],description:"HTML button type"},onClick:{action:"clicked"}}},t={args:{variant:"primary",size:"md",disabled:!1,fullWidth:!1},render:r=>({Component:n,props:r,slots:{default:"Button"}})},e={args:{variant:"primary",size:"md"},render:r=>({Component:n,props:r,slots:{default:"Primary Button"}})},s={args:{variant:"secondary",size:"md"},render:r=>({Component:n,props:r,slots:{default:"Secondary Button"}})},a={args:{variant:"ghost",size:"md"},render:r=>({Component:n,props:r,slots:{default:"Ghost Button"}})},o={args:{variant:"primary",size:"sm"},render:r=>({Component:n,props:r,slots:{default:"Small Button"}})},i={args:{variant:"primary",size:"lg"},render:r=>({Component:n,props:r,slots:{default:"Large Button"}})},p={args:{variant:"primary",size:"md",disabled:!0},render:r=>({Component:n,props:r,slots:{default:"Disabled Button"}})},d={args:{variant:"primary",size:"md",fullWidth:!0},render:r=>({Component:n,props:r,slots:{default:"Full Width Button"}})},l={render:()=>({Component:n,props:{},slots:{default:`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      `}})},u={render:()=>({Component:n,props:{},slots:{default:`
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      `}})};var m,c,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false
  },
  render: args => ({
    Component: Button,
    props: args,
    slots: {
      default: 'Button'
    }
  })
}`,...(g=(c=t.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var B,y,f;e.parameters={...e.parameters,docs:{...(B=e.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md'
  },
  render: args => ({
    Component: Button,
    props: args,
    slots: {
      default: 'Primary Button'
    }
  })
}`,...(f=(y=e.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var v,z,S;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md'
  },
  render: args => ({
    Component: Button,
    props: args,
    slots: {
      default: 'Secondary Button'
    }
  })
}`,...(S=(z=s.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};var h,C,b;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md'
  },
  render: args => ({
    Component: Button,
    props: args,
    slots: {
      default: 'Ghost Button'
    }
  })
}`,...(b=(C=a.parameters)==null?void 0:C.docs)==null?void 0:b.source}}};var x,w,W;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'sm'
  },
  render: args => ({
    Component: Button,
    props: args,
    slots: {
      default: 'Small Button'
    }
  })
}`,...(W=(w=o.parameters)==null?void 0:w.docs)==null?void 0:W.source}}};var D,L,P;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'lg'
  },
  render: args => ({
    Component: Button,
    props: args,
    slots: {
      default: 'Large Button'
    }
  })
}`,...(P=(L=i.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var G,F,A;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true
  },
  render: args => ({
    Component: Button,
    props: args,
    slots: {
      default: 'Disabled Button'
    }
  })
}`,...(A=(F=p.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var M,_,k;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    fullWidth: true
  },
  render: args => ({
    Component: Button,
    props: args,
    slots: {
      default: 'Full Width Button'
    }
  })
}`,...(k=(_=d.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var T,V,E;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    Component: Button,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      \`
    }
  })
}`,...(E=(V=l.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var H,O,j;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => ({
    Component: Button,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      \`
    }
  })
}`,...(j=(O=u.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};const N=["Default","Primary","Secondary","Ghost","Small","Large","Disabled","FullWidth","AllVariants","AllSizes"];export{u as AllSizes,l as AllVariants,t as Default,p as Disabled,d as FullWidth,a as Ghost,i as Large,e as Primary,s as Secondary,o as Small,N as __namedExportsOrder,K as default};
