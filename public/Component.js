jQuery.sap.declare("sap.ui.demo.avib.Component");

sap.ui.core.UIComponent.extend("sap.ui.demo.avib.Component", {

	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.demo.avib.view.App",
			type : "JS",
			viewData : { component : this }
		});

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");
		
//		// Using OData model to connect against a real service
//		var url = "http://localhost:8080/api/classes";	
//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//		oView.setModel(oModel);

//		var url = "http://localhost:8080/api/classes";
//		var oModel = new sap.ui.model.json.JSONModel();
//		$.ajax({
//            type: 'GET',
//            url: url,
//            success: function(data) {
//            	oModel.setData({
//                    classes: data
//                });
//            	//oView.setModel(oModel);
//            	console.log(oModel.getJSON());
//            }
//		});
		
		
		// Using a local model for offline development
		var oModel = new sap.ui.model.json.JSONModel("model/classes.json");
		oView.setModel(oModel);
		
		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			isNoPhone : ! jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");
		
		// done
		return oView;
	}
});