function setCookie(key, value, durationInDays) {
	document.cookie =
		`${key}=${value}; ` +
		(durationInDays ? `expires=${expiryFromDurationInDays(durationInDays)}; ` : "") +
		"path=/; samesite=Lax; secure";
}

function getCookie(key) {
	return document.cookie
		.split(";")
		.find((row) => row.trim().startsWith(`${key}=`))
		?.split("=")[1];
}

function isCookieSet(key) {
	return document.cookie.split(";").some((cookie) => cookie.trim().startsWith(key));
}

function expiryFromDurationInDays(days) {
	let expires = new Date();
	expires.setDate(expires.getDate() + days);
	return expires;
}

