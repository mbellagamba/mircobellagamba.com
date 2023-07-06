const ACCEPTS_COOKIES_KEY = "web-accepts-cookies";
const GOOGLE_TAG_ID = "G-W2E9LR5DLD";
const COOKIES_EXPIRY_IN_DAYS = 30;

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

function initAnalytics() {
	enableCookiesClickListeners();
	askPermissionForAnalytics()
}
