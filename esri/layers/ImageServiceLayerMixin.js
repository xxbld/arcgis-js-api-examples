// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/layers/ImageServiceLayerMixin","dojo/_base/declare dojo/_base/lang dojo/_base/Deferred dojo/_base/array dojo/_base/json dojo/_base/config dojo/_base/connect dojo/has dojo/io-query ../kernel ../config ../lang ../request ../deferredUtils ../urlUtils ../geometry/Extent ../geometry/Point ../geometry/Polygon ./MosaicRule ./RasterFunction ./DimensionalDefinition ./Raster ./PixelBlock ./pixelFilters/VectorFieldPixelFilter ./rasterFormats/ImageCanvasDecoder ./TimeInfo ./Field ../graphic ../tasks/ImageServiceIdentifyTask ../tasks/ImageServiceIdentifyParameters".split(" "),
function(I,f,q,r,z,K,N,Q,R,S,T,B,C,n,L,J,U,V,A,O,P,W,M,X,Y,Z,$,aa,ba,ca){I=I(null,{declaredClass:"esri.layers.ImageServiceLayerMixin",_rasterFieldPrefix:"Raster.",_renderingRuleFieldSubPrefix:"ServicePixelValue.",_eventMap:{"rendering-change":!0,"mosaic-rule-change":!0,"spatial-reference-change":!0},constructor:function(a,b){this.useMapTime=b&&b.hasOwnProperty("useMapTime")?!!b.useMapTime:!0},_initialize:function(a,b){this._url=L.urlToObject(a);this.raster=new W(this._url.path);this.infoTemplate=
b&&b.infoTemplate;var c=b&&b.imageServiceParameters;this.format=c&&c.format;this.compressionTolerance=c&&c.compressionTolerance?c.compressionTolerance:0.01;this.interpolation=c?c.interpolation:null;this.compressionQuality=c?c.compressionQuality:null;this.bandIds=c?c.bandIds:null;this.mosaicRule=c?c.mosaicRule:null;this.renderingRule=c?c.renderingRule:null;this.useMapDimensionValue=b&&b.hasOwnProperty("useMapDimensionValue")?!!b.useMapDimensionValue:!0;this.activeMapDimensions=b&&b.activeMapDimensions;
this._params=f.mixin({},this._url.query,{f:"image",interpolation:this.interpolation,format:this.format,compressionQuality:this.compressionQuality,bandIds:this.bandIds?this.bandIds.join(","):null},c?c.toJson():{});this.pixelFilter=b&&b.pixelFilter;this.originalPixelData=this.pixelData=null;this.hasDataChanged=!0;this._requestDataHandler=f.hitch(this,this._requestDataHandler);this._requestDataErrorHandler=f.hitch(this,this._requestDataErrorHandler);this._rasterReadPromise=null;this._initLayer=f.hitch(this,
this._initLayer);this._queryVisibleRastersHandler=f.hitch(this,this._queryVisibleRastersHandler);this._visibleRasters=[];this._rasterAttributeTableFields=[];this._rasterAttributeTableFeatures=[];this._renderingRuleAttributeTable={};this._useRenderingRuleAttributeTable=!1;this._loadCallback=b&&b.loadCallback;(c=b&&b.resourceInfo)?this._initLayer(c):C({url:this._url.path,content:f.mixin({f:"json"},this._url.query),callbackParamName:"callback",load:this._initLayer,error:this._errorHandler});this.registerConnectEvents()},
disableClientCaching:!1,_initLayer:function(a,b){if(!(null===a||void 0===a)){this._findCredential();(this.credential&&this.credential.ssl||a&&a._ssl)&&this._useSSL();var c=this.minScale,d=this.maxScale;f.mixin(this,a);this.minScale=c;this.maxScale=d;this.initialExtent=this.fullExtent=this.extent=new J(a.extent);this.spatialReference=this.initialExtent.spatialReference;this.pixelSizeX=parseFloat(this.pixelSizeX);this.pixelSizeY=parseFloat(this.pixelSizeY);for(var e=this.minValues,k=this.maxValues,
h=this.meanValues,y=this.stdvValues,u=this.bands=[],c=0,d=this.bandCount;c<d;c++)u[c]={min:e[c],max:k[c],mean:h[c],stddev:y[c]};this.timeInfo=(c=this.timeInfo)&&c.timeExtent?new Z(c):null;d=this.fields=[];if(e=a.fields)for(c=0;c<e.length;c++)d.push(new $(e[c]));this.version=a.currentVersion;this.version||(this.version="fields"in a||"objectIdField"in a||"timeInfo"in a?10:9.3);B.isDefined(a.minScale)&&!this._hasMin&&this.setMinScale(a.minScale);B.isDefined(a.maxScale)&&!this._hasMax&&this.setMaxScale(a.maxScale);
c={};a.defaultMosaicMethod?(c.method=a.defaultMosaicMethod,c.operation=a.mosaicOperator,c.sortField=a.sortField,c.sortValue=a.sortValue):c.method=A.METHOD_NONE;this.defaultMosaicRule=new A(c);this.defaultMosaicRule.ascending=!0;this._useRenderingRuleAttributeTable=10<this.version&&"esriImageServiceDataTypeThematic"===this.serviceDataType&&!this.hasRasterAttributeTable;this._setDefaultRenderingRule(!0);this._isScientificData()&&(!this.mosaicRule||this.mosaicRule&&!this.mosaicRule.multidimensionalDefinition)&&
this._setDefaultMultidimensionalDefinition(!0);10<this.version&&this.hasRasterAttributeTable&&this.getRasterAttributeTable().then(f.hitch(this,function(a){a&&(a.features&&0<a.features.length)&&(this._rasterAttributeTableFeatures=f.clone(a.features));a&&(a.fields&&0<a.fields.length)&&(this._rasterAttributeTableFields=f.clone(a.fields))}));this._isVectorData()&&!B.isDefined(this.pixelFilter)&&(this.vectorFieldPixelFilter=new X,this.vectorFieldPixelFilter.isDataUV="esriImageServiceDataTypeVector-UV"===
this.serviceDataType,this.pixelFilter=this.vectorFieldPixelFilter.computeMagnitudeAndDirection,this.getKeyProperties().then(f.hitch(this,this._setFlowRepresentation)));this.loaded=!0;this._setDefaultFilter();this.onLoad(this);if(c=this._loadCallback)delete this._loadCallback,c(this)}},getKeyProperties:function(){var a=this._url.path+"/keyProperties",b=new q(n._dfdCanceller);10<this.version?(b._pendingDfd=C({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),b._pendingDfd.then(function(a){b.callback(a)},
function(a){b.errback(a)})):(a=Error("Layer does not have key properties"),a.log=K.isDebug,b.errback(a));return b},getRasterAttributeTable:function(a){var b=this._url.path+"/rasterAttributeTable",c=new q(n._dfdCanceller),d={f:"json"},e=this.hasRasterAttributeTable;a&&a.renderingRule&&(d.renderingRule=z.toJson(a.renderingRule.toJson()),e=!0);10<this.version&&e?(c._pendingDfd=C({url:b,content:d,handleAs:"json",callbackParamName:"callback"}),c._pendingDfd.then(function(a){c.callback(a)},function(a){c.errback(a)})):
(a=Error("Layer does not support raster attribute table"),a.log=K.isDebug,c.errback(a));return c},_getRenderingRuleAttributeTable:function(a){var b=new q(n._dfdCanceller);if(!a||!a.renderingRule)return b.errback(Error("Rendering rule is not specified")),b;a=a.renderingRule;var c=a.functionName;this._renderingRuleAttributeTable&&c&&this._renderingRuleAttributeTable.hasOwnProperty(c)?b.resolve(this._renderingRuleAttributeTable[c]):b=this.getRasterAttributeTable({renderingRule:a}).then(f.hitch(this,
function(a){var b;a&&(a.features&&a.features.length&&a.fields&&a.fields.length)&&(b={features:f.clone(a.features),fields:f.clone(a.fields)},c&&(this._renderingRuleAttributeTable[c]=b));return b}));return b},_getRasterAttributeTableFeatures:function(){var a=new q;if(this._rasterAttributeTableFeatures&&0<this._rasterAttributeTableFeatures.length)return a.resolve(this._rasterAttributeTableFeatures),a;if(10<this.version&&this.hasRasterAttributeTable)return a=this.getRasterAttributeTable(),a.then(f.hitch(this,
function(a){a&&(a.features&&0<a.features.length)&&(this._rasterAttributeTableFeatures=f.clone(a.features))})),a;a.resolve(this._rasterAttributeTableFeatures);return a},_getRenderingRuleAttributeTableFeatures:function(a){a=a&&a.renderingRule;return!a?(a=new q,a.errback(Error("Rendering rule is not specified")),a):this._getRenderingRuleAttributeTable({renderingRule:a}).then(function(a){return a&&a.features})},getCustomRasterFields:function(a){var b=a?a.rasterAttributeTableFieldPrefix:this._rasterFieldPrefix;
a=10.3<=this.version?"esriFieldTypeDouble":"esriFieldTypeString";var c={name:this._rasterFieldPrefix+"ItemPixelValue",alias:"Item Pixel Value",domain:null,editable:!1,length:50,type:a},d={name:this._rasterFieldPrefix+"ServicePixelValue",alias:"Service Pixel Value",domain:null,editable:!1,length:50,type:a},e={name:this._rasterFieldPrefix+"ServicePixelValue.Raw",alias:"Raw Service Pixel Value",domain:null,editable:!1,length:50,type:"esriFieldTypeDouble"},k=this.fields?f.clone(this.fields):[];a=k.length;
k[a]=d;if(10.4<=this.version&&"esri.layers.ArcGISImageServiceLayer"===this.declaredClass&&(!this.rasterFunctionInfos||!this.rasterFunctionInfos.length||this._isRasterFunctionInfoAvailable("none")))a++,k[a]=e;if(this.capabilities&&-1<this.capabilities.toLowerCase().indexOf("catalog")||this.fields&&0<this.fields.length)a++,k[a]=c;if(B.isDefined(this.pixelFilter)&&("esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType))c={name:this._rasterFieldPrefix+
"Magnitude",alias:"Magnitude",domain:null,editable:!1,type:"esriFieldTypeDouble"},d={name:this._rasterFieldPrefix+"Direction",alias:"Direction",domain:null,editable:!1,type:"esriFieldTypeDouble"},a++,k[a]=c,a++,k[a]=d;a=this._rasterAttributeTableFields;if((c=this.renderingRule&&this.renderingRule.functionName)&&this._renderingRuleAttributeTable&&this._renderingRuleAttributeTable.hasOwnProperty(c))a=this._renderingRuleAttributeTable[c].fields;a&&0<a.length&&(a=r.filter(a,function(a){return"esriFieldTypeOID"!==
a.type&&"value"!==a.name.toLowerCase()}),a=r.map(a,function(a){var c=f.clone(a);c.name=b+a.name;return c}),k=k.concat(a));var h=this._rasterFieldPrefix+this._renderingRuleFieldSubPrefix;10.4<=this.version&&this.rasterFunctionInfos&&r.forEach(this.rasterFunctionInfos,function(a){a&&(a.name&&"none"!==a.name.toLowerCase())&&(a={name:h+a.name.replace(/ /gi,"_"),alias:a.name,domain:null,editable:!1,type:"esriFieldTypeDouble"},k.push(a))});return k},_prepareGetImageParameters:function(a,b,c,d){d=B.isDefined(d)?
d:this._params;var e=a.spatialReference.wkid||z.toJson(a.spatialReference.toJson(!1));delete d._ts;f.mixin(d,{bbox:a.xmin+","+a.ymin+","+a.xmax+","+a.ymax,imageSR:e,bboxSR:e,size:b+","+c},this.disableClientCaching?{_ts:(new Date).getTime()}:{});delete d.compressionTolerance;d.format&&"LERC"===d.format.toUpperCase()&&(d.compressionTolerance=this.compressionTolerance);d.token=this._getToken()},getImageUrl:function(a,b,c,d,e){e=B.isDefined(e)?e:this._params;this._prepareGetImageParameters(a,b,c,e);a=
f.clone(e);this._cleanupRequestParams(a);b=this._url.path+"/exportImage?";c=L.addProxy(b+R.objectToQuery(f.mixin(a,{f:"image"})));var k=a.token;c.length>T.defaults.io.postLength||this.useMapImage?this._jsonRequest=C({url:b,content:f.mixin(a,{f:"json"}),callbackParamName:"callback",load:function(a,b){var c=a.href;k&&(c+=-1===c.indexOf("?")?"?token\x3d"+k:"\x26token\x3d"+k);d(L.addProxy(c))},error:this._errorHandler}):d(c)},onRenderingChange:function(){},onMosaicRuleChange:function(){},setInterpolation:function(a,
b){this.interpolation=this._params.interpolation=a;b||this.refresh(!0)},setCompressionQuality:function(a,b){this.compressionQuality=this._params.compressionQuality=a;b||this.refresh(!0)},setCompressionTolerance:function(a,b){this.compressionTolerance=a;b||this.refresh(!0)},setBandIds:function(a,b){var c=!1;this.bandIds!==a&&(c=!0);this.bandIds=a;this._params.bandIds=a.join(",");if(c&&!b)this.onRenderingChange();b||this.refresh(!0)},setDefaultBandIds:function(a){this.bandIds=this._params.bandIds=null;
a||this.refresh(!0)},setDisableClientCaching:function(a){this.disableClientCaching=a},setMosaicRule:function(a,b){var c=!1;this.mosaicRule!==a&&(c=!0);this.mosaicRule=a;this._params.mosaicRule=z.toJson(a.toJson());if(c&&!b)this.onMosaicRuleChange();b||this.refresh(!0)},setRenderingRule:function(a,b){var c=!1;this.renderingRule!==a&&(c=!0);this.renderingRule=a;this._params.renderingRule=a?z.toJson(a.toJson()):null;this._useRenderingRuleAttributeTable&&this._getRenderingRuleAttributeTable({renderingRule:a});
if(c)this.onRenderingChange();this._setDefaultFilter();b||this.refresh(!0)},setImageFormat:function(a,b){this.format=this._params.format=a;this._setDefaultFilter();b||this.refresh(!0)},setInfoTemplate:function(a){this.infoTemplate=a},setDefinitionExpression:function(a,b){var c=this.mosaicRule?this.mosaicRule.toJson():{};this.mosaicRule||(this.defaultMosaicRule?c=this.defaultMosaicRule.toJson():c.method=A.METHOD_NONE);c.where=a;c=new A(c);this.setMosaicRule(c,b);return this},getDefinitionExpression:function(){return this.mosaicRule?
this.mosaicRule.where:null},setPixelFilter:function(a){this.pixelFilter=a;this._isDefaultPixelFilter=!1},getPixelData:function(a){return a?(this._useBrowserDecoding()&&(this.originalPixelData={pixelBlock:this._getPixelBlockFromCanvas(this._context,this._map.width,this._map.height),extent:this._map.extent}),this.originalPixelData):this.pixelData},redraw:function(){this.hasDataChanged=!1;this._setPixelData(this.originalPixelData)},queryVisibleRasters:function(a,b,c,d){var e=this._map,k=n._fixDfd(new q(n._dfdCanceller));
this._visibleRasters=[];var h,y,u=!0,m=this.infoTemplate?this.infoTemplate.info:null,g=m?f.clone(this.infoTemplate.info.fieldInfos):null;b=b||{};if(m&&this.infoTemplate.info.mediaInfos&&this.infoTemplate.info.mediaInfos.length){var l=[];r.forEach(this.infoTemplate.info.mediaInfos,function(a){l=l.concat(a&&a.value&&a.value.fields||[])});l.length&&r.forEach(g,function(a){a&&-1<l.indexOf(a.fieldName)&&(a.visible=!0)})}if(g&&0<g.length){u=!1;for(h=0;h<g.length;h++)if((y=g[h])&&y.fieldName.toLowerCase()!==
this._rasterFieldPrefix.toLowerCase()+"servicepixelvalue"&&(y.visible||m.title&&-1<m.title.toLowerCase().indexOf(y.fieldName.toLowerCase()))){u=!0;break}}var v=(y=this._removeVisualizationStretchFunction(this.renderingRule))&&y.functionName,t=[];if(10.4<=this.version){var s=!1;if(this.rasterFunctionInfos&&g){var p=this._rasterFieldPrefix+this._renderingRuleFieldSubPrefix;r.forEach(this.rasterFunctionInfos,function(a){var b=p+a.name.replace(/ /gi,"_");r.some(g,function(a){return a.visible&&a.fieldName===
b})&&(s=s||v&&v===a.name,t.push(new O({rasterFunction:a.name})))})}y&&!s&&t.push(y)}h=new ca;h.geometry=a.geometry;h.returnGeometry=this._map.spatialReference.equals(this.spatialReference);h.returnCatalogItems=u;h.timeExtent=a.timeExtent;h.mosaicRule=this.mosaicRule||null;h.renderingRule=10.4>this.version&&y||null;h.renderingRules=t||null;e&&(a=new U((e.extent.xmax-e.extent.xmin)/e.width,(e.extent.ymax-e.extent.ymin)/e.height,e.extent.spatialReference),h.pixelSize=a);b.requestParams=h;var G=this;
a=new ba(this.url);(k._pendingDfd=a.execute(h)).addCallbacks(function(a){G._queryVisibleRastersHandler(a,b,c,d,k)},function(a){G._resolve([a],null,d,k,!0)});return k},_queryVisibleRastersHandler:function(a,b,c,d,e){function k(){var a=this.getCustomRasterFields(b),d=this._getDomainFields(a),k=b?b.returnDomainValues:!1,g=b&&b.rasterAttributeTableFieldPrefix,l,s,t,v,p,x,q,n,z,A;this._useRenderingRuleAttributeTable&&this.renderingRule?(a=this._getRenderingRuleAttributeTableFeatures({renderingRule:this.renderingRule}),
A=h):a=this._getRasterAttributeTableFeatures();a.then(f.hitch(this,function(a){for(l=0;l<m.length;l++){w=m[l];w.setInfoTemplate(this.infoTemplate);w._layer=this;if(h){z=h.replace(/ /gi,"").split(",");s=h;t=z;u&&u.length>=l&&(s=u[l].replace(/ /gi,", "),t=u[l].split(" "));w.attributes[this._rasterFieldPrefix+"ItemPixelValue"]=t;w.attributes[this._rasterFieldPrefix+"ServicePixelValue"]=z;y&&(w.attributes[this._rasterFieldPrefix+"ServicePixelValue.Raw"]=y.replace(/ /gi,"").split(","));if(this.pixelFilter){var b=
new M({height:1,width:1,pixelType:"F32",pixels:[],statistics:[]});r.forEach(t,function(a){b.addData({pixels:[a],statistics:{minValue:a,maxValue:a,noDataValue:null}})});this.pixelFilter({pixelBlock:b,extent:new J(0,0,0,0,this._map.spatialReference)});if("esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType)w.attributes[this._rasterFieldPrefix+"Magnitude"]=b.pixels[0][0],w.attributes[this._rasterFieldPrefix+"Direction"]=b.pixels[1][0]}r.forEach(G,
function(a){w.attributes[a.name]=a.value});var F=A||s;if(a&&0<a.length&&(v=r.filter(a,function(a){if(a&&a.attributes)return a.attributes.hasOwnProperty("Value")?a.attributes.Value==F:a.attributes.VALUE==F}),0<v.length&&(p=f.clone(v[0]),g&&p))){n={};for(x in p.attributes)p.attributes.hasOwnProperty(x)&&(q=g+x,n[q]=p.attributes[x]);p.attributes=n;w.attributes=f.mixin(w.attributes,p.attributes)}}k&&(d&&0<d.length)&&r.forEach(d,function(a){if(a){var b=w.attributes[a.name];B.isDefined(b)&&(b=this._getDomainValue(a.domain,
b),B.isDefined(b)&&(w.attributes[a.name]=b))}},this);H.push(w);this._visibleRasters.push(w)}this._resolve([H,null,!0],null,c,e)}))}var h=a.value,y=a.value,u,m,g=0,l=0,v=this,t=this.objectIdField,s,p,G=[];d=b.requestParams.renderingRules;var x=a.processedValues,F=this.renderingRule&&z.toJson(this._removeVisualizationStretchFunction(this.renderingRule).toJson());if(d&&x&&d.length===x.length){var q=this._rasterFieldPrefix+this._renderingRuleFieldSubPrefix;r.forEach(d,function(a,b){if(a.functionName){var c=
{name:q+a.functionName.replace(/ /gi,"_"),value:x[b].replace(/ /gi,"").split(",")};G.push(c);F&&F===z.toJson(a.toJson())&&(h=x[b])}})}d=this.infoTemplate&&this.infoTemplate.info&&this.infoTemplate.info.layerOptions&&this.infoTemplate.info.layerOptions.hasOwnProperty("showNoDataRecords")?this.infoTemplate.info.layerOptions.showNoDataRecords:!0;if(a.catalogItems){var n=0,A,D,E=a.catalogItems.features.length;p=0;m=Array(E);u=Array(E);s=Array(E);for(g=0;g<E;g++)-1<a.properties.Values[g].toLowerCase().indexOf("nodata")&&
p++;A=E-p;for(g=0;g<E;g++)p=!0,-1<a.properties.Values[g].toLowerCase().indexOf("nodata")?(D=A++,d||(p=!1,m.length--,u.length--,s.length--)):D=n++,p&&(m[D]=a.catalogItems.features[g],u[D]=a.properties.Values[g],s[D]=m[D].attributes[t])}this._visibleRasters=[];var w;if((a=-1<h.toLowerCase().indexOf("nodata"))&&!d)m=[],u=[],s=[];h&&(!m&&!a)&&(t="ObjectId",m=[],w=new aa(new J(this.fullExtent),null,{ObjectId:0}),m.push(w));var H=[];m?!this._map.spatialReference.equals(this.spatialReference)&&s&&0<s.length?
C({url:this._url.path+"/query",content:{f:"json",objectIds:s.join(","),returnGeometry:!0,outSR:z.toJson(v._map.spatialReference.toJson()),outFields:t},handleAs:"json",callbackParamName:"callback",load:function(a){if(0===a.features.length)v._resolve([H,null,null],null,c,e);else{for(g=0;g<a.features.length;g++)for(l=0;l<m.length;l++)m[l].attributes[t]==a.features[g].attributes[t]&&(m[l].geometry=new V(a.features[g].geometry),m[l].geometry.setSpatialReference(v._map.spatialReference));k.call(v)}},error:function(a){v._resolve([H,
null,null],null,c,e)}}):k.call(this):this._resolve([H,null,null],null,c,e)},getVisibleRasters:function(){var a=this._visibleRasters,b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(a[c]);return b},_getDomainFields:function(a){if(a){var b=[];r.forEach(a,function(a){if(a.domain){var d={};d.name=a.name;d.domain=a.domain;b.push(d)}});return b}},_getDomainValue:function(a,b){if(a&&a.codedValues){var c;r.some(a.codedValues,function(a){return a.code===b?(c=a.name,!0):!1});return c}},_requestData:function(a,
b,c){this._rasterReadPromise&&this._rasterReadPromise.cancel();a=f.clone(a);var d=a._normalize(!0);this._prepareGetImageParameters(d,b,c);b=f.clone(this._params);this._cleanupRequestParams(b);b.extent=a;b.format=b.format||(10.3<=this.version?"lerc":"jpgpng");"lerc"===b.format.toLowerCase()&&(!b.lercVersion&&10.5<=this.version)&&(b.lercVersion=2);c=null;this._useBrowserDecoding()&&(c=new Y({ctx:this._context}));b={imageServiceParameters:b,nBands:Math.min(this.bandCount,3),pixelType:this.pixelType,
decodeFunc:c?f.hitch(c,"decode"):null};this._rasterReadPromise=this.raster.read(b,this._requestDataHandler,this._requestDataErrorHandler)},_requestDataHandler:function(a){if(!this._rasterReadPromise||!this._rasterReadPromise.isCanceled())this.originalPixelData=a,this.hasDataChanged=!0,this._setPixelData(a)},_setPixelData:function(a){a=this._clonePixelData(a);this.pixelFilter&&this.pixelFilter(a);this.pixelData=a;if(!this._rasterReadPromise||!this._rasterReadPromise.isCanceled())this._drawPixelData(),
this._rasterReadPromise=null},_clonePixelData:function(a){if(null===a||void 0===a)return a;var b={};a.extent&&(b.extent=f.clone(a.extent));a=a.pixelBlock;if(null===a||void 0===a)return b;b.pixelBlock=a.clone();return b},_setDefaultFilter:function(){},_getPixelBlockFromCanvas:function(a,b,c){a=a.getImageData(0,0,b,c).data;for(var d=b*c,e=0,f=0,h=new Uint8Array(d),r=new Uint8Array(d),u=new Uint8Array(d),m=new Uint8Array(d),g=Infinity,l=Infinity,v=Infinity,t=-Infinity,s=-Infinity,p=-Infinity,n,x,q,e=
0;e<d;e++)n=a[f++],x=a[f++],q=a[f++],g=g<n?g:n,t=t>n?t:n,l=l<x?l:x,s=s>x?s:x,v=v<q?v:q,p=p>q?p:q,h[e]=n,r[e]=x,u[e]=q,m[e]=a[f++]&1;return new M({width:b,height:c,pixels:[h,r,u],pixelType:"U8",mask:m,statistics:[{minValue:g,maxValue:t},{minValue:l,maxValue:s},{minValue:v,maxValue:p}]})},_useBrowserDecoding:function(){return(void 0===this.pixelFilter||null===this.pixelFilter)&&("jpeg"===this.format.toLowerCase()||"jpg"===this.format.toLowerCase()||-1<this.format.toLowerCase().indexOf("png"))},getMultidimensionalInfo:function(){var a=
this._url.path+"/multiDimensionalInfo",b=new q(n._dfdCanceller);if(this._multidimensionalInfo)return b.resolve(this._multidimensionalInfo),b;10.3<=this.version&&this.hasMultidimensions?(b._pendingDfd=C({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),b._pendingDfd.then(f.hitch(this,function(a){this._multidimensionalInfo=a.multidimensionalInfo;b.callback(a.multidimensionalInfo)}),function(a){b.errback(a)})):(a=Error("Layer does not support multidimensional info"),a.log=K.isDebug,
b.errback(a));return b},getDefaultMultidimensionalDefinition:function(){var a,b,c,d=[],e=new q(n._dfdCanceller);if(this._defaultMultidimensionalDefinition)return e.resolve(this._defaultMultidimensionalDefinition),e;e._pendingDfd=this.getMultidimensionalInfo();e._pendingDfd.then(f.hitch(this,function(f){a=f;b=a.variables[0].dimensions;for(c in b)b.hasOwnProperty(c)&&(b[c].hasRanges?d.push(new P({variableName:"",dimensionName:b[c].name,isSlice:!1,values:[b[c].values[0]]})):d.push(new P({variableName:"",
dimensionName:b[c].name,isSlice:!0,values:[b[c].extent[0]]})));this._defaultMultidimensionalDefinition=d;e.callback(d)}),function(a){e.errback(a)});return e},_setDefaultMultidimensionalDefinition:function(a){var b,c={};this.getDefaultMultidimensionalDefinition().then(f.hitch(this,function(d){b=d;0<b.length&&(this.mosaicRule?(c=f.clone(this.mosaicRule),c.multidimensionalDefinition=b):this.defaultMosaicRule?(c=f.clone(this.defaultMosaicRule),c.multidimensionalDefinition=b):c=new A({multidimensionalDefinition:b}),
this.setMosaicRule(c,a))}))},_setDefaultRenderingRule:function(a){var b={};if(!this.renderingRule&&"esri.layers.ArcGISImageServiceVectorLayer"!==this.declaredClass&&this.rasterFunctionInfos&&this.rasterFunctionInfos.length&&"none"!==this.rasterFunctionInfos[0].name.toLowerCase())b.rasterFunction=this.rasterFunctionInfos[0].name;else if(!this.renderingRule&&"esri.layers.ArcGISImageServiceVectorLayer"===this.declaredClass&&10.3<this.version){var c="esriImageServiceDataTypeVector-UV"===this.serviceDataType?
7:10;b.rasterFunction="Resample";b.rasterFunctionArguments={ResamplingType:c,InputCellSize:{x:this.pixelSizeX,y:this.pixelSizeY}}}b.hasOwnProperty("rasterFunction")&&(this.defaultRenderingRule=new O(b),this.setRenderingRule(this.defaultRenderingRule,a))},_cleanupRequestParams:function(a){if(!a)return a;if(a.time&&a.mosaicRule){var b=new A(z.fromJson(a.mosaicRule));if(b&&b.multidimensionalDefinition&&0<b.multidimensionalDefinition.length){var c=r.filter(b.multidimensionalDefinition,function(a){return"StdTime"!==
a.dimensionName});b.multidimensionalDefinition=c;a.mosaicRule=z.toJson(b.toJson())}}var b="displayOnPan drawMode styling id opacity visible resourceInfo useMapDimensionValue extent".split(" "),d;for(d in b)a.hasOwnProperty(b[d])&&delete a[b[d]];return a},_removeVisualizationStretchFunction:function(a){var b=a&&a.functionName;if(!b||"stretch"!==b.toLowerCase())return a;var c=a.functionArguments.Raster;return c&&c.functionName&&r.some(this.rasterFunctionInfos,function(a){return c.functionName===a.name})?
c:a},_isScientificData:function(){return"esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType||"esriImageServiceDataTypeScientific"===this.serviceDataType},_isVectorData:function(){return"esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType},_isRasterFunctionInfoAvailable:function(a){return r.some(a&&(this.rasterFunctionInfos||[]),function(b){return b&&b.name&&
b.name.toLowerCase()===a.toLowerCase()})},_createPixelData:function(a){a=new M({width:2,height:2,pixels:a,pixelType:this.pixelType,statistics:a});var b=this.fullExtent.getCenter(),b=new J(b.x,b.y,b.x+this.pixelSizeX,b.y+this.pixelSizeY,this.spatialReference);return{pixelBlock:a,extent:b}},_resolve:function(a,b,c,d,e){b&&this[b].apply(this,a);c&&c.apply(null,a);d&&n._resDfd(d,a,e)},_toggleTime:function(){var a=this._map;this.timeInfo&&this.useMapTime&&a&&!this.suspended?(this._timeConnect||(this._timeConnect=
N.connect(a,"onTimeExtentChange",this,this._onTimeExtentChangeHandler)),this._setTime(a.timeExtent)):(N.disconnect(this._timeConnect),this._timeConnect=null,this._setTime(null))},setUseMapTime:function(a,b){this.useMapTime=a;this._toggleTime();!b&&this._map&&this.refresh(!0)},_setTime:function(a){this._params&&(this._params.time=a?a.toJson().join(","):null)},_onTimeExtentChangeHandler:function(a){this.suspended||(this._setTime(a),this.refresh(!0))},handleSpatialReferenceChange:function(){this.onSpatialReferenceChange()}});
Q("extend-esri")&&f.setObject("layers.ImageServiceLayerMixin",I,S);return I});