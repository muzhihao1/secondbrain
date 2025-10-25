export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","icons/ICONS_NEEDED.md","manifest.json"]),
	mimeTypes: {".md":"text/markdown",".json":"application/json"},
	_: {
		client: {start:"_app/immutable/entry/start.BbUonE1J.js",app:"_app/immutable/entry/app.Cs_OafaH.js",imports:["_app/immutable/entry/start.BbUonE1J.js","_app/immutable/chunks/B-q9WKOj.js","_app/immutable/chunks/CcsFqX96.js","_app/immutable/chunks/i7_vV6_l.js","_app/immutable/entry/app.Cs_OafaH.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CcsFqX96.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
