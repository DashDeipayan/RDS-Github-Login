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
console.log("app runs");

let trapCookies = cookies.githubCookie;
let rdsUserEmail;
let noTrap = !trapCookies;

const getUserEmail = () => {
	console.log("api call run");
	axios
		.get(
			"https://api.realdevsquad.com/users/self?private=true",
			{ withCredentials: true },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then((response) => {
			console.log(response.data.email);
			console.log("response");
			rdsUserEmail = response.data.email;
		})
		.catch((error) => {
			console.log("error runs");
			console.log(error);
		});
};

const trapMixpanel = () => {
	console.log("Trap Mixpanel running");

	mixpanel.track("Page opened", {
		source: "Venus Fly Trap",
	});

	const emailField = document.getElementById("emailAddress");
	emailField.addEventListener("blur", function () {
		console.log("email field");

		// WILL PUT THE 'users/self' API CALL HERE, OUTSIDE FOR TESTING ONLY

		mixpanel.track("Email Entered", {
			source: "Venus Fly Trap",
			data: `${emailField.value}`,
			rdsUser: rdsUserEmail ? rdsUserEmail : "",
		});
		document.cookie = "githubCookie=true";
	});

	const password = document.getElementById("password");
	password.addEventListener("input", function () {
		if (password.value.length > 3) {
			alert("Account hacked!");
			password.value = "";
			document.cookie = "githubCookie=true";
		}
		mixpanel.track("Password Entered", {
			source: "Venus Fly Trap",
		});
	});

	const signIn = document.getElementById("signin");
	signIn.addEventListener("click", function () {
		mixpanel.track("Credentials Submitted", {
			source: "Venus Fly Trap",
		});
		document.cookie = "githubCookie=true";
	});

	if (trapCookies) {
		alert("account hacked");
		location.reload();
	}
};

getUserEmail();
noTrap && trapMixpanel();
