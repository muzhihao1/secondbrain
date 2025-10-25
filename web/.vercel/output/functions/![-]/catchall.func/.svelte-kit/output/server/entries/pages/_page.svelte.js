import { c as create_ssr_component, a as subscribe } from "../../chunks/ssr.js";
import { captureStore } from "../../chunks/captureStore.js";
import { h as hasPendingSync, s as syncStore } from "../../chunks/syncStore.js";
import { e as escape } from "../../chunks/escape.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hasPendingSync, $$unsubscribe_hasPendingSync;
  let $syncStore, $$unsubscribe_syncStore;
  let $captureStore, $$unsubscribe_captureStore;
  $$unsubscribe_hasPendingSync = subscribe(hasPendingSync, (value) => $hasPendingSync = value);
  $$unsubscribe_syncStore = subscribe(syncStore, (value) => $syncStore = value);
  $$unsubscribe_captureStore = subscribe(captureStore, (value) => $captureStore = value);
  let content = "";
  $$unsubscribe_hasPendingSync();
  $$unsubscribe_syncStore();
  $$unsubscribe_captureStore();
  return `${$$result.head += `<!-- HEAD_svelte-1rof1hf_START -->${$$result.title = `<title>Quick Capture</title>`, ""}<!-- HEAD_svelte-1rof1hf_END -->`, ""} <div class="min-h-screen flex flex-col p-4"> <header class="flex justify-between items-center mb-6"><h1 class="text-2xl font-bold text-primary-700" data-svelte-h="svelte-14hdbc2">⚡ Quick Capture</h1> <div class="flex gap-2">${$hasPendingSync ? `<button class="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm">🔄 ${escape($syncStore.pendingCount)} 待同步</button>` : ``} ${!$syncStore.online ? `<span class="px-3 py-1 bg-gray-600 rounded-lg text-sm" data-svelte-h="svelte-1w2p63j">📵 离线模式</span>` : ``}</div></header>  <div class="flex-1 flex flex-col"><textarea placeholder="记录你的想法...  Ctrl+Enter 快速提交" class="flex-1 w-full p-4 bg-dark-200 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-700 resize-none text-lg" rows="10">${escape("")}</textarea>  <div class="mt-4 flex gap-3"><button ${!content.trim() || $captureStore.loading ? "disabled" : ""} class="flex-1 py-4 bg-primary-700 hover:bg-primary-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition-colors touch-target">${escape($captureStore.loading ? "保存中..." : "💾 保存")}</button> <button class="${[
    "px-6 py-4 rounded-lg font-semibold text-lg transition-colors touch-target",
    "  bg-gray-700 hover:bg-gray-600"
  ].join(" ").trim()}">${`🎤`}</button></div>  <p class="mt-4 text-sm text-gray-400 text-center">${`点击麦克风录音，或直接输入文字`}</p></div>  <nav class="mt-6 flex justify-around border-t border-gray-700 pt-4" data-svelte-h="svelte-1wssbzr"><a href="/" class="flex flex-col items-center text-primary-700"><span class="text-2xl">⚡</span> <span class="text-xs mt-1">捕获</span></a> <a href="/dashboard" class="flex flex-col items-center text-gray-400 hover:text-white"><span class="text-2xl">📊</span> <span class="text-xs mt-1">Dashboard</span></a> <a href="/timeline" class="flex flex-col items-center text-gray-400 hover:text-white"><span class="text-2xl">📅</span> <span class="text-xs mt-1">时间线</span></a></nav></div>`;
});
export {
  Page as default
};
