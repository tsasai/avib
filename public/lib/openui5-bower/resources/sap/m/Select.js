/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Select");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Select",{metadata:{publicMethods:["isOpen","open","close","getItemByKey","getFirstItem","getLastItem","getItemAt"],library:"sap.m",properties:{"name":{type:"string",group:"Misc",defaultValue:null},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'auto'},"maxWidth":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},"selectedKey":{type:"string",group:"Data",defaultValue:null},"selectedItemId":{type:"string",group:"Misc",defaultValue:null},"icon":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},"type":{type:"sap.m.SelectType",group:"Appearance",defaultValue:sap.m.SelectType.Default},"autoAdjustWidth":{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"items",aggregations:{"items":{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"}},associations:{"selectedItem":{type:"sap.ui.core.Item",multiple:false}},events:{"change":{}}}});sap.m.Select.M_EVENTS={'change':'change'};jQuery.sap.require("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.m.SelectRenderer");jQuery.sap.require("sap.m.Input");jQuery.sap.require("sap.m.Bar");jQuery.sap.require("sap.m.List");jQuery.sap.require("sap.m.Popover");jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle();sap.ui.core.EnabledPropagator.apply(sap.m.Select.prototype,[true]);
sap.m.Select.prototype._cacheDomRefs=function(){this._$Select=this.$();this._$Label=this._$Select.children("."+sap.m.SelectRenderer.CSS_CLASS+"Label")};
sap.m.Select.prototype._getParentPopup=function(){return(this._$Select&&this._$Select.closest("[data-sap-ui-popup]"))||null};
sap.m.Select.prototype._synchronizeSelectedItemAndKey=function(i,k,I){if(!I.length){this._setSelectedItem({item:null,id:"",key:"",suppressInvalidate:true});jQuery.sap.log.info("Info: _synchronizeSelectedItemAndKey() the select control does not contain any item on ",this);return}if(k!==(i&&i.getKey())){i=this.getItemByKey(""+k);if(i){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true);return}if(k!==""&&i){jQuery.sap.log.warning('Warning: _synchronizeSelectedItemAndKey() the key "'+k+'" has no corresponding aggregated item on ',this)}else{i=this._findFirstEnabledItem();if(i){this._setSelectedItem({item:i,id:i.getId(),key:i.getKey(),suppressInvalidate:true})}}}else if(I.indexOf(i)===-1){jQuery.sap.log.warning('Warning: _synchronizeSelectedItemAndKey() the sap.ui.core.Item instance or sap.ui.core.Item id is not a valid aggregation on',this)}};
sap.m.Select.prototype._findFirstEnabledItem=function(I){var I=I||this.getItems();for(var i=0;i<I.length;i++){if(I[i].getEnabled()){return I[i]}}return null};
sap.m.Select.prototype._findLastEnabledItem=function(i){var i=i||this.getItems();return this._findFirstEnabledItem(i.reverse())};
sap.m.Select.prototype._setSelectedItem=function(o){var i=this.getSelectedItem();if(o.item===i){return}this.setAssociation("selectedItem",o.item,o.suppressInvalidate);this.setProperty("selectedItemId",o.id,o.suppressInvalidate);this.setProperty("selectedKey",o.key,o.suppressInvalidate);i=this.getSelectedItem();this._setValue(i?i.getText():((i=this._findFirstEnabledItem())?i.getText():""));if(o.fireChangeEvent){this.fireChange({selectedItem:i})}if(!o.listItemUpdated){this._setSelectedListItem(this._getSelectedListItem())}};
sap.m.Select.prototype._setSelectedListItem=function(s){if(!this._oList){return}s=s||this._oList.getItems()[0];if(s){this._oList.setSelectedItem(s,true)}};
sap.m.Select.prototype._setSelectedItemByIndex=function(i){var I=this.getItems(),o;i=(i>I.length-1)?I.length-1:Math.max(0,i);o=I[i];if(o){this._setSelectedItem({item:o,id:o.getId(),key:o.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._focusItem(this._getSelectedListItem())}};
sap.m.Select.prototype._getSelectedListItem=function(){var i=this.getSelectedItem();return(i&&i._oListItem)?i._oListItem:null};
sap.m.Select.prototype._addFocusableParentPopup=function(d){sap.m.Select._publishEventToPopup({action:"add",child:this.getPopup(),parent:d})};
sap.m.Select.prototype._removeFocusableParentPopup=function(d){sap.m.Select._publishEventToPopup({action:"remove",child:this.getPopup(),parent:d})};
sap.m.Select._publishEventToPopup=function(o){var p,e;if(!o.parent||!o.child){return}p=o.parent.attr("data-sap-ui-popup");e="sap.ui.core.Popup."+o.action+"FocusableContent"+"-"+p;sap.ui.getCore().getEventBus().publish("sap.ui",e,{id:o.child.getId()})};
sap.m.Select.prototype._focusItem=function(l){if(!l){return}l.focus();jQuery.sap.delayedCall(0,this,"focus")};
sap.m.Select.prototype._setValue=function(v){if(this._$Label&&this._$Label.length){this._$Label.text(v)}};
sap.m.Select.prototype._mapItemToListItem=function(i){var l=new sap.m.StandardListItem();l.setTitle(i.getText());l.setType(i.getEnabled()?sap.m.ListType.Active:sap.m.ListType.Inactive);l.setTooltip(i.getTooltip());i._oListItem=l;return l};
sap.m.Select.prototype._findMappedItem=function(l,I){for(var i=0,I=I||this.getItems(),a=I.length;i<a;i++){if(I[i]._oListItem===l){return I[i]}}return null};
sap.m.Select.prototype._updateSelectedItem=function(n){this._setSelectedItem({item:n,id:n.getId(),key:n.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:true})};
sap.m.Select.prototype._fillList=function(I){if(!I){return}for(var i=0,l,s=this.getSelectedItem(),a=I.length;i<a;i++){l=this._mapItemToListItem(I[i]);this._oList.addAggregation("items",l,true);if(I[i]===s){this._oList.setSelectedItem(l)}}};
sap.m.Select.prototype._clearList=function(){this._oList&&this._oList.destroyAggregation("items",true)};
sap.m.Select.prototype._createPopupFactory=function(p){if(!this.hasOwnProperty("_o"+p)){return this["_create"+p]()}return this.getPopup()};
sap.m.Select.prototype._isRequiredSelectElement=function(){if(this.getAutoAdjustWidth()){return false}else if(this.getWidth()==="auto"){return true}};
sap.m.Select.prototype._addActiveState=function(){this.addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Pressed")};
sap.m.Select.prototype._removeActiveState=function(){this.removeStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Pressed")};
sap.m.Select.prototype._findItemByFirstCharacter=function(c){for(var i=0,I=this.getItems();i<I.length;i++){if(I[i].getText().charAt(0).toUpperCase()===c.toUpperCase()){return I[i]}}};
sap.m.Select.prototype._createList=function(){this._oList=new sap.m.List({width:"100%",mode:sap.m.ListMode.SingleSelectMaster,rememberSelections:false}).attachBrowserEvent("tap",function(){this.close()},this);this._oList.attachSelectionChange(this._handleSelectionChangeEvent,this)};
sap.m.Select.prototype._initPopup=function(){var p=this.getPopup();this._setPopup(this._createPopupFactory(this._getPopupType()));if(p===this.getPopup()){return}this.getPopup().setHorizontalScrolling(false).addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Popup").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPopup,onAfterRendering:this.onAfterRenderingPopup},this)};
sap.m.Select.prototype.onBeforeOpen=function(){var p=this.getPopup(),P=this["_onBeforeOpen"+this._getPopupType()];this._addActiveState();p.addContent(this._oList);this.addContent();P&&P.call(this)};
sap.m.Select.prototype.onAfterOpen=function(){};
sap.m.Select.prototype.onBeforeClose=function(){};
sap.m.Select.prototype.onAfterClose=function(){this._removeActiveState()};
sap.m.Select.prototype._setPopup=function(p){this._oPopup=p};
sap.m.Select.prototype._setPopupType=function(p){this._sPopupType=p};
sap.m.Select.prototype._getPopupType=function(){return this._sPopupType};
sap.m.Select.prototype._createPopover=function(){this._oPopover=new sap.m.Popover({showHeader:false,placement:sap.m.PlacementType.Vertical,offsetX:0,offsetY:0,initialFocus:this,bounce:false});this._decoratePopover(this._oPopover);return this._oPopover};
sap.m.Select.prototype._decoratePopover=function(p){var s=this;p._removeArrow=function(){this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"]};p._setPosition=function(){this._myPositions=["begin bottom","begin center","begin top","end center"];this._atPositions=["begin top","end center","begin bottom","begin center"]};p._setArrowPosition=function(){};p._setMinWidth=function(w){this.getDomRef().style.minWidth=w};p._setWidth=function(w){var a=s.getAutoAdjustWidth(),i=s.getType()==="IconOnly",P;if(sap.ui.Device.system.desktop||sap.ui.Device.system.tablet){P=this.getContent()[0];if(a){P.setWidth("auto");P.getDomRef().style.minWidth=w}else{P.setWidth(w)}}if(!i){this.getDomRef().style.minWidth=w}};p.open=function(){return this.openBy(s)}};
sap.m.Select.prototype._onAfterRenderingPopover=function(){var p=this.getPopup(),w=(this._$Select.outerWidth()/parseFloat(sap.m.BaseFontSize))+"rem";p._removeArrow();p._setPosition();if(sap.ui.Device.system.phone){p._setMinWidth("100%")}else{p._setWidth(w)}if(!this._bHasParentBar&&!this._bHasParentList){p.addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"PopupStandalone")}};
sap.m.Select.prototype._createDialog=function(){this._oDialog=new sap.m.Dialog({stretchOnPhone:true,customHeader:new sap.m.Bar({contentLeft:new sap.m.Input({value:this.getSelectedItem().getText(),width:"100%",editable:false})})});this._oDialog.getAggregation("customHeader").attachBrowserEvent("tap",function(){this._oDialog.close()},this);return this._oDialog};
sap.m.Select.prototype._onBeforeOpenDialog=function(){var h=this.getPopup().getCustomHeader();h.getContentLeft()[0].setValue(this.getSelectedItem().getText())};
sap.m.Select.prototype.init=function(){this._createList()};
sap.m.Select.prototype.onBeforeRendering=function(){var i=this.getItems(),I=this.getSelectedItem(),k=this.getSelectedKey();this._synchronizeSelectedItemAndKey(I,k,i);this._clearList();this._fillList(i)};
sap.m.Select.prototype.onAfterRendering=function(){var p,P;this._cacheDomRefs();p=this._$Select.closest(".sapMBar-CTX");this._bHasParentBar=!!p.length;this._bHasParentList=!!this._$Select.closest(".sapMLIB-CTX").length;this._sParentCTX=sap.m.SelectRenderer.CSS_CLASS+"Popup"+(p.hasClass("sapMHeader-CTX")?"Header-CTX":"Footer-CTX");this._setPopupType(sap.ui.Device.system.phone&&!this._bHasParentBar?"Dialog":"Popover");P=this.getPopup();if(P&&P.getDomRef()){if(this.isOpen()){if(!this.hasContent()){this.close()}else{jQuery.sap.delayedCall(0,P,"rerender")}}}};
sap.m.Select.prototype.exit=function(){var p=this.getPopup();this._removeFocusableParentPopup(this._getParentPopup());this._$Select=null;this._$Label=null;if(this._oList){this._oList.destroy();this._oList=null}if(p){p.destroy();this._oPopover=null;this._oDialog=null;this._oPopup=null}};
sap.m.Select.prototype.ontouchstart=function(e){e.setMarked();this._addActiveState();if(!this.hasContent()||!this.getEnabled()){return}this._initPopup()};
sap.m.Select.prototype.ontouchend=function(e){e.setMarked();if(!this.getEnabled()){return}if(!this.isOpen()||!this.hasContent()){this._removeActiveState()}};
sap.m.Select.prototype.ontap=function(e){e.setMarked();var p=this.getPopup();if(!p||!this.getEnabled()){return}if(this.isOpen()){this.close();this._removeActiveState();return}if(this.hasContent()){this.open(true)}if(this.isOpen()){this._addActiveState()}};
sap.m.Select.prototype._handleSelectionChangeEvent=function(c){var l=c.getParameter("listItem"),n=this._findMappedItem(l);if(l.getType()==="Inactive"){return}this.close();if(!n){return}this._updateSelectedItem(n)};
sap.m.Select.prototype.onkeypress=function(e){e.setMarked();if(!this.getEnabled()){return}var i=this._findItemByFirstCharacter(String.fromCharCode(e.which));if(i){this._setSelectedItem({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._focusItem(i._oListItem)}};
sap.m.Select.prototype.onsapshow=function(e){e.setMarked();if(e.keyCode===jQuery.sap.KeyCodes.F4){e.preventDefault()}if(this.isOpen()){this.close();return}if(this.hasContent()){this.open(true)}};
sap.m.Select.prototype.onsaphide=sap.m.Select.prototype.onsapshow;
sap.m.Select.prototype.onsapescape=function(e){if(this.isOpen()){e.setMarked();this.close()}};
sap.m.Select.prototype.onsapenter=function(e){e.setMarked();this.close()};
sap.m.Select.prototype.onsapdown=function(e){e.setMarked();e.preventDefault();var i,I=this.indexOfItem(this.getSelectedItem());if(I===this.indexOfItem(this._findLastEnabledItem())){return}i=this._findFirstEnabledItem(this.getItems().splice(I+1));if(i){this._setSelectedItem({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._focusItem(i._oListItem)}};
sap.m.Select.prototype.onsapup=function(e){e.setMarked();e.preventDefault();var i,I=this.indexOfItem(this.getSelectedItem()),f=this._findFirstEnabledItem();if(I===this.indexOfItem(f)){return}i=this._findLastEnabledItem(this.getItems().splice(0,I));if(i){this._setSelectedItem({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._focusItem(this._getSelectedListItem())}};
sap.m.Select.prototype.onsaphome=function(e){e.setMarked();e.preventDefault();var i=this._findFirstEnabledItem();if(i){this._setSelectedItem({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._focusItem(this._getSelectedListItem())}};
sap.m.Select.prototype.onsapend=function(e){e.setMarked();e.preventDefault();var i=this._findLastEnabledItem(this.getItems());if(i){this._setSelectedItem({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._focusItem(this._getSelectedListItem())}};
sap.m.Select.prototype.onsappagedown=function(e){e.setMarked();e.preventDefault();this._setSelectedItemByIndex(this.indexOfItem(this.getSelectedItem())+20)};
sap.m.Select.prototype.onsappageup=function(e){e.setMarked();e.preventDefault();this._setSelectedItemByIndex(this.indexOfItem(this.getSelectedItem())-20)};
sap.m.Select.prototype.addContent=function(p){};
sap.m.Select.prototype.getPopup=function(){return this._oPopup||null};
sap.m.Select.prototype.hasContent=function(){return!!this.getItems().length};
sap.m.Select.prototype.onBeforeRenderingPopup=function(){var o=this["_onBeforeRendering"+this._getPopupType()];this._removeFocusableParentPopup(this._getParentPopup());o&&o.call(this)};
sap.m.Select.prototype.onAfterRenderingPopup=function(){var o=this["_onAfterRendering"+this._getPopupType()];this._addFocusableParentPopup(this._getParentPopup());o&&o.call(this)};
sap.m.Select.prototype.open=function(s){this.focus();this._initPopup();this.getPopup().open();return this};
sap.m.Select.prototype.setSelectedItem=function(i){if(typeof i==="string"){i=sap.ui.getCore().byId(i)}if(!(i instanceof sap.ui.core.Item)&&i!==null){jQuery.sap.log.warning('Warning: setSelectedItem() "vItem" has to be an instance of sap.ui.core.Item, a valid sap.ui.core.Item id, or null on',this);return this}if(!i){i=this._findFirstEnabledItem()}this._setSelectedItem({item:i||null,id:i?i.getId():"",key:i?i.getKey():"",suppressInvalidate:true});return this};
sap.m.Select.prototype.setSelectedItemId=function(i){var I=sap.ui.getCore().byId(i);if(!(I instanceof sap.ui.core.Item)&&i!==""&&i!==undefined){jQuery.sap.log.warning('Warning: setSelectedItemId() "sItem" has to be a string id of an sap.ui.core.Item instance, an empty string or undefined on',this);return this}if(!I){I=this._findFirstEnabledItem()}this._setSelectedItem({item:I||null,id:I?I.getId():"",key:I?I.getKey():"",suppressInvalidate:true});return this};
sap.m.Select.prototype.setSelectedKey=function(k){var k=this.validateProperty("selectedKey",k),i=this.getItemByKey(k);if(i||(k==="")){if(!i&&k===""){i=this._findFirstEnabledItem()}this._setSelectedItem({item:i||null,id:i?i.getId():"",key:i?i.getKey():"",suppressInvalidate:true});return this}return this.setProperty("selectedKey",k)};
sap.m.Select.prototype.getItemAt=function(i){return this.getItems()[+i]||null};
sap.m.Select.prototype.getSelectedItem=function(){var s=this.getAssociation("selectedItem");return(s===null)?null:sap.ui.getCore().byId(s)||null};
sap.m.Select.prototype.getFirstItem=function(){return this.getItems()[0]||null};
sap.m.Select.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null};
sap.m.Select.prototype.getItemByKey=function(k){for(var i=0,I=this.getItems();i<I.length;i++){if(I[i].getKey()===k){return I[i]}}return null};
sap.m.Select.prototype.removeItem=function(i){var I;i=this.removeAggregation("items",i);if(i&&i.getId()===this.getAssociation("selectedItem")){I=this._findFirstEnabledItem();if(I){this._setSelectedItem({item:I,id:I.getId(),key:I.getKey()})}}return i};
sap.m.Select.prototype.isOpen=function(){var p=this.getPopup();return!!(p&&p.isOpen())};
sap.m.Select.prototype.close=function(){var p=this.getPopup();p&&p.close();return this};
