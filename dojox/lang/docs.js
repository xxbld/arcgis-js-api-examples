//>>built
define("dojox/lang/docs",["dojo","dijit","dojox"],function(f,z,t){f.provide("dojox.lang.docs");(function(){function u(b){console.log("Warning, the API docs must be available at ../util/docscripts/api.json or ../util/docscripts/api/*.json in order for dojox.lang.docs to supply schema information, but it could not be loaded: "+b)}var g={},h=[],n=t.lang.docs._loadedDocs={},l=function(b,a){g[a]=b},r=function(b){var a=b.type||"",c,e=!1,d=!1,m,a=a.replace(/\?/,function(){e=!0;return""}),a=a.replace(/\[\]/,
function(){d=!0;return""});a.match(/HTML/)?a="string":"String"==a||"Number"==a||"Boolean"==a||"Object"==a||"Array"==a||"Integer"==a||"Function"==a?a=a.toLowerCase():"bool"==a?a="boolean":a?(c=f.getObject(a)||{},m=!0):c={};c=c||{type:a};d&&(c={items:c,type:"array"},m=!1);m||(e&&(c.optional=!0),/const/.test(b.tags)&&(c.readonly=!0));return c},v=function(b,a){var c=n[a];if(c){b.description=c.description;b.properties={};b.methods={};if(c.properties)for(var e=c.properties,d=0,m=e.length;d<m;d++)"prototype"==
e[d].scope&&((b.properties[e[d].name]=r(e[d])).description=e[d].summary);if(c.methods){e=c.methods;d=0;for(m=e.length;d<m;d++)if((a=e[d].name)&&"prototype"==e[d].scope){var p=b.methods[a]={};p.description=e[d].summary;var k=e[d].parameters;if(k){p.parameters=[];for(var q=0,g=k.length;q<g;q++){var h=k[q],l=p.parameters[q]=r(h);l.name=h.name;l.optional="optional"==h.usage}}if((k=e[d]["return-types"])&&k[0])k=r(k[0]),k.type&&(p.returns=k)}}(c=c.superclass)&&(b["extends"]=f.getObject(c))}},s=function(b){h.push(b)},
w=f.declare;f.declare=function(b){var a=w.apply(this,arguments);l(a,b);return a};f.mixin(f.declare,w);var x,y=f.require;f.require=function(b){s(b);return y.apply(this,arguments)};t.lang.docs.init=function(b){function a(){f.require=y;h=null;try{f.xhrGet({sync:!b,url:f.baseUrl+"../util/docscripts/api.json",handleAs:"text"}).addCallbacks(function(a){n=(new Function("return "+a))();l=v;for(var b in g)l(g[b],b);g=null},u)}catch(a){u(a)}}if(x)return null;x=!0;var c=function(a,c){return f.xhrGet({sync:c||
!b,url:f.baseUrl+"../util/docscripts/api/"+a+".json",handleAs:"text"}).addCallback(function(a){a=(new Function("return "+a))();for(var b in a)n[b]||(n[b]=a[b])})};try{var e=h.shift();c(e,!0).addCallbacks(function(){s=function(a){if(!n[a])try{c(a)}catch(b){n[a]={}}};f.forEach(h,function(a){s(a)});h=null;l=v;for(i in g)l(g[i],i);g=null},a)}catch(d){a()}return null}})()});