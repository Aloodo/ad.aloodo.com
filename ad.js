function doAloodoPopup() {
	var url = 'http://ad.aloodo.com/';
	var message = 	'<b>Third-party tracking detected.</b> ' +
			'Missing or misconfigured tracking protection.';
	var txt = '<a href="' + url + '">' + message + '</a>';

	if (typeof toastr=='undefined') {
		window.setTimeout(doAloodoPopup, 1000);
	} else {
		toastr.options = { 'timeOut': 30000 };
		toastr.error(txt);
	}
}

function toastrSetup() {
	if (typeof toastr !== 'undefined') {
		doAloodoPopup();
	}
	var sc = document.createElement('script');
	sc.setAttribute('src', 'http://ad.aloodo.com/toastr/toastr.min.js');
	document.body.appendChild(sc);
	sc.onload = doAloodoPopup();
	var cs = document.createElement('link');
	cs.setAttribute("rel", "stylesheet");
	cs.setAttribute("type", "text/css");
	cs.setAttribute("href", 'http://ad.aloodo.com/toastr/toastr.min.css');
	document.getElementsByTagName('head')[0].appendChild(cs);
}

function startAloodo(ev) {
	if (ev.data !== 'tracking detected') {
		return;
	}

	var safety = document.getElementById('tracking-safety');
	if (safety) {
		warning.style.display = 'none';
	}

	var done = false;
	var warning = document.getElementById('tracking-warning-block');
	if (warning) {
		warning.style.display = 'block';
		done = true;
	}
	var warning = document.getElementById('tracking-warning-inline');
	if (warning) {
		warning.style.display = 'inline';
		done = true;
	}
	if (done) { return; }

	if(typeof jQuery=='undefined') {
		var jq = document.createElement('script');
		jq.src = '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
		jq.onload = toastrSetup;
		document.body.appendChild(jq);
	} else {
		toastrSetup();
	}
}

function setupAloodo() {
	// This puts the tracker in an iframe.  The
	// tracker may then call startAloodo in its
	// parent.
	var ifr = document.createElement('iframe');
	ifr.src = "//ad.aloodo.com/track/";
	ifr.style.visibility = 'hidden';
	document.body.appendChild(ifr);
}

window.addEventListener("message", startAloodo, false);
document.addEventListener("DOMContentLoaded", setupAloodo);
