// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/webgl/FramebufferObject",["require","exports","./Texture"],function(n,p,e){return function(){function c(a,b,d,f){this._colorAttachment=this._stencilAttachment=this._depthAttachment=this._glName=this._context=null;this._initialized=!1;this._context=a;this._desc={colorTarget:b.colorTarget,depthStencilTarget:b.depthStencilTarget,width:b.width,height:b.height,multisampled:b.multisampled};this._id=c._nextId++;d&&(a=void 0,d instanceof e?(this._colorAttachment=d,a=
d.descriptor):(a=d,this._colorAttachment=new e(this._context,a)),0!==this._desc.colorTarget&&console.error("Framebuffer is initialized with a texture however the descriptor indicates using a renderbuffer color attachment!"),c._validateTextureDimensions(a,this._desc));f&&(this._context.extensions.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!"),d=void 0,f instanceof e?(this._depthStencilTexture=
f,d=this._depthStencilTexture.descriptor):(d=f,this._depthStencilTexture=new e(this._context,d)),c._validateTextureDimensions(d,this._desc))}c.create=function(a,b){return new c(a,b)};c.createWithAttachments=function(a,b,d,f){return new c(a,d,b,f)};Object.defineProperty(c.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"glName",{get:function(){return this._glName},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"descriptor",
{get:function(){return this._desc},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"colorTexture",{get:function(){return this._colorAttachment instanceof e?this._colorAttachment:null},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"depthStencilTexture",{get:function(){return this._depthStencilTexture},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"width",{get:function(){return this._desc.width},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,
"height",{get:function(){return this._desc.height},enumerable:!0,configurable:!0});c.prototype.dispose=function(){this._context&&this._glName&&(this._disposeColorAttachment(),this._disposeDepthStencilAttachments(),this._context.gl.deleteFramebuffer(this._glName),this._glName=null)};c.prototype.attachColorTexture=function(a){if(a){c._validateTextureDimensions(a.descriptor,this._desc);this._disposeColorAttachment();if(this._initialized){this._context.bindFramebuffer(this);var b=this._context.gl;b.framebufferTexture2D(b.FRAMEBUFFER,
b.COLOR_ATTACHMENT0,b.TEXTURE_2D,a.glName,0)}this._colorAttachment=a}};c.prototype.detachColorTexture=function(){var a=void 0;if(this._colorAttachment instanceof e){a=this._colorAttachment;if(this._initialized){this._context.bindFramebuffer(this);var b=this._context.gl;this._context.gl.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,null,0)}this._colorAttachment=null}return a};c.prototype.attachDepthStencilTexture=function(a){if(a){var b=a.descriptor;34041!==b.pixelFormat&&console.error("Depth/Stencil texture must have a pixel type of DEPTH_STENCIL!");
34042!==b.dataType&&console.error("Depth/Stencil texture must have data type of UNSIGNED_INT_24_8_WEBGL!");this._context.extensions.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture!");c._validateTextureDimensions(b,this._desc);4!==this._desc.depthStencilTarget&&(this._desc.depthStencilTarget=4);this._disposeDepthStencilAttachments();this._initialized&&(this._context.bindFramebuffer(this),b=this._context.gl,b.framebufferTexture2D(b.FRAMEBUFFER,
b.DEPTH_STENCIL_ATTACHMENT,b.TEXTURE_2D,a.glName,0));this._depthStencilTexture=a}};c.prototype.detachDepthStencilTexture=function(){var a=this._depthStencilTexture;if(a&&this._initialized){this._context.bindFramebuffer(this);var b=this._context.gl;this._context.gl.framebufferTexture2D(b.FRAMEBUFFER,b.DEPTH_STENCIL_ATTACHMENT,b.TEXTURE_2D,null,0)}this._depthStencilTexture=null;return a};c.prototype.copyToTexture=function(a,b,d,c,e,k,g){(0>a||0>b||0>e||0>k)&&console.error("Offsets cannot be negative!");
(0>=d||0>=c)&&console.error("Copy width and height must be greater than zero!");var h=this._desc,l=g.descriptor;3553!==g.descriptor.target&&console.error("Texture target must be TEXTURE_2D!");(a+d>h.width||b+c>h.height||e+d>l.width||k+c>l.height)&&console.error("Bad dimensions, the current input values will attempt to read or copy out of bounds!");h=this._context;h.bindTexture(g);h.bindFramebuffer(this);h.gl.copyTexSubImage2D(3553,0,e,k,a,b,d,c)};c.prototype.readPixels=function(a,b,d,c,e,k,g){(0>=
d||0>=c)&&console.error("Copy width and height must be greater than zero!");g||console.error("Target memory is not initialized!");this._context.bindFramebuffer(this);this._context.gl.readPixels(a,b,d,c,e,k,g)};c.prototype.resize=function(a,b){var d=this._desc;if(!(d.width===a&&d.height===b))if(this._initialized)d.width=a,d.height=b,this._colorAttachment instanceof e?(f=this._colorAttachment,d=f.descriptor,d.width=a,d.height=b,this._colorAttachment=new e(this._context,d),c._validateTextureDimensions(f.descriptor,
this._desc)):this._colorAttachment=null,null!=this._depthStencilTexture&&(d=this._depthStencilTexture.descriptor,d.width=a,d.height=b,this._depthStencilTexture=new e(this._context,d)),this._initialized=!1;else{d.width=a;d.height=b;if(this._colorAttachment instanceof e){var f=this._colorAttachment;f.resize(a,b)}this._depthStencilTexture&&this._depthStencilTexture.resize(a,b)}};c.prototype.initialize=function(){if(this._initialized)return!1;var a=this._context.gl,b=a.createFramebuffer(),d=this._desc;
a.bindFramebuffer(a.FRAMEBUFFER,b);if(!this._colorAttachment)if(0===d.colorTarget)this._colorAttachment=new e(this._context,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,wrapMode:33071,width:d.width,height:d.height});else{var c=a.createRenderbuffer();a.bindRenderbuffer(a.RENDERBUFFER,c);a.renderbufferStorage(a.RENDERBUFFER,a.RGBA4,d.width,d.height);a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,c);this._colorAttachment=c}this._colorAttachment instanceof
e&&a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this._colorAttachment.glName,0);switch(d.depthStencilTarget){case 1:case 3:c=a.createRenderbuffer();a.bindRenderbuffer(a.RENDERBUFFER,c);var m=1===d.depthStencilTarget?a.DEPTH_ATTACHMENT:a.DEPTH_STENCIL_ATTACHMENT;a.renderbufferStorage(a.RENDERBUFFER,1===d.depthStencilTarget?a.DEPTH_COMPONENT16:a.DEPTH_STENCIL,d.width,d.height);a.framebufferRenderbuffer(a.FRAMEBUFFER,m,a.RENDERBUFFER,c);this._depthAttachment=c;break;case 2:c=
a.createRenderbuffer();a.bindRenderbuffer(a.RENDERBUFFER,c);a.renderbufferStorage(a.RENDERBUFFER,a.STENCIL_INDEX8,d.width,d.height);a.framebufferRenderbuffer(a.FRAMEBUFFER,a.STENCIL_ATTACHMENT,a.RENDERBUFFER,c);this._stencilAttachment=c;break;case 4:this._depthStencilTexture||(this._context.extensions.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!"),this._depthStencilTexture=new e(this._context,
{target:3553,pixelFormat:34041,dataType:34042,samplingMode:9728,wrapMode:33071,width:d.width,height:d.height})),a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,this._depthStencilTexture.glName,0)}a.checkFramebufferStatus(a.FRAMEBUFFER)!==a.FRAMEBUFFER_COMPLETE&&console.error("Framebuffer is incomplete!");this._glName=b;return this._initialized=!0};c.prototype._disposeColorAttachment=function(){if(this._colorAttachment instanceof e){var a=this._colorAttachment;if(this._initialized){this._context.bindFramebuffer(this);
var b=this._context.gl;b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,null,0)}a.dispose()}else this._colorAttachment instanceof WebGLRenderbuffer&&(a=this._colorAttachment,b=this._context.gl,this._initialized&&(this._context.bindFramebuffer(this),b.framebufferRenderbuffer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.RENDERBUFFER,null)),this._context.gl.deleteRenderbuffer(a));this._colorAttachment=null};c.prototype._disposeDepthStencilAttachments=function(){var a=this._context.gl;if(this._depthAttachment){if(this._initialized){this._context.bindFramebuffer(this);
var b=this._context.gl;b.framebufferRenderbuffer(b.FRAMEBUFFER,1===this._desc.depthStencilTarget?b.DEPTH_ATTACHMENT:b.DEPTH_STENCIL_ATTACHMENT,b.RENDERBUFFER,null)}a.deleteRenderbuffer(this._depthAttachment);this._depthAttachment=null}this._stencilAttachment&&(this._initialized&&(this._context.bindFramebuffer(this),b=this._context.gl,b.framebufferRenderbuffer(b.FRAMEBUFFER,b.STENCIL_ATTACHMENT,b.RENDERBUFFER,null)),a.deleteRenderbuffer(this._stencilAttachment),this._stencilAttachment=null);this._depthStencilTexture&&
(this._initialized&&(this._context.bindFramebuffer(this),a=this._context.gl,a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,null,0)),this._depthStencilTexture.dispose(),this._depthStencilTexture=null)};c._validateTextureDimensions=function(a,b){console.assert(0<=a.width&&0<=a.height);3553!==a.target&&console.error("Texture type must be TEXTURE_2D!");void 0!==b.width&&0<=b.width&&void 0!==b.height&&0<=b.height?(b.width!==a.width||b.height!==a.height)&&console.error("Color attachment texture must match the framebuffer's!"):
(b.width=a.width,b.height=a.height)};c._nextId=0;return c}()});