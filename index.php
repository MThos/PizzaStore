<html>
<head>
<title>DevOps Pizza</title>
	<meta charset="utf-8">
	<meta name="description" content="DevOps Pizza">
	<meta name="author" content="Mykel Agathos">
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
	<link rel="icon" href="favicon.ico" type="image/x-icon"/>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inconsolata"/>
	<!--[if lte IE 9]>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
	<![endif]-->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
	<link rel="stylesheet" href="css/main.css"/>
	<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css" />
	<script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
	<!-- cookie policy -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
	<!--[if lte IE 9]>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<![endif]-->
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"             integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="           crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script src="js/ajax.js"></script> 
	<!-- cookie policy -->
	<script>
		window.addEventListener("load", function(){
			window.cookieconsent.initialise({
				"palette": {
					"popup": {
						"background": "#f24c27"
					},
					"button": {
						"background": "transparent",
						"text": "#000000",
						"border": "#000000"
					}
				},
				"content": {
					"message": "Greetings, Pizza Lover! This website uses cookies to ensure you get the best experience.",
					"dismiss": "GOT IT!",
					"link": "Our Policy",
					"href": "www.devopspizza.com/cookies"
				}
			});
		});
	</script>
</head>
<body>
	<!-- wrapper -->
	<div id="wrapper">

		<!-- header -->
		<header class="jumbotron">
			<div class="text-center">
				<img id="pizza-logo" src="images/pizza-logo.png" />
			</div>
		</header>

		<!-- main content -->
		<div id="main-content">
			<h3>Welcome To DevOps Pizzaria</h3>
			<br>
			<h4>Click begin order below to start creating your masterpiece!</h4>
			<br><br>
			<button type="button" class="btn btn-dark" onclick="startOrderProcess();">BEGIN ORDER</button>
		</div>

		<!-- footer -->
		<footer class="footer text-center">
			Copyright &copy; <?php echo date("Y") ?> | DEVOPSPIZZA.COM | All Rights Reserved |
			<a href="#">Privacy Policy</a> |
			<a href="#">Contact</a>
		</footer>
	</div>

	<script>
		function startOrderProcess() {
			document.getElementById("main-content").innerHTML = "<h3>Begin Order</h3><br>" +
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
			"<br>";
		}
	</script>
</body>
</html>
