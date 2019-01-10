/**
 * 工具
 */
(function(window) {

	window.qs = function(selector, parent) {
		return (parent || document).querySelector(selector);
	}

	window.qsa = function(selector, parent) {
		return (parent || document).querySelectorAll(selector);
	}

	window.$on = function(target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	}

	window.$delegated = function(target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements,
					targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}
		var useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};

	/**
	 * 格式化数据
	 * 
	 * @param {Obj}
	 *            data 需要格式化的数据
	 * @param {Boolean}
	 *            isCache 是否加入随机参数
	 * @return {String} 返回的字符串
	 */
	function formateParams(data, isCache) {
		var arr = [];
		for ( var name in data) {
			arr.push(encodeURIComponent(name) + '='
					+ encodeURIComponent(data[name]));
		}
		if (isCache) {
			arr.push('v=' + (new Date()).getTime());
		}
		return arr.join('&');
	}

	/**
	 * 通过JSON的方式请求
	 * 
	 * @param {[type]}
	 *            params [description]
	 * @return {[type]} [description]
	 */
	window.$ajax = function(params) {
		params.type = (params.type || 'GET').toUpperCase();
		params.data = params.data || {};
		var formatedParams = formateParams(params.data, params.cache);
		var xhr;
		// 创建XMLHttpRequest对象
		if (window.XMLHttpRequest) {
			// 非IE6
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		// 异步状态发生改变，接收响应数据
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (!!params.success) {
					if (typeof xhr.responseText == 'string') {
						params.success(JSON.parse(xhr.responseText));
					} else {
						params.success(xhr.responseText);
					}
				}
			}
			/*else {
				params.error && params.error(status);
			}*/
		}
		if (params.type == 'GET') {
			// 连接服务器
			xhr.open('GET', (!!formatedParams ? params.url + '?'
					+ formatedParams : params.url), true);
			// 发送请求
			xhr.send();
		} else {
			// 连接服务器
			xhr.open('POST', params.url, true);
			xhr.setRequestHeader('Content-Type',
					'application/x-www-form-urlencoded');
			// 发送请求
			xhr.send(formatedParams);
		}
	}


}(window))