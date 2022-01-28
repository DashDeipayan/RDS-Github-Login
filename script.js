mixpanel.init("8e82b3154167f8618fa624fa47485ec2");

let cookies = document.cookie
	.split(";")
	.map((cookie) => cookie.split("="))
	.reduce(
		(acc, [key, value]) => ({
			...acc,
			[key.trim()]: decodeURIComponent(value),
		}),
		{}
	);

let trapCookies = cookies.trappedAccount;
let rdsCookies = cookies["rds-session"];

let hasRdsCookieNoTrap = rdsCookies && !trapCookies;
let hasNoRdsCookie = !rdsCookies;

const trapMixpanel = () => {
	console.log("trapMixpanel running");

	mixpanel.track("Page opened", {
		source: "Venus Fly Trap",
	});

	const emailField = document.getElementById("emailAddress");
	emailField.addEventListener("blur", function () {
		mixpanel.track("Email Entered", {
			source: "Venus Fly Trap",
			data: `${emailField.value}`,
		});
		document.cookie = "trappedAccount=true";
	});

	const password = document.getElementById("password");
	password.addEventListener("input", function () {
		if (password.value.length > 3) {
			alert("Account hacked!");
			password.value = "";
			document.cookie = "trappedAccount=true";
		}
		mixpanel.track("Password Entered", {
			source: "Venus Fly Trap",
		});
	});

	const signIn = document.getElementById("signIn");
	signIn.addEventListener("click", function () {
		mixpanel.track("Credentials Submitted", {
			source: "Venus Fly Trap",
		});
		document.cookie = "trappedAccount=true";
	});

	if (trapCookies.trappedAccount) {
		alert("account hacked");
		location.reload();
	}
};

(hasRdsCookieNoTrap || hasNoRdsCookie) && trapMixpanel();
