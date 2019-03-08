(function(clsName) {
	var msgText = 'this script is broken';
	console.log('hello from broken script');
	try {
		console.log('doing the thing.');
		document.cookie = 'xyzzy';
		var dc = document.cookie;
		console.log('DC is ' + document.cookie);
		msgText = 'unprotected';
		console.log('did the thing');
	}
	catch (err) {
		console.log('in catch');
		if (err.name !== 'SecurityError') {
			throw err;
		}
		console.log(err.name);
		msgText = 'protected';
		console.log('finished catch');
	}
	console.log('finished try/catch');
	txt = document.createTextNode(msgText);
	var els = document.getElementsByClassName(clsName);
	Array.prototype.filter.call(els, function(el){
		el.removeChild(el.firstChild);
		el.appendChild(txt);
	})
})('firstPartyCookieCheck');

