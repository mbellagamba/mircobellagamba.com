const ACCEPTS_COOKIES_KEY = "web-accepts-cookies";
const GOOGLE_TAG_ID = "G-W2E9LR5DLD";
const COOKIES_EXPIRY_IN_DAYS = 30;

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

function appendScript({ src, content, async }) {
	const script = document.createElement("script");
	if (src) script.src = src;
	if (content) script.innerHTML = content;
	script.async = async;
	document.body.appendChild(script);
}

function addAnalytics() {
	appendScript({
		src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`,
		async: true,
	});
	appendScript({
		content: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');`,
	});
}

function hideCookiesAlert() {
	const cookiesAlert = document.querySelector(".cookies");
	cookiesAlert.classList.add("cookies--hidden");
}

function showCookiesAlert() {
	const cookiesAlert = document.querySelector(".cookies");
	cookiesAlert.classList.remove("cookies--hidden");
}

function askPermissionForAnalytics() {
	if (!isCookiesPermissionAsked()) {
		showCookiesAlert();
	} else if (isCookiesAccepted()) {
		addAnalytics();
	}
}

function isCookiesPermissionAsked() {
	return isCookieSet(ACCEPTS_COOKIES_KEY);
}

function isCookiesAccepted() {
	return getCookie(ACCEPTS_COOKIES_KEY) === "1";
}

function setCookiesPreferences(value) {
	setCookie(ACCEPTS_COOKIES_KEY, value, COOKIES_EXPIRY_IN_DAYS);
}

function acceptsCookies() {
	setCookiesPreferences("1");
	addAnalytics();
	hideCookiesAlert();
}

function denyCookies() {
	setCookiesPreferences("0");
	hideCookiesAlert();
}

function enableCookiesClickListeners() {
	const acceptsButton = document.getElementById("cookies-accept-button");
	const denyButton = document.getElementById("cookies-deny-button");

	acceptsButton.addEventListener("click", acceptsCookies);
	denyButton.addEventListener("click", denyCookies);
}

const registerServiceWorker = async () => {
	if ("serviceWorker" in navigator) {
		try {
			const registration = await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			});
			if (registration.installing) {
				console.log("Service worker installing");
			} else if (registration.waiting) {
				console.log("Service worker installed");
			} else if (registration.active) {
				console.log("Service worker active");
			}
		} catch (error) {
			console.error(`Registration failed with ${error}`);
		}
	}
};

registerServiceWorker();

function initCookies() {
	enableCookiesClickListeners();
	askPermissionForAnalytics();
	registerServiceWorker();
}

window.addEventListener("load", initCookies);
