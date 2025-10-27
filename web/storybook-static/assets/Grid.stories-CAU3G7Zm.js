import{S as $,i as ee,s as Q,d as B,t as X,k as Y,c as Z,l as A,h as R,a as I,j as te,m as ne,u as re,o as oe,p as ie,q as S,e as se,f as ae,g as le}from"./index-CVxsGfYe.js";import{g as de}from"./spread-CgU5AtxT.js";import"./Box-OVjt4Oy9.js";import"./lifecycle-DaBqEg2E.js";function C(t){let e,r,d,n;const o=t[12].default,s=ne(o,t,t[11],null);let c=[{class:r="grid "+t[4]+" "+t[2]+" "+t[1]},{style:d="grid-template-columns: "+t[3]+";"},t[5]],u={};for(let i=0;i<c.length;i+=1)u=I(u,c[i]);return{c(){e=le(t[0]),s&&s.c(),this.h()},l(i){e=se(i,(t[0]||"null").toUpperCase(),{class:!0,style:!0});var l=ae(e);s&&s.l(l),l.forEach(B),this.h()},h(){S(t[0])(e,u)},m(i,l){Z(i,e,l),s&&s.m(e,null),n=!0},p(i,l){s&&s.p&&(!n||l&2048)&&re(s,o,i,i[11],n?ie(o,i[11],l,null):oe(i[11]),null),S(i[0])(e,u=de(c,[(!n||l&22&&r!==(r="grid "+i[4]+" "+i[2]+" "+i[1]))&&{class:r},(!n||l&8&&d!==(d="grid-template-columns: "+i[3]+";"))&&{style:d},l&32&&i[5]]))},i(i){n||(Y(s,i),n=!0)},o(i){X(s,i),n=!1},d(i){i&&B(e),s&&s.d(i)}}}function me(t){let e=t[0],r,d,n=t[0]&&C(t);return{c(){n&&n.c(),r=A()},l(o){n&&n.l(o),r=A()},m(o,s){n&&n.m(o,s),Z(o,r,s),d=!0},p(o,[s]){o[0]?e?Q(e,o[0])?(n.d(1),n=C(o),e=o[0],n.c(),n.m(r.parentNode,r)):n.p(o,s):(n=C(o),e=o[0],n.c(),n.m(r.parentNode,r)):e&&(n.d(1),n=null,e=o[0])},i(o){d||(Y(n,o),d=!0)},o(o){X(n,o),d=!1},d(o){o&&B(r),n&&n.d(o)}}}function ue(t,e,r){let d,n,o,s;const c=["columns","gap","minColWidth","alignItems","justifyItems","as"];let u=R(e,c),{$$slots:i={},$$scope:l}=e,{columns:p="3"}=e,{gap:k="4"}=e,{minColWidth:g="250px"}=e,{alignItems:_="stretch"}=e,{justifyItems:G="stretch"}=e,{as:j="div"}=e;return t.$$set=a=>{e=I(I({},e),te(a)),r(5,u=R(e,c)),"columns"in a&&r(6,p=a.columns),"gap"in a&&r(7,k=a.gap),"minColWidth"in a&&r(8,g=a.minColWidth),"alignItems"in a&&r(9,_=a.alignItems),"justifyItems"in a&&r(10,G=a.justifyItems),"as"in a&&r(0,j=a.as),"$$scope"in a&&r(11,l=a.$$scope)},t.$$.update=()=>{t.$$.dirty&128&&r(4,d=`gap-v-${k}`),t.$$.dirty&320&&r(3,n=p==="auto-fit"?`repeat(auto-fit, minmax(${g}, 1fr))`:p==="auto-fill"?`repeat(auto-fill, minmax(${g}, 1fr))`:`repeat(${p}, minmax(0, 1fr))`),t.$$.dirty&512&&r(2,o={start:"items-start",center:"items-center",end:"items-end",stretch:"items-stretch"}[_]),t.$$.dirty&1024&&r(1,s={start:"justify-items-start",center:"justify-items-center",end:"justify-items-end",stretch:"justify-items-stretch"}[G])},[j,s,o,n,d,u,p,k,g,_,G,l,i]}class m extends ${constructor(e){super(),ee(this,e,ue,me,Q,{columns:6,gap:7,minColWidth:8,alignItems:9,justifyItems:10,as:0})}}m.__docgen={version:3,name:"Grid.svelte",data:[{name:"columns",visibility:"public",description:"Number of columns (responsive breakpoint format: mobile/tablet/desktop)",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"1",text:'"1"'},{kind:"const",type:"string",value:"2",text:'"2"'},{kind:"const",type:"string",value:"3",text:'"3"'},{kind:"const",type:"string",value:"4",text:'"4"'},{kind:"const",type:"string",value:"6",text:'"6"'},{kind:"const",type:"string",value:"12",text:'"12"'},{kind:"const",type:"string",value:"auto-fit",text:'"auto-fit"'},{kind:"const",type:"string",value:"auto-fill",text:'"auto-fill"'}],text:'"1" | "2" | "3" | "4" | "6" | "12" | "auto-fit" | "auto-fill"'},static:!1,readonly:!1,defaultValue:'"3"'},{name:"gap",visibility:"public",description:"Gap between items",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"1",text:'"1"'},{kind:"const",type:"string",value:"2",text:'"2"'},{kind:"const",type:"string",value:"3",text:'"3"'},{kind:"const",type:"string",value:"4",text:'"4"'},{kind:"const",type:"string",value:"6",text:'"6"'},{kind:"const",type:"string",value:"12",text:'"12"'},{kind:"const",type:"string",value:"0",text:'"0"'},{kind:"const",type:"string",value:"5",text:'"5"'},{kind:"const",type:"string",value:"8",text:'"8"'},{kind:"const",type:"string",value:"10",text:'"10"'}],text:'"1" | "2" | "3" | "4" | "6" | "12" | "0" | "5" | "8" | "10"'},static:!1,readonly:!1,defaultValue:'"4"'},{name:"minColWidth",visibility:"public",description:"Minimum column width (for auto-fit/auto-fill)",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"250px"'},{name:"alignItems",visibility:"public",description:"Horizontal alignment of items",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"start",text:'"start"'},{kind:"const",type:"string",value:"center",text:'"center"'},{kind:"const",type:"string",value:"end",text:'"end"'},{kind:"const",type:"string",value:"stretch",text:'"stretch"'}],text:'"start" | "center" | "end" | "stretch"'},static:!1,readonly:!1,defaultValue:'"stretch"'},{name:"justifyItems",visibility:"public",description:"Vertical alignment of items",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"start",text:'"start"'},{kind:"const",type:"string",value:"center",text:'"center"'},{kind:"const",type:"string",value:"end",text:'"end"'},{kind:"const",type:"string",value:"stretch",text:'"stretch"'}],text:'"start" | "center" | "end" | "stretch"'},static:!1,readonly:!1,defaultValue:'"stretch"'},{name:"as",visibility:"public",description:"HTML element to render",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"div",text:'"div"'},{kind:"const",type:"string",value:"section",text:'"section"'},{kind:"const",type:"string",value:"ul",text:'"ul"'},{kind:"const",type:"string",value:"ol",text:'"ol"'}],text:'"div" | "section" | "ul" | "ol"'},static:!1,readonly:!1,defaultValue:'"div"'}],computed:[],methods:[],components:[],description:`Grid - CSS Grid layout primitive

Creates responsive grid layouts with configurable columns and gaps.
Ideal for dashboards, image galleries, and card layouts.`,keywords:[{name:"component",description:""},{name:"example",description:`<Grid columns="3" gap="4">
<Card>Item 1</Card>
<Card>Item 2</Card>
<Card>Item 3</Card>
</Grid>`}],events:[],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};const ye={title:"Primitives/Grid",component:m,tags:["autodocs"],argTypes:{columns:{control:"select",options:["1","2","3","4","6","12","auto-fit","auto-fill"],description:"Number of columns"},gap:{control:"select",options:["0","1","2","3","4","5","6","8","10","12"],description:"Gap between items"},minColWidth:{control:"text",description:"Min column width for auto layouts"},alignItems:{control:"select",options:["start","center","end","stretch"],description:"Horizontal alignment"},justifyItems:{control:"select",options:["start","center","end","stretch"],description:"Vertical alignment"},as:{control:"select",options:["div","section","ul"],description:"HTML element"}}},f={args:{columns:"3",gap:"4"},render:t=>({Component:m,props:t,slots:{default:`
        ${Array.from({length:6},(e,r)=>`
          <Box padding="6" background="surface" borderRadius="md" border="subtle">
            <div style="color: var(--text-primary);">Item ${r+1}</div>
          </Box>
        `).join("")}
      `}})},y={render:()=>({Component:m,props:{},slots:{default:`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">2 Columns</h3>
            <Grid columns="2" gap="4">
              ${Array.from({length:4},(t,e)=>`
                <Box padding="4" background="surface" borderRadius="md">Item ${e+1}</Box>
              `).join("")}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">3 Columns</h3>
            <Grid columns="3" gap="4">
              ${Array.from({length:6},(t,e)=>`
                <Box padding="4" background="surface" borderRadius="md">Item ${e+1}</Box>
              `).join("")}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">4 Columns</h3>
            <Grid columns="4" gap="4">
              ${Array.from({length:8},(t,e)=>`
                <Box padding="4" background="surface" borderRadius="md">Item ${e+1}</Box>
              `).join("")}
            </Grid>
          </div>
        </div>
      `}})},v={args:{columns:"auto-fit",gap:"4",minColWidth:"200px"},render:t=>({Component:m,props:t,slots:{default:`
        ${Array.from({length:8},(e,r)=>`
          <Box padding="6" background="surface" borderRadius="md" border="default">
            <div style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem;">Card ${r+1}</div>
            <div style="color: var(--text-secondary); font-size: 0.875rem;">Auto-fit resizes columns</div>
          </Box>
        `).join("")}
      `}})},x={render:()=>({Component:m,props:{},slots:{default:`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Gap 2</h3>
            <Grid columns="3" gap="2">
              ${Array.from({length:3},(t,e)=>`
                <Box padding="3" background="surface" borderRadius="md">Item ${e+1}</Box>
              `).join("")}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Gap 6</h3>
            <Grid columns="3" gap="6">
              ${Array.from({length:3},(t,e)=>`
                <Box padding="3" background="surface" borderRadius="md">Item ${e+1}</Box>
              `).join("")}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Gap 10</h3>
            <Grid columns="3" gap="10">
              ${Array.from({length:3},(t,e)=>`
                <Box padding="3" background="surface" borderRadius="md">Item ${e+1}</Box>
              `).join("")}
            </Grid>
          </div>
        </div>
      `}})},b={render:()=>({Component:m,props:{columns:"3",gap:"6"},slots:{default:`
        <Box padding="6" background="surface" borderRadius="lg" border="default" style="grid-column: span 2;">
          <h3 style="margin: 0 0 1rem 0; color: var(--text-primary);">Main Content</h3>
          <p style="margin: 0; color: var(--text-secondary);">Spans 2 columns</p>
        </Box>

        <Box padding="6" background="surface" borderRadius="lg" border="default">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">Sidebar</h3>
          <p style="margin: 0; color: var(--text-secondary); font-size: 0.875rem;">Stats or info</p>
        </Box>

        ${Array.from({length:3},(t,e)=>`
          <Box padding="6" background="surface" borderRadius="lg" border="subtle">
            <div style="color: var(--text-primary); font-weight: 600;">Metric ${e+1}</div>
            <div style="color: var(--text-accent); font-size: 1.5rem; margin-top: 0.5rem;">${(e+1)*123}</div>
          </Box>
        `).join("")}
      `}})},h={render:()=>({Component:m,props:{columns:"auto-fill",gap:"3",minColWidth:"150px"},slots:{default:`
        ${Array.from({length:12},(t,e)=>`
          <Box
            background="surface"
            borderRadius="md"
            style="aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border: 1px solid var(--surface-border-subtle);"
          >
            <div style="color: var(--text-tertiary); font-size: 0.75rem;">IMG ${e+1}</div>
          </Box>
        `).join("")}
      `}})};var z,W,M;f.parameters={...f.parameters,docs:{...(z=f.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    columns: '3',
    gap: '4'
  },
  render: args => ({
    Component: Grid,
    props: args,
    slots: {
      default: \`
        \${Array.from({
        length: 6
      }, (_, i) => \`
          <Box padding="6" background="surface" borderRadius="md" border="subtle">
            <div style="color: var(--text-primary);">Item \${i + 1}</div>
          </Box>
        \`).join('')}
      \`
    }
  })
}`,...(M=(W=f.parameters)==null?void 0:W.docs)==null?void 0:M.source}}};var V,D,H;y.parameters={...y.parameters,docs:{...(V=y.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => ({
    Component: Grid,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">2 Columns</h3>
            <Grid columns="2" gap="4">
              \${Array.from({
        length: 4
      }, (_, i) => \`
                <Box padding="4" background="surface" borderRadius="md">Item \${i + 1}</Box>
              \`).join('')}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">3 Columns</h3>
            <Grid columns="3" gap="4">
              \${Array.from({
        length: 6
      }, (_, i) => \`
                <Box padding="4" background="surface" borderRadius="md">Item \${i + 1}</Box>
              \`).join('')}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">4 Columns</h3>
            <Grid columns="4" gap="4">
              \${Array.from({
        length: 8
      }, (_, i) => \`
                <Box padding="4" background="surface" borderRadius="md">Item \${i + 1}</Box>
              \`).join('')}
            </Grid>
          </div>
        </div>
      \`
    }
  })
}`,...(H=(D=y.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};var L,N,T;v.parameters={...v.parameters,docs:{...(L=v.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    columns: 'auto-fit',
    gap: '4',
    minColWidth: '200px'
  },
  render: args => ({
    Component: Grid,
    props: args,
    slots: {
      default: \`
        \${Array.from({
        length: 8
      }, (_, i) => \`
          <Box padding="6" background="surface" borderRadius="md" border="default">
            <div style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem;">Card \${i + 1}</div>
            <div style="color: var(--text-secondary); font-size: 0.875rem;">Auto-fit resizes columns</div>
          </Box>
        \`).join('')}
      \`
    }
  })
}`,...(T=(N=v.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var w,q,E;x.parameters={...x.parameters,docs:{...(w=x.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => ({
    Component: Grid,
    props: {},
    slots: {
      default: \`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Gap 2</h3>
            <Grid columns="3" gap="2">
              \${Array.from({
        length: 3
      }, (_, i) => \`
                <Box padding="3" background="surface" borderRadius="md">Item \${i + 1}</Box>
              \`).join('')}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Gap 6</h3>
            <Grid columns="3" gap="6">
              \${Array.from({
        length: 3
      }, (_, i) => \`
                <Box padding="3" background="surface" borderRadius="md">Item \${i + 1}</Box>
              \`).join('')}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Gap 10</h3>
            <Grid columns="3" gap="10">
              \${Array.from({
        length: 3
      }, (_, i) => \`
                <Box padding="3" background="surface" borderRadius="md">Item \${i + 1}</Box>
              \`).join('')}
            </Grid>
          </div>
        </div>
      \`
    }
  })
}`,...(E=(q=x.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var F,P,O;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => ({
    Component: Grid,
    props: {
      columns: '3',
      gap: '6'
    },
    slots: {
      default: \`
        <Box padding="6" background="surface" borderRadius="lg" border="default" style="grid-column: span 2;">
          <h3 style="margin: 0 0 1rem 0; color: var(--text-primary);">Main Content</h3>
          <p style="margin: 0; color: var(--text-secondary);">Spans 2 columns</p>
        </Box>

        <Box padding="6" background="surface" borderRadius="lg" border="default">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">Sidebar</h3>
          <p style="margin: 0; color: var(--text-secondary); font-size: 0.875rem;">Stats or info</p>
        </Box>

        \${Array.from({
        length: 3
      }, (_, i) => \`
          <Box padding="6" background="surface" borderRadius="lg" border="subtle">
            <div style="color: var(--text-primary); font-weight: 600;">Metric \${i + 1}</div>
            <div style="color: var(--text-accent); font-size: 1.5rem; margin-top: 0.5rem;">\${(i + 1) * 123}</div>
          </Box>
        \`).join('')}
      \`
    }
  })
}`,...(O=(P=b.parameters)==null?void 0:P.docs)==null?void 0:O.source}}};var U,J,K;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => ({
    Component: Grid,
    props: {
      columns: 'auto-fill',
      gap: '3',
      minColWidth: '150px'
    },
    slots: {
      default: \`
        \${Array.from({
        length: 12
      }, (_, i) => \`
          <Box
            background="surface"
            borderRadius="md"
            style="aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border: 1px solid var(--surface-border-subtle);"
          >
            <div style="color: var(--text-tertiary); font-size: 0.75rem;">IMG \${i + 1}</div>
          </Box>
        \`).join('')}
      \`
    }
  })
}`,...(K=(J=h.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const ve=["Default","ColumnCounts","AutoFit","Gaps","DashboardLayout","ImageGallery"];export{v as AutoFit,y as ColumnCounts,b as DashboardLayout,f as Default,x as Gaps,h as ImageGallery,ve as __namedExportsOrder,ye as default};
