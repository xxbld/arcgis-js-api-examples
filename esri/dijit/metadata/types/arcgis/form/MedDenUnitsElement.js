// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/form/MedDenUnitsElement","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/query dijit/registry dojo/has ../../../../../kernel ../../../form/OpenElement dojo/i18n!../../../nls/i18nBase".split(" "),function(b,d,f,g,h,k,l,m,e){b=b([m],{postCreate:function(){this.inherited(arguments)},beforeValidateValue:function(b,a,c){if((null===c||0===d.trim(c).length)&&this._hasDensityValue())b=e.validation.pattern,c=e.validation.empty,a.isValid=!1,a.message=b.replace("{label}",
a.label).replace("{message}",c)},_hasDensityValue:function(){var b=g("[data-gxe-path\x3d'"+(this.parentElement.gxePath+"/medDensity")+"']",this.domNode.parentNode);return f.some(b,function(a){if((a=h.byNode(a))&&a.inputWidget)return a=a.inputWidget.getInputValue(),!(null===a||0===d.trim(a).length)})}});k("extend-esri")&&d.setObject("dijit.metadata.types.arcgis.form.MedDenUnitsElement",b,l);return b});