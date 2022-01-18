mixpanel.init("8e82b3154167f8618fa624fa47485ec2");

mixpanel.track("Page opened", {
	source: "Venus Fly Trap",
});

const emailField = document.getElementById("emailAddress");
emailField.addEventListener("blur", function () {
	mixpanel.track("Email Entered", {
		source: "Venus Fly Trap",
	});
});

const password = document.getElementById("password");
password.addEventListener("blur", function () {
	mixpanel.track("Password Entered", {
		source: "Venus Fly Trap",
	});
});

const signin = document.getElementById("signin");
signin.addEventListener("click", function () {
	mixpanel.track("Credentials Submitted", {
		source: "Venus Fly Trap",
	});
});
