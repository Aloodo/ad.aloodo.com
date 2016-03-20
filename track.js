/*
 * Portions based on BlockAdBlock 3.2.1
 *
 * BlockAdBlock copyright notice:
 * Copyright (c) 2015 Valentin Allaire <valentin.allaire@sitexw.fr>
 * Released under the MIT license
 * https://github.com/sitexw/BlockAdBlock
 */

(function(window) {
	var Aloodo = function(options) {
		this._options = {
			debug:		false,	
			iframeId:	'ALOODO_FAKE_TRACKER_BLOCK_ME'
		};
		this._var = {
			version:			'1.0.0',
			event:				{ load: [],
							  detected: [] }
		};
		if(options !== undefined) {
			this.setOption(options);
		}
		var self = this;
		var loadCallback = function() {
			setTimeout(function() {
				self._addIFrame();
			}, 1);
		};
		var messageCallback = function(ev) {
			self._dlog('messageCallback', 'message received: '+ev.data)
			var which;
			if (ev.data === 'Aloodo iframe loaded') {
				which = 'load'; 
			} else if (ev.data === 'tracking detected') {
				which = 'detected';
			} else {
				return;
			}
			var fns = self._var.event[which];
                 	for(var i in fns) {
				self._dlog('messageCallback', 'Call function '+(parseInt(i)+1)+'/'+fns.length);
				if(fns.hasOwnProperty(i)) {
			        	fns[i]();
				}
			}
		};
		if(window.addEventListener !== undefined) {
			window.addEventListener('load', loadCallback, false);
			window.addEventListener('message', messageCallback, false);

		} else {
			window.attachEvent('onload', loadCallback);
			window.addEventListener('message', messageCallback);
		}
	};
	Aloodo.prototype._options = null;
	Aloodo.prototype._var = null;
	
	Aloodo.prototype._log = function(method, message) {
		console.log('[Aloodo]['+method+'] '+message);
	};

	Aloodo.prototype._dlog = function(method, message) {
		if(!this._options.debug) {
			return;
		}
		console.log('[Aloodo]['+method+'] '+message);
	};
	
	Aloodo.prototype.setOption = function(options, value) {
		if(value !== undefined) {
			var key = options;
			options = {};
			options[key] = value;
		}
		for(var option in options) {
			this._options[option] = options[option];
			this._dlog('setOption', 'The option "'+option+'" was assigned to "'+options[option]+'"');
		}
		return this;
	};

	Aloodo.prototype._addIFrame = function() {
		function postMsg() {
			window.postMessage('Aloodo iframe loaded', '*');
		}
		var id = this._options.iframeId;
		if (window.document.getElementById(id)) {
			this._dlog('_addIFrame', id+' already present')
			return;
		}
		var ifr = document.createElement('iframe');
		ifr.id = id;
		ifr.src = "https://ad.aloodo.com/track/";
		ifr.style.visibility = 'hidden';
		ifr.onload = postMsg;
		window.document.body.appendChild(ifr);
		if (window.document.getElementById(id)) {
			this._dlog('_addIFrame', id+' appended')
			return;
		}
	}

	Aloodo.prototype.on = function(what, fn) {
		this._var.event[what].push(fn);
		this._dlog('on', 'A function for event '+what+' was added');
		return this;
	};
	Aloodo.prototype.onLoad = function(fn) {
		return this.on('load', fn);
	};
	Aloodo.prototype.onDetected = function(fn) {
		return this.on('detected', fn);
	};
	
	window.Aloodo = Aloodo;
	
	if(window.aloodo === undefined) {
		window.aloodo = new Aloodo({
			debug: false
		});
	}
})(window);

