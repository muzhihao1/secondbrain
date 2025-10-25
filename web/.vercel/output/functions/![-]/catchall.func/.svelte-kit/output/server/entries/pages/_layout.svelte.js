import { c as create_ssr_component, a as subscribe, e as each, v as validate_component } from "../../chunks/ssr.js";
import { u as uiStore } from "../../chunks/syncStore.js";
import { e as escape } from "../../chunks/escape.js";
const css = {
  code: ".toast.svelte-1vo2skr{color:white;min-width:250px}.toast-success.svelte-1vo2skr{background-color:#10b981}.toast-error.svelte-1vo2skr{background-color:#ef4444}.toast-warning.svelte-1vo2skr{background-color:#f59e0b}.toast-info.svelte-1vo2skr{background-color:#3b82f6}",
  map: `{"version":3,"file":"Toast.svelte","sources":["Toast.svelte"],"sourcesContent":["<script>\\n\\timport { uiStore } from '$stores/uiStore.js';\\n\\timport { fade, fly } from 'svelte/transition';\\n<\/script>\\n\\n{#if $uiStore.toasts.length > 0}\\n\\t<div class=\\"fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm\\">\\n\\t\\t{#each $uiStore.toasts as toast (toast.id)}\\n\\t\\t\\t<div\\n\\t\\t\\t\\ttransition:fly={{ x: 300, duration: 300 }}\\n\\t\\t\\t\\tclass=\\"toast px-4 py-3 rounded-lg shadow-lg flex items-center gap-3\\"\\n\\t\\t\\t\\tclass:toast-success={toast.type === 'success'}\\n\\t\\t\\t\\tclass:toast-error={toast.type === 'error'}\\n\\t\\t\\t\\tclass:toast-warning={toast.type === 'warning'}\\n\\t\\t\\t\\tclass:toast-info={toast.type === 'info'}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{#if toast.type === 'success'}\\n\\t\\t\\t\\t\\t<span class=\\"text-xl\\">✅</span>\\n\\t\\t\\t\\t{:else if toast.type === 'error'}\\n\\t\\t\\t\\t\\t<span class=\\"text-xl\\">❌</span>\\n\\t\\t\\t\\t{:else if toast.type === 'warning'}\\n\\t\\t\\t\\t\\t<span class=\\"text-xl\\">⚠️</span>\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<span class=\\"text-xl\\">ℹ️</span>\\n\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t<p class=\\"text-sm font-medium\\">{toast.message}</p>\\n\\n\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\ton:click={() => uiStore.removeToast(toast.id)}\\n\\t\\t\\t\\t\\tclass=\\"ml-auto text-white hover:opacity-75\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t×\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t</div>\\n\\t\\t{/each}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t.toast {\\n\\t\\tcolor: white;\\n\\t\\tmin-width: 250px;\\n\\t}\\n\\n\\t.toast-success {\\n\\t\\tbackground-color: #10b981;\\n\\t}\\n\\n\\t.toast-error {\\n\\t\\tbackground-color: #ef4444;\\n\\t}\\n\\n\\t.toast-warning {\\n\\t\\tbackground-color: #f59e0b;\\n\\t}\\n\\n\\t.toast-info {\\n\\t\\tbackground-color: #3b82f6;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwCC,qBAAO,CACN,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,KACZ,CAEA,6BAAe,CACd,gBAAgB,CAAE,OACnB,CAEA,2BAAa,CACZ,gBAAgB,CAAE,OACnB,CAEA,6BAAe,CACd,gBAAgB,CAAE,OACnB,CAEA,0BAAY,CACX,gBAAgB,CAAE,OACnB"}`
};
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $uiStore, $$unsubscribe_uiStore;
  $$unsubscribe_uiStore = subscribe(uiStore, (value) => $uiStore = value);
  $$result.css.add(css);
  $$unsubscribe_uiStore();
  return `${$uiStore.toasts.length > 0 ? `<div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">${each($uiStore.toasts, (toast) => {
    return `<div class="${[
      "toast px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 svelte-1vo2skr",
      (toast.type === "success" ? "toast-success" : "") + " " + (toast.type === "error" ? "toast-error" : "") + " " + (toast.type === "warning" ? "toast-warning" : "") + " " + (toast.type === "info" ? "toast-info" : "")
    ].join(" ").trim()}">${toast.type === "success" ? `<span class="text-xl" data-svelte-h="svelte-19jziqa">✅</span>` : `${toast.type === "error" ? `<span class="text-xl" data-svelte-h="svelte-1ke0q4j">❌</span>` : `${toast.type === "warning" ? `<span class="text-xl" data-svelte-h="svelte-56dc2u">⚠️</span>` : `<span class="text-xl" data-svelte-h="svelte-1am4jo7">ℹ️</span>`}`}`} <p class="text-sm font-medium">${escape(toast.message)}</p> <button class="ml-auto text-white hover:opacity-75" data-svelte-h="svelte-1jack8y">×</button> </div>`;
  })}</div>` : ``}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen bg-dark-100">${slots.default ? slots.default({}) : ``}</div> ${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
