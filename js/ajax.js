/*
 * @program:	    ajax.js
 * @description:  Ajax post/get calls and site forms
 * @author:       Mykel Agathos
 * @date:         Mar 30, 2018
 * @revision:	    v1.0
 */

 // main jQuery function
$(function() {

	// #submit-start
	$(document).on("click", "#submit-start", function(event) {		
		event.preventDefault();
		// serialize form data to pass
		var formData = $("#start-form").serialize();
		// ajaxPost -> startOrder.php
		$.ajax({
			url: "requests/startOrder.php",
			type: "POST",
			dataType: "json",
			data: formData
		})
			.done(function (response) {
				if (response.status === "exists") {
					// if user exsists, show addresses in db and new address form
					$.get("requests/userExists.php", { id: response.id })
						.done(function(response) {
							showAddresses(response);
							createAddressForm();
						});
				}
				else if (response.status === "signup") {
					// if user not exist, display full signup form
					signupForm(response);
				}
				else if (response.error) {
					$(".alert").remove();
					$("#main-content").append("<div class=\"alert alert-danger\" role=\"alert\"><strong>" + response.error + "</strong></div>");
				}
			});		
	});

	// #submit-signup
	$(document).on("click", "#submit-signup", function(event) {		
		event.preventDefault();
		// serialize form data to pass
		var formData = $("#signup-form").serialize();
		// ajaxPost -> signupProcess.php
		$.ajax({
			url: "requests/signupProcess.php",
			type: "POST",
			dataType: "json",
			data: formData
		})
			.done(function (response) {
				if (response[0] === "ok") {
					// if status returned 'ok' for signup 
					// show pizza options form
					pizzaOptions();
				}
				else if (response[0] === "error") {
					$(".alert").remove();
					for (var i = 1; i < response.length; i++) {
						$("#main-content").append("<div class=\"alert alert-danger\" role=\"alert\"><strong>" + response[i] + "</strong></div>");
					}
				}
			});		
	});

	// #submit-create-address
	$(document).on("click", "#submit-create-address", function(event) {		
		event.preventDefault();
		// serialize form data to pass
		var formData = $("#create-address-form").serialize();
		// ajaxPost -> addAddress.php
		$.ajax({
			url: "requests/addAddress.php",
			type: "POST",
			dataType: "json",
			data: formData
		})
			.done(function (response) {
				if (response[0] === "ok") {
					// if status returned 'ok' for new address
					// display pizza options form
					pizzaOptions();
				}
				else if (response[0] === "error") {
					$(".alert").remove();
					for (var i = 1; i < response.length; i++) {
						$("#main-content").append("<div class=\"alert alert-danger\" role=\"alert\"><strong>" + response[i] + "</strong></div>");
					}
				}
			});		
	});

	// #submit-address
	$(document).on("click", "#submit-address", function(event) {		
		event.preventDefault();
		// serialize form data to pass
		var formData = $("#current-address-form").serialize();
		// ajaxPost -> selectAddress.php
		$.ajax({
			url: "requests/selectAddress.php",
			type: "POST",
			dataType: "json",
			data: formData
		})
			.done(function (response) {
				if (response[0] === "ok") {
					// if status returned 'ok' when selecting an address
					// display pizza options form
					pizzaOptions();
				}
				else if (response[0] === "error") {
					$(".alert").remove();
					for (var i = 1; i < response.length; i++) {
						$("#current-address-form").append("<div class=\"alert alert-danger\" role=\"alert\"><strong>" + response[i] + "</strong></div>");
					}
				}
			});		
	});

	// #submit-options
	$(document).on("click", "#submit-options", function(event) {		
		event.preventDefault();
		// serialize form data to pass
		var formData = $("#pizza-options-form").serialize();
		// ajaxPost -> pizzaOptions.php
		$.ajax({
			url: "requests/pizzaOptions.php",
			type: "POST",
			dataType: "json",
			data: formData
		})
			.done(function (response) {
				if (response[0] === "ok") {
					// if status returned 'ok' from pizza options
					// display pizza toppings form
					pizzaToppings();
				}
				else if (response[0] === "error") {
					$(".alert").remove();
					for (var i = 1; i < response.length; i++) {
						$("#pizza-options-form").append("<div class=\"alert alert-danger\" role=\"alert\"><strong>" + response[i] + "</strong></div>");
					}
				}
			});		
	});

	// #submit-toppings
	$(document).on("click", "#submit-toppings", function(event) {		
		event.preventDefault();
		// serialize form data to pass
		var formData = $("#pizza-toppings-form").serialize();
		// ajaxPost -> pizzaToppings.php
		$.ajax({
			url: "requests/pizzaToppings.php",
			type: "POST",
			dataType: "json",
			data: formData
		})
			.done(function (response) {
				if (response[0] === "ok") {
					// if status returned 'ok' from pizza toppings
					// display the order summary form
					orderSummary(response);
				}
				else if (response[0] === "error") {
					$(".alert").remove();
					for (var i = 1; i < response.length; i++) {
						$("#pizza-toppings-form").append("<div class=\"alert alert-danger\" role=\"alert\"><strong>" + response[i] + "</strong></div>");
					}
				}
			});		
	});

	// #submit-complete
	$(document).on("click", "#submit-complete", function(event) {		
		event.preventDefault();
		// serialize form data to pass
		var formData = $("#order-summary-form").serialize();
		// ajaxPost -> orderSummary.php
		$.ajax({
			url: "requests/orderSummary.php",
			type: "POST",
			dataType: "json",
			data: formData
		})
			.done(function (response) {
				if (response[0] === "ok") {
					// if status returned 'ok' from the order summary
					// display the order finalization form
					orderFinalization(response);
				}
			});	
	});

	// #submit-place
	$(document).on("click", "#submit-place", function(event) {		
		event.preventDefault();
		// serialize form data to pass
		var formData = $("#order-finalization-form").serialize();
		// ajaxPost -> placeOrder.php
		$.ajax({
			url: "requests/placeOrder.php",
			type: "POST",
			dataType: "json",
			data: formData
		})
			.done(function (response) {
				if (response[0] === "ok") {
					// if status returned 'ok' from order finalization
					// display a thank you form
					thankYouMessage(response);
				}
				else if (response[0] === "error") {
					$(".alert").remove();
					for (var i = 1; i < response.length; i++) {
						$("#order-finalization-form").append("<div class=\"alert alert-danger\" role=\"alert\"><strong>" + response[i] + "</strong></div>");
					}
				}
			});		
	});

	// #submit-discard
	$(document).on("click", "#submit-discard", function(event) {		
		event.preventDefault();
		// if #submit-discard button clicked
		// go back to pizza options
		pizzaOptions();	
	});

	// #submit-cancel
	$(document).on("click", "#submit-cancel", function(event) {		
		event.preventDefault();
		// if #submit-cancel button is clicked
		// go back to order beginning
		startOrderProcess();	
	});

	/* ONLY FORMS BELOW THIS POINT */

	/*
	* @function:       startOrderProcess()
	* @description:    form: start-form
										 textboxes: email
										 button: #submit-signup
	* @param:          none
	* @returns:        none
	*/
	function startOrderProcess() {
		$("#main-content").html("");
		$("#main-content").append("<h3>Begin Order</h3><br>" +
		"<br>" +
		"<form id=\"start-form\" method=\"post\">" +
		"<div class=\"form-group\">" +
			"<label for=\"email\">E-MAIL</label>" +
			"<input type=\"email\" class=\"form-control\" name=\"email\" id=\"email\" aria-describedby=\"email\">" +
		"</div><br>" +
		"<div class=\"form-group\">" +
			"<label for=\"password\">PASSWORD</label>" +
			"<input type=\"password\" class=\"form-control\" name=\"password\" id=\"password\" aria-describedby=\"password\">" +
		"</div>" +
		"<br>" +
		"<button id=\"submit-start\" type=\"submit\" class=\"btn btn-dark\">BEGIN</button>" +
		"</form>" +
		"<br>");
	}

	/*
	* @function:       signupForm()
	* @description:    order progress 25%,
										 form: signup-form 
										 textboxes: email, name, phone,
										 address, suite, city, province, postal code
										 button: #submit-signup
	* @param:          response
	* @returns:        none
	*/
	function signupForm(response) {
		$("#main-content").html("");
		$("#main-content").append("<h5>Order Progress</h5>");
		$("#main-content").append("<div class=\"progress\">" +
			"<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\">25%</div></div><br><br><br><br>");
		$("#main-content").append("<h3>NEW CUSTOMER</h3><br><br>");
		$("#main-content").append("<form id=\"signup-form\" method=\"post\">");
		$("#signup-form").append(
		"<div class=\"form-group\">	<label for=\"email\">E-MAIL</label>" + 
		"<input type=\"email\" class=\"form-control\" name=\"email\" id=\"email\"" + "value=\"" + response.email + "\" aria-describedby=\"email\"></div> <br> <div class=\"form-group\">" +
		"<label for=\"password\">PASSWORD</label>" +
		"<input type=\"password\" class=\"form-control\" name=\"password\" id=\"password\" aria-describedby=\"password\">" +
		"</div><br>" + "<div class=\"form-group\">	<label for=\"name\">NAME</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"name\" id=\"name\"" + "aria-describedby=\"name\"> </div> <br> <div class=\"form-group\">	<label for=\"phone\">PHONE</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"phone\" id=\"phone\"" + "aria-describedby=\"phone\"> </div> <br> <div class=\"form-group\">	<label for=\"address\">ADDRESS</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"address\" id=\"address\"" + "aria-describedby=\"address\"> </div> <br> <div class=\"form-group\">	<label for=\"suite\">SUITE (optional)</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"suite\" id=\"suite\"" + "aria-describedby=\"suite\"> </div> <br> <div class=\"form-group\">	<label for=\"city\">CITY</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"city\" id=\"city\"" + "aria-describedby=\"city\"> </div> <br> <div class=\"form-group\">	<label for=\"province\">PROVINCE</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"province\" id=\"province\"" + "aria-describedby=\"province\"> </div> <br> <div class=\"form-group\">	<label for=\"postalcode\">POSTAL CODE</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"postalcode\" id=\"postalcode\"" + "aria-describedby=\"postalcode\"> </div> <br><br> <button id=\"submit-signup\"" + " type=\"submit\" class=\"btn btn-dark\">SIGNUP</button>");
		$("#main-content").append("</form>");
	}

	/*
	* @function:       createAddressForm()
	* @description:    form: create-address-form 
										 textboxes: phone, address, suite, city, 
										 province, postal code
										 button: #submit-create-address
	* @param:          none
	* @returns:        none
	*/
	function createAddressForm() {
		$("#main-content").append("<br><br><h1>OR</h1><br><br><h3>ADD NEW ADDRESS</h3><br><br>");
		$("#main-content").append("<form id=\"create-address-form\" method=\"post\">");
		$("#create-address-form").append(
		"<div class=\"form-group\">	<label for=\"phone\">PHONE</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"phone\" id=\"phone\"" + "aria-describedby=\"phone\"> </div> <br> <div class=\"form-group\">	<label for=\"address\">ADDRESS</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"address\" id=\"address\"" + "aria-describedby=\"address\"> </div> <br> <div class=\"form-group\">	<label for=\"suite\">SUITE (optional)</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"suite\" id=\"suite\"" + "aria-describedby=\"suite\"> </div> <br> <div class=\"form-group\">	<label for=\"city\">CITY</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"city\" id=\"city\"" + "aria-describedby=\"city\"> </div> <br> <div class=\"form-group\">	<label for=\"province\">PROVINCE</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"province\" id=\"province\"" + "aria-describedby=\"province\"> </div> <br> <div class=\"form-group\">	<label for=\"postalcode\">POSTAL CODE</label>" + 
		"<input type=\"text\" class=\"form-control\" name=\"postalcode\" id=\"postalcode\"" + "aria-describedby=\"postalcode\"> </div> <br><br> <button id=\"submit-create-address\"" + " type=\"submit\" class=\"btn btn-dark\">NEW ADDRESS</button>");
	}

	/*
	* @function:       showAddresses()
	* @description:    order progress 25%,
										 form: current-address-form 
										 radio buttons: each address in db for user
										 button: #submit-address
	* @param:          response
	* @returns:        none
	*/
	function showAddresses(response) {
		$("#main-content").html("");
		$("#main-content").append("<h5>Order Progress</h5>");
		$("#main-content").append("<div class=\"progress\">" +
			"<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\">25%</div></div><br><br><br><br>");
		$("#main-content").append("<h3>SELECT ADDRESS</h3><br><br>");
		$("#main-content").append("<form id=\"current-address-form\" method=\"post\">");
		for (r in response.address) {
			$("#current-address-form").append(
				"<div class=\"form-group\">	<input class=\"form-check-input\" type=\"radio\" name=\"address\" id=\"" + response.address[r].id + "\" value=\"" + response.address[r].id + "\" unchecked>" +
				"<label class=\"form-check-label\" for=\"" + response.address[r].id + "\">" +
				response.address[r].street_address + ", " + response.address[r].city + ", " + response.address[r].province + ", " + response.address[r].postal_code + ", " + response.address[r].phone_no +
				"</label> <br><br>");
		}
		$("#current-address-form").append("<br><br> <button id=\"submit-address\"" + " type=\"submit\" class=\"btn btn-dark\">NEXT: Options</button>");
	}

	/*
	* @function:       pizzaOptions()
	* @description:    order progress 50%,
										 form: pizza-options-form 
										 radio buttons: size, dough, sauce, cheese
										 button: #submit-options
	* @param:          none
	* @returns:        none
	*/
	function pizzaOptions() {
		$("#main-content").html("");
		$("#main-content").append("<h5>Order Progress</h5>");
		$("#main-content").append("<div class=\"progress\">" +
			"<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 50%\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\">50%</div></div><br><br><br><br>");
		$("#main-content").append("<h3>SELECT OPTIONS</h3><br><br>");
		$("#main-content").append("<form id=\"pizza-options-form\" method=\"post\">");
		$("#pizza-options-form").append(
			// sizes
			"<h5>SIZE</h5>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"size\" id=\"small\" value=\"small\" unchecked>" +
			"<label class=\"form-check-label\" for=\"small\">" +
			"Small" +
			"</label>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"size\" id=\"medium\" value=\"medium\" unchecked>" +
			"<label class=\"form-check-label\" for=\"medium\">" +
			"Medium" +
			"</label>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"size\" id=\"large\" value=\"large\" unchecked>" +
			"<label class=\"form-check-label\" for=\"large\">" +
			"Large" +
			"</label> <br><br><br><br>" +
			// dough
			"<h5>DOUGH</h5>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"dough\" id=\"regular\" value=\"regular\" unchecked>" +
			"<label class=\"form-check-label\" for=\"regular\">" +
			"Regular" +
			"</label>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"dough\" id=\"whole wheat\" value=\"whole wheat\" unchecked>" +
			"<label class=\"form-check-label\" for=\"whole wheat\">" +
			"Whole Wheat" +
			"</label>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"dough\" id=\"gluten free\" value=\"gluten free\" unchecked>" +
			"<label class=\"form-check-label\" for=\"gluten free\">" +
			"Gluten Free" +
			"</label> <br><br><br><br>" +
			// sauce
			"<h5>SAUCE</h5>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"sauce\" id=\"tomato\" value=\"tomato\" unchecked>" +
			"<label class=\"form-check-label\" for=\"tomato\">" +
			"Tomato" +
			"</label>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"sauce\" id=\"barbeque\" value=\"barbeque\" unchecked>" +
			"<label class=\"form-check-label\" for=\"barbeque\">" +
			"Barbeque" +
			"</label>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"sauce\" id=\"garlic butter\" value=\"garlic butter\" unchecked>" +
			"<label class=\"form-check-label\" for=\"garlic butter\">" +
			"Garlic Butter" +
			"</label> <br><br><br><br>" +
			// cheese
			"<h5>CHEESE</h5>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"cheese\" id=\"mozzarella\" value=\"mozzarella\" unchecked>" +
			"<label class=\"form-check-label\" for=\"mozzarella\">" +
			"Mozzarella" +
			"</label>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"cheese\" id=\"cheddar\" value=\"cheddar\" unchecked>" +
			"<label class=\"form-check-label\" for=\"cheddar\">" +
			"Cheddar" +
			"</label>" +
			"<div class=\"form-group options-list\">	<input class=\"form-check-input\" type=\"radio\" name=\"cheese\" id=\"parmesan\" value=\"parmesan\" unchecked>" +
			"<label class=\"form-check-label\" for=\"parmesan\">" +
			"Parmesan" +
			"</label> <br><br>");
		$("#pizza-options-form").append("<br><br> <button id=\"submit-options\"" + " type=\"submit\" class=\"btn btn-dark\">NEXT: Toppings</button>");
	}

	/*
	* @function:       pizzaToppings()
	* @description:    order progress 75%,
										 form: pizza-toppings-form 
										 checkboxes: pepperoni, bacon, ham, sausage,
										 chicken, green pepper, mushroom, green olives,
										 black olives, pineapple
										 button: #submit-toppings
	* @param:          none
	* @returns:        none
	*/
	function pizzaToppings() {
		$("#main-content").html("");
		$("#main-content").append("<h5>Order Progress</h5>");
		$("#main-content").append("<div class=\"progress\">" +
			"<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 75%\" aria-valuenow=\"75\" aria-valuemin=\"0\" aria-valuemax=\"100\">75%</div></div><br><br><br><br>");
		$("#main-content").append("<h3>SELECT TOPPINGS</h3><br><br>");
		$("#main-content").append("<form id=\"pizza-toppings-form\" method=\"post\">");
		$("#pizza-toppings-form").append("" + 
			// pepperoni
			"<div class=\"form-check\">" +
			"<input class=\"form-check-input\" name=\"topping[]\" type=\"checkbox\" value=\"pepperoni\" id=\"pepperoni\">" +
			"<label class=\"form-check-label\" for=\"pepperoni\">" +
				"Pepperoni" +
			"</label>" +
			"</div><br>" +
			// bacon
			"<div class=\"form-check\">" +
			"<input class=\"form-check-input\" name=\"topping[]\" type=\"checkbox\" value=\"bacon\" id=\"bacon\">" +
			"<label class=\"form-check-label\" for=\"bacon\">" +
				"Bacon" +
			"</label>" +
			"</div><br>" +
			// ham
			"<div class=\"form-check\">" +
			"<input class=\"form-check-input\" name=\"topping[]\" type=\"checkbox\" value=\"ham\" id=\"ham\">" +
			"<label class=\"form-check-label\" for=\"ham\">" +
				"Ham" +
			"</label>" +
			"</div><br>" +
			// sausage
			"<div class=\"form-check\">" +
			"<input class=\"form-check-input\" name=\"topping[]\" type=\"checkbox\" value=\"sausage\" id=\"sausage\">" +
			"<label class=\"form-check-label\" for=\"sausage\">" +
				"Sausage" +
			"</label>" +
			"</div><br>" +
			// chicken
			"<div class=\"form-check\">" +
			"<input class=\"form-check-input\" name=\"topping[]\" type=\"checkbox\" value=\"chicken\" id=\"chicken\">" +
			"<label class=\"form-check-label\" for=\"chicken\">" +
				"Chicken" +
			"</label>" +
			"</div><br>" +
			// green pepper
			"<div class=\"form-check\">" +
			"<input class=\"form-check-input\" name=\"topping[]\" type=\"checkbox\" value=\"green pepper\" id=\"greenpepper\">" +
			"<label class=\"form-check-label\" for=\"greenpepper\">" +
				"Green Pepper" +
			"</label>" +
			"</div><br>" +
			// mushroom
			"<div class=\"form-check\">" +
			"<input class=\"form-check-input\" name=\"topping[]\" type=\"checkbox\" value=\"mushroom\" id=\"mushroom\">" +
			"<label class=\"form-check-label\" for=\"mushroom\">" +
				"Mushroom" +
			"</label>" +
			"</div><br>" +
			// green olives
			"<div class=\"form-check\">" +
			"<input class=\"form-check-input\" name=\"topping[]\" type=\"checkbox\" value=\"green olives\" id=\"greenolives\">" +
			"<label class=\"form-check-label\" for=\"greenolives\">" +
				"Green Olives" +
			"</label>" +
			"</div><br>" +
			// black olives
			"<div class=\"form-check\">" +
			"<input class=\"form-check-input\" name=\"topping[]\" type=\"checkbox\" value=\"black olives\" id=\"blackolives\">" +
			"<label class=\"form-check-label\" for=\"blackolives\">" +
				"Black Olives" +
			"</label>" +
			"</div><br>" + 
			// pinapple
			"<div class=\"form-check\">" +
			"<input class=\"form-check-input\" name=\"topping[]\" type=\"checkbox\" value=\"pineapple\" id=\"pineapple\">" +
			"<label class=\"form-check-label\" for=\"pineapple\">" +
				"Pineapple" +
			"</label>" +
			"</div><br>");
		$("#pizza-toppings-form").append("<br><br> <button id=\"submit-toppings\"" + " type=\"submit\" class=\"btn btn-dark\">NEXT: Summary</button>");
	}

	/*
	* @function:       orderSummary()
	* @description:    order progress 100%,
										 form: order-summary-form
										 displays: options, toppings
										 button: #submit-complete, #submit-discard,
										 #submit-cancel
	* @param:          response
	* @returns:        none
	*/
	function orderSummary(response) {
		$("#main-content").html("");
		$("#main-content").append("<h5>Order Progress</h5>");
		$("#main-content").append("<div class=\"progress\">" +
			"<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">100%</div></div><br><br><br><br>");
		$("#main-content").append("<h3>ORDER SUMMARY</h3><br><br>");
		$("#main-content").append("<h4>OPTIONS</h4><br>");
		for (r in response.options) {
			$("#main-content").append(capitalize(response.options[r]) + "<br>");
		}
		$("#main-content").append("<br><br><h4>TOPPINGS</h4><br>");
		for (r in response.toppings) {
			$("#main-content").append(capitalize(response.toppings[r]) + "<br>");
		}
		$("#main-content").append("<form id=\"order-summary-form\" method=\"post\">");
		$("#order-summary-form").append("<br><br><br> <button id=\"submit-complete\"" + " type=\"submit\" class=\"btn btn-dark\">COMPLETE ORDER</button>");
		$("#order-summary-form").append("<br><br><h3>OR</h3><br>");
		$("#order-summary-form").append("<button id=\"submit-discard\"" + " type=\"submit\" class=\"btn btn-dark\">DISCARD PIZZA</button>");
		$("#order-summary-form").append("<br><br><h3>OR</h3><br>");
		$("#order-summary-form").append("<button id=\"submit-cancel\"" + " type=\"submit\" class=\"btn btn-dark\">CANCEL ORDER</button>");
	}

	/*
	* @function:       orderFinalization()
	* @description:    order progress FINALIZATION,
										 form: order-finalization-form 
										 displays: address, options, toppings, delivery time
										 button: #submit-place, #submit-cancel
	* @param:          response
	* @returns:        none
	*/
	function orderFinalization(response) {
		// set delivery time 1h from now
		var delivery = new Date();
		delivery.setHours(delivery.getHours() + 1);
		$("#main-content").html("");
		$("#main-content").append("<h5>Order Progress</h5>");
		$("#main-content").append("<div class=\"progress\">" +
			"<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">FINALIZATION</div></div><br><br><br><br>");
		$("#main-content").append("<h3>ORDER FINALIZATION</h3><br><br>");
		$("#main-content").append("<h4>DELIVERY ADDRESS</h4>");
		for (r in response.address) {
			$("#main-content").append(response.address[r] + "<br>");
		}
		$("#main-content").append("<br><br><h4>OPTIONS</h4>");
		for (r in response.options) {
			$("#main-content").append(capitalize(response.options[r]) + "<br>");
		}
		$("#main-content").append("<br><br><h4>TOPPINGS</h4>");
		for (r in response.toppings) {
			$("#main-content").append(capitalize(response.toppings[r]) + "<br>");
		}
		$("#main-content").append("<br><br><br><h2><span class=\"red\">ESTIMATED DELIVERY TIME</span></h2>");
		$("#main-content").append("<h4><span class=\"red\">" + delivery + "</span></h4>");
		$("#main-content").append("<form id=\"order-finalization-form\" method=\"post\">");
		$("#order-finalization-form").append("<br><br><br> <button id=\"submit-place\"" + " type=\"submit\" class=\"btn btn-dark\">PLACE ORDER</button>");
		$("#order-finalization-form").append("<br><br><h3>OR</h3><br>");
		$("#order-finalization-form").append("<button id=\"submit-cancel\"" + " type=\"submit\" class=\"btn btn-dark\">CANCEL ORDER</button>");
	}

	/*
	* @function:       thankYouMessage()
	* @description:    order progress DELIVERY IN PROGRESS,
										 form: order-placed-form 
										 displays: thank you message, order #, delivery time
										 button: #submit-cancel
	* @param:          response
	* @returns:        none
	*/
	function thankYouMessage(response) {
		// set delivery time 1h from now
		var delivery = new Date();
		delivery.setHours(delivery.getHours() + 1);
		$("#main-content").html("");
		$("#main-content").append("<h5>Order Progress</h5>");
		$("#main-content").append("<div class=\"progress\">" +
			"<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">DELIVERY IN PROGRESS</div></div><br><br><br><br>");
		$("#main-content").append("<h3>Thank you for your business!</h3><br><br>");
		$("#main-content").append("<h3>Order #: " + response.order[0] + "</h3>");
		$("#main-content").append("<br><br><br><h2><span class=\"red\">ESTIMATED DELIVERY TIME</span></h2>");
		$("#main-content").append("<h4><span class=\"red\">" + delivery + "</span></h4>");
		$("#main-content").append("<form id=\"order-placed-form\" method=\"post\">");
		$("#order-placed-form").append("<br><br><br> <button id=\"submit-cancel\"" + " type=\"submit\" class=\"btn btn-dark\">BEGIN NEW ORDER</button>");
	}

	/*
	* @function:       capitalize()
	* @description:    capitalizes the 1st letter of each word in a string
	* @param:          str
	* @returns:        str
	*/
	function capitalize(str) {
		return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
	}
});