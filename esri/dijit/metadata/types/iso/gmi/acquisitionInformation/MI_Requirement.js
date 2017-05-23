// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/iso/gmi/acquisitionInformation/templates/MI_Requirement.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject" data-dojo-props\x3d"target:\'gmi:MI_Requirement\',minOccurs:0"\x3e\r\n  \r\n    \x3c!-- \r\n      http://www.isotc211.org/2005/gmi/acquisitionInformation.xsd\r\n      \x3cxs:sequence\x3e\r\n        \x3cxs:element name\x3d"citation" type\x3d"gmd:CI_Citation_PropertyType" minOccurs\x3d"0"/\x3e\r\n        \x3cxs:element name\x3d"identifier" type\x3d"gmd:MD_Identifier_PropertyType"/\x3e\r\n        \x3cxs:element name\x3d"requestor" type\x3d"gmd:CI_ResponsibleParty_PropertyType" maxOccurs\x3d"unbounded"/\x3e\r\n        \x3cxs:element name\x3d"recipient" type\x3d"gmd:CI_ResponsibleParty_PropertyType" maxOccurs\x3d"unbounded"/\x3e\r\n        \x3cxs:element name\x3d"priority" type\x3d"gmi:MI_PriorityCode_PropertyType"/\x3e\r\n        \x3cxs:element name\x3d"requestedDate" type\x3d"gmi:MI_RequestedDate_PropertyType"/\x3e\r\n        \x3cxs:element name\x3d"expiryDate" type\x3d"gco:DateTime_PropertyType"/\x3e\r\n        \x3cxs:element name\x3d"satisifiedPlan" type\x3d"gmi:MI_Plan_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n      \x3c/xs:sequence\x3e\r\n     --\x3e\r\n     \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Tabs"\x3e\r\n    \r\n      \x3c!-- identification section --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n          data-dojo-props\x3d"showHeader:false,label:\'${i18nIso.MI_Requirement.sections.identification}\'"\x3e\r\n    \r\n         \x3c!-- citation - identification of reference or guidance material for the requirement --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:citation\',minOccurs:0,\r\n            label:\'${i18nIso.MI_Requirement.citation}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/citation/SimpleCI_Citation"\x3e\x3c/div\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute"\r\n            data-dojo-props\x3d"target:\'xlink:href\',label:\'${i18nIso.ObjectReference.xlinkref}\'"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- identifier - unique name, or code, for the requirement --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:identifier\',label:\'${i18nIso.MI_Requirement.identifier}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/identification/SimpleMD_Identifier"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- requestor section --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n          data-dojo-props\x3d"showHeader:false,label:\'${i18nIso.MI_Requirement.sections.requestor}\'"\x3e\r\n          \r\n        \x3c!-- requestor - origin of requirement  --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:requestor\',minOccurs:1,maxOccurs:\'unbounded\',\r\n            label:\'${i18nIso.MI_Requirement.requestor}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/citation/CI_ResponsibleParty"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e  \r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- recipient section --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n          data-dojo-props\x3d"showHeader:false,label:\'${i18nIso.MI_Requirement.sections.recipient}\'"\x3e\r\n          \r\n        \x3c!-- recipient - person(s), or body(ies), to receive results of requirement --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:recipient\',minOccurs:1,maxOccurs:\'unbounded\',\r\n            label:\'${i18nIso.MI_Requirement.recipient}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/citation/CI_ResponsibleParty"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- priority and dates section --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n          data-dojo-props\x3d"showHeader:false,label:\'${i18nIso.MI_Requirement.sections.priorityAndDates}\'"\x3e\r\n          \r\n        \x3c!-- priority - relative ordered importance, or urgency, of the requirement --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/CodeListReference"\r\n          data-dojo-props\x3d"target:\'gmi:priority\',\r\n            label:\'${i18nIso.MI_Requirement.priority}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/MI_PriorityCode"\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- requestedDate - required or preferred acquisition date and time --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:requestedDate\',showHeader:false,\r\n            label:\'${i18nIso.MI_Requirement.requestedDate}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject"\r\n            data-dojo-props\x3d"target:\'gmi:MI_RequestedDate\',minOccurs:0"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n              data-dojo-props\x3d"target:\'gmi:requestedDateOfCollection\',\r\n                label:\'${i18nIso.MI_RequestedDate.requestedDateOfCollection}\'"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement" data-dojo-props\x3d"target:\'gco:DateTime\'"\x3e\r\n                \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputDate" data-dojo-props\x3d"forceTime:true"\x3e\x3c/div\x3e\r\n              \x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n              data-dojo-props\x3d"target:\'gmi:latestAcceptableDate\',\r\n                label:\'${i18nIso.MI_RequestedDate.latestAcceptableDate}\'"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement" data-dojo-props\x3d"target:\'gco:DateTime\'"\x3e\r\n                \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputDate" data-dojo-props\x3d"forceTime:true"\x3e\x3c/div\x3e\r\n              \x3c/div\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- expiryDate - date and time after which collection is no longer valid --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n          data-dojo-props\x3d"target:\'gmi:expiryDate\',label:\'${i18nIso.MI_Requirement.expiryDate}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement" data-dojo-props\x3d"target:\'gco:DateTime\'"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputDate" data-dojo-props\x3d"forceTime:true"\x3e\x3c/div\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- satisified plan section --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n          data-dojo-props\x3d"showHeader:false,label:\'${i18nIso.MI_Requirement.sections.satisifiedPlan}\'"\x3e\r\n      \r\n        \x3c!-- satisifiedPlan (allow MI_Plan references) --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:satisifiedPlan\',minOccurs:0,maxOccurs:\'unbounded\',\r\n            label:\'${i18nIso.MI_Requirement.satisifiedPlanReference}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute" data-dojo-props\x3d"target:\'xlink:href\',showHeader:false"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/iso/gmi/acquisitionInformation/MI_Requirement","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/Attribute ../../../../form/Element ../../../../form/InputDate ../../../../form/Section ../../../../form/Tabs ../../../../form/iso/AbstractObject ../../../../form/iso/GcoElement ../../../../form/iso/ObjectReference ../../gmd/citation/SimpleCI_Citation ../../gmd/identification/SimpleMD_Identifier ../../gmd/citation/CI_ResponsibleParty ./MI_PriorityCode dojo/text!./templates/MI_Requirement.html ../../../../../../kernel".split(" "),
function(a,b,c,d,g,h,k,l,m,n,p,q,r,s,t,u,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.iso.gmi.acquisitionInformation.MI_Requirement",a,f);return a});