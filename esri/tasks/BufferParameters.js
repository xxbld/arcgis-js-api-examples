// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/tasks/BufferParameters","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/json dojo/has ../kernel ../geometry/Polygon ../geometry/jsonUtils".split(" "),function(a,g,k,d,h,l,m,n){a=a(null,{declaredClass:"esri.tasks.BufferParameters",geometries:null,outSpatialReference:null,bufferSpatialReference:null,distances:null,unit:null,unionResults:!1,geodesic:!1,toJson:function(){var c={unit:this.unit,unionResults:this.unionResults,geodesic:this.geodesic},a=this.distances,e=this.outSpatialReference,
f=this.bufferSpatialReference,g=k.map(this.geometries,function(a){a="extent"===a.type?m.fromExtent(a):a;return a.toJson()},this),b=this.geometries;if(b&&0<b.length){var h="extent"===b[0].type?"esriGeometryPolygon":n.getJsonType(b[0]);c.geometries=d.toJson({geometryType:h,geometries:g});c.inSR=b[0].spatialReference.wkid?b[0].spatialReference.wkid:d.toJson(b[0].spatialReference.toJson())}a&&(c.distances=a.join(","));e&&(c.outSR=e.wkid?e.wkid:d.toJson(e.toJson()));f&&(c.bufferSR=f.wkid?f.wkid:d.toJson(f.toJson()));
return c}});h("extend-esri")&&g.setObject("tasks.BufferParameters",a,l);return a});