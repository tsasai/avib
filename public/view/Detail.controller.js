jQuery.sap.require("sap.ui.demo.avib.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.ui.demo.avib.view.Detail", {

	handleSearch : function(evt) {
		// create model filter
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter);
		}
		
		//update list binding
		var list = this.getView().byId("listMaterials");
		var binding = list.getBinding("items");
		binding.filter(filters);
	},
	
	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	
	handleApprove : function (evt) {
		// show confirmation dialog
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
				bundle.getText("ApproveDialogMsg"),
				function (oAction) {
					if (sap.m.MessageBox.Action.OK === oAction) {
						// notify user
						var successMsg = bundle.getText("ApproveDialogSuccessMsg");
						sap.m.MessageToast.show(successMsg);
						// TODO call proper service method and update model
					}
				},
		
				bundle.getText("ApproveDialogTitle")
		);
	},
	
	handleLineItemPress: function(evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Subclass", context);
	},
	
	handleListSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		this.nav.to("Detail", context);
	},
	
	onBeforeRendering : function() {
		//this.byId("SupplierForm").bindElement("BusinessPartner");
	}
});