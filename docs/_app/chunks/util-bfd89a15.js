var e=Object.defineProperty,a=Object.prototype.hasOwnProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.propertyIsEnumerable,o=(a,t,n)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n,r=(e,r)=>{for(var s in r||(r={}))a.call(r,s)&&o(e,s,r[s]);if(t)for(var s of t(r))n.call(r,s)&&o(e,s,r[s]);return e};import{a2 as s,a3 as i,C as c,a4 as l,a0 as d,a6 as u,a9 as p,S as f,i as h,s as m,e as y,c as g,a as v,d as b,b as w,O,f as S,F as E,G as x,a7 as D,z as C,a8 as T,J as j}from"./vendor-a9bf48e1.js";const J=s(c({code:"graph TD\n    A[Christmas] --\x3e|Get money| B(Go shopping)\n    B --\x3e C{Let me think}\n    C --\x3e|One| D[Laptop]\n    C --\x3e|Two| E[iPhone]\n    C --\x3e|Three| F[fa:fa-car Car]\n  ",mermaid:JSON.stringify({theme:"default"},null,2),updateEditor:!1,autoSync:!0,updateDiagram:!0}),i(),"codeStore"),N=l([J],(([e],a)=>{a(d(JSON.stringify(e),!0))})),P=e=>{J.update((a=>r(r({},a),e)))};let I=!1;const L=(e,a,t=!1)=>{if((e.match(/\n/g)||"").length+1>50&&!I&&u(J).autoSync){const e=confirm("Long diagram deteced. Turn off Auto Sync? Click the sync logo to manually sync.");I=!0,e&&P({autoSync:!1})}J.update((n=>r(r({},n),{code:e,updateEditor:a,updateDiagram:t})))},G=(e,a)=>{J.update((t=>r(r({},t),{mermaid:e,updateEditor:a})))},V=()=>JSON.stringify(u(J)),k=c(void 0);function z(e){let a,t;return{c(){a=y("div"),t=y("div"),this.h()},l(e){a=g(e,"DIV",{id:!0,class:!0});var n=v(a);t=g(n,"DIV",{id:!0,class:!0}),v(t).forEach(b),n.forEach(b),this.h()},h(){w(t,"id","container"),w(t,"class","flex-1 overflow-auto"),w(a,"id","view"),w(a,"class","p-2 svelte-7vvt6c"),O(a,"error",e[1]),O(a,"outOfSync",e[2])},m(n,o){S(n,a,o),E(a,t),e[3](t)},p(e,[t]){2&t&&O(a,"error",e[1]),4&t&&O(a,"outOfSync",e[2])},i:x,o:x,d(t){t&&b(a),e[3](null)}}}function A(e,a,t){let n;D(e,J,(e=>t(6,n=e)));var o=this&&this.__awaiter||function(e,a,t,n){return new(t||(t=Promise))((function(o,r){function s(e){try{c(n.next(e))}catch(a){r(a)}}function i(e){try{c(n.throw(e))}catch(a){r(a)}}function c(e){var a;e.done?o(e.value):(a=e.value,a instanceof t?a:new t((function(e){e(a)}))).then(s,i)}c((n=n.apply(e,a||[])).next())}))};const r=window.mermaid;let s,i="",c=!1,l=!1,d=!0;C((()=>o(void 0,void 0,void 0,(function*(){J.subscribe((e=>{try{if(s&&e&&(e.updateDiagram||e.autoSync)){e.autoSync||T(J,n.updateDiagram=!1,n),t(2,l=!1),d=!0,i=e.code;const a=s.parentElement.parentElement.parentElement.scrollTop;t(0,s.innerHTML=i,s),delete s.dataset.processed,r.initialize(Object.assign({},JSON.parse(e.mermaid))),r.init(s),r.render("graph-div",i,u),t(0,s.parentElement.parentElement.parentElement.scrollTop=a,s)}else d?d=!1:t(2,l=!0)}catch(a){console.log("view fail",a),t(1,c=!0)}})),k.subscribe((e=>{void 0===e?t(1,c=!1):(t(1,c=!0),console.log("Error: ",e))}))}))));const u=(e,a)=>{};return[s,c,l,function(e){j[e?"unshift":"push"]((()=>{s=e,t(0,s)}))}]}class B extends f{constructor(e){super(),h(this,e,A,z,m,{})}}const F=()=>{(e=>{let a;try{const t=p(e);console.log(`Tring to load state: ${t}`),a=JSON.parse(t)}catch(t){e&&console.error("Init error",t),a=u(J),console.log(a)}P(r(r({},a),{updateEditor:!0}))})(window.location.hash.slice(1))},_=()=>{P({updateDiagram:!0})},H=()=>{F(),_(),N.subscribe((e=>{window.location.hash=e}))};export{B as V,G as a,N as b,J as c,k as e,V as g,H as i,_ as s,L as u};