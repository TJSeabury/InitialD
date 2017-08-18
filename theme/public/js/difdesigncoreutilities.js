/*
 * DIFDesign Core frontend library.
 * © Copyright 2017, DIF Design, All Rights reserved.
 * @author Tyler Seabury, tylerseabury@gmail.com
 * @author DIF Design
 * @authorURL https://github.com/TJSeabury/
 * @authorURL http://difdesign.com/
 * @version 0.4.0
 */


let DIFDesignCoreUtilities = new DIFDESIGNCOREUTILITIES();
DIFDesignCoreUtilities.announceReady();

function DIFDESIGNCOREUTILITIES() {
    'use strict';

    let self = this;
	
	/*
    * Check if wpMeta has been localized before accessing.
    */
    try
    {
        this._rootPathname = wpMeta.siteURL
    }
    catch( e )
    {
        if ( e.name === 'ReferenceError' )
        {
            console.error('Failed to access localized variable wpMeta. \n_rootPathName was not set.');
        }
        this._rootPathname = null;
    }

    /*
    * Handy-Dandy nifty properties
    */
    window.addEventListener('resize', () => {
        this.W = document.body.clientWidth;
        this.H = window.innerHeight;
    });
    window.dispatchEvent( new Event('resize') );
    
    /*
    * Helper method to more easily create elements.
    * TODO - Needs to be fleshed out.
    */
    this.makeElement = function( element = 'div', classNames = [], content = '', attr = {} )
	{
		let r = null;
		if ( element )
		{
			try
			{
				r = document.createElement( element );
			}
			catch ( e )
			{	
				console.error('Not a valid HTML Element tag name.');
				throw e;
			}
		}
		if ( classNames && classNames.constructor === Array )
		{
			for ( let c = 0; c < classNames.length; ++c )
			{
				try
				{
					r.classList.add( classNames[c] );
				}
				catch ( e )
				{
					throw e;
				}
			}
		}
		else
		{
			r.classList.add( classNames );
		}
		if ( content && ( typeof content === 'string' || content instanceof String )  )
		{
			r.innerHTML = content;
		}
		if ( attr && attr.constructor === Object )
		{	
			try
			{
				switch ( r.tagName )
				{
					case 'A':
						r.setAttribute( 'href', attr.href );
						r.setAttribute( 'target', attr.target );
						break;
					case 'IMG':
						r.setAttribute( 'src', attr.src );
						r.setAttribute( 'alt', attr.alt );
						break;
					default:
						break;
				}
			}
			catch ( e )
			{
				throw e;
			}
		}
		return r;
	};

    /*
     *
     * !! TODO !!
     *
     * The Eye of Sauron will, in the future, replace event listeners for most use cases.
     * !! This is still in development and should not be considered anything other than experimental,
     * be expected to function properly, or at all. !!
     * @Use - Don't, not yet.
     */
    this.eyeOfSauron = new EyeOfSauron();
    function EyeOfSauron(subject) {
        this.watchers = [];

        /*
        * { name, target, callback }
        */
        this.regard = function(obj) {
            let ob = new MutationObserver( mutations => {
                for ( let m = 0; m < mutations.length; ++m ) {

                }
                // Object.prototype.toString.call( mutation.addedNodes[i] ) === '[object HTMLDivElement]'
            });

            observer.observe( document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });

        }

    }
    
    /* 
    * Polyfill for focusin and focusout.
    */
    polyfill();
    function polyfill() {
        let w = window,
            d = w.document;
        if (w.onfocusin === undefined) {
            d.addEventListener('focus', addPolyfill, true);
            d.addEventListener('blur', addPolyfill, true);
            d.addEventListener('focusin', removePolyfill, true);
            d.addEventListener('focusout', removePolyfill, true);
        }
        function addPolyfill(e) {
            let type = e.type === 'focus' ? 'focusin' : 'focusout',
                event = new window.CustomEvent(type, {bubbles: true, cancelable: false});
            event.c1Generated = true;
            e.target.dispatchEvent(event);
        }

        function removePolyfill(e) {
            if (!e.c1Generated) {
                d.removeEventListener('focus', addPolyfill, true);
                d.removeEventListener('blur', addPolyfill, true);
                d.removeEventListener('focusin', removePolyfill, true);
                d.removeEventListener('focusout', removePolyfill, true);
            }
            setTimeout(function () {
                d.removeEventListener('focusin', removePolyfill, true);
                d.removeEventListener('focusout', removePolyfill, true);
            });
        }
    }

    /*
    * Validate links.
    */
    this.validateLinks = function() {
        return new Promise( (resolve, reject) => {
            let links = document.getElementsByTagName('a'),
                valid = [],
                broken = [];
            for ( let a = 0; a < links.length; ++a ) {
                if ( links[a].getAttribute('href') !== undefined ) {
                    if ( links[a].getAttribute('href').replace(links[a].baseURI, '') === '#' ) {
                        broken.push(links[a]);
                    } else {
                        valid.push(links[a]);
                        // and follow link to see if valid, but I'll write that later because
                        // that functionality will require get requests and DOM parsing, and I
                        // don't feel like doing all that right now.
                    }
                } else {
                    broken.push(links[a]);
                }
            }
            resolve(valid);
            reject(broken);
        });
    };

    /*
     * Handles form ui animations
     *
     * !! TODO !!
     *
     * This is usefull but needs to be more generalized.
     */
    window.addEventListener('load', () => {
        let fields = document.getElementsByClassName('dif_movingLabel');

        function focusedState(element) {
            element.addEventListener('focusin', (e) => {
                let a = e.target.parentElement.previousElementSibling;
                a.style.transform = 'translateY(-50%)';
                a.style.opacity = 0.3;
            }, true);
        }

        function blurredState(element) {
            element.addEventListener('focusout', (e) => {
                if (e.target.value === '') {
                    let a = e.target.parentElement.previousElementSibling;
                    a.style.transform = 'translateY(0%)';
                    a.style.opacity = 1.0;
                }
            }, true);
        }

        for (let f = 0; f < fields.length; ++f) {
            focusedState(fields[f]);
            blurredState(fields[f]);
        }
    });

    /*
     * Set the height of a tagged element.
     * @param {HTMLElement Array} elements - The elements to set the height of.
     * @param {Number} fraction - A number to modify the height being applied to the element.
     * @param {HTMLElement Array} subtration - Elements to subtract the height of from the final height applied to the element.
     */
    this.heightSetter = function( elements, fraction, subtraction )
    {
        window.addEventListener( 'resize', () =>
        {
			let h = self.H;
			let s = 0;
			for ( let su = 0; su < subtraction.length; ++su )
			{
				s += subtraction[su].offsetHeight || 0;
			}
			h *= fraction;
			h -= s;
			for ( let e = 0; e < elements.length; ++e )
			{
				elements[e].style.minHeight = h + 'px';
			}
        }
        );
		window.dispatchEvent( new Event('resize') );
    };
	
	/*
	* Allows shortcodes to be executed asynchronously.
	* Returns the generated content in a promise.
	*/
	/* !! currently broken !! */
	/*this.doShortcode = function ( shortcode )
	{
		return new Promise( ( resolve, reject ) =>
    	{
			let r = new XMLHttpRequest();
            r.open( 'POST', self._rootPathname + '/' + 'wp-admin/admin-ajax.php' + '/' );
            r.onload = () => {
                if ( r.readyState === r.DONE && ( r.status >= 200 && r.status <= 300 ) ) {
					console.log(r.response);
                    resolve( r.response );
                } else {
                    reject( {
						status: this.status,
						statusText: r.statusText
					} );
                }
            };
            r.onerror = () => {
                reject({status: this.status, statusText: r.statusText});
            };
            r.send( JSON.stringify({
				'action': 'do_shortcode',
				'fn': 'js_do_shortcode',
				'shortcode': shortcode
			}) );
			
		} );
	};*/

    /*
     *
     * !! TODO !!
     *
     * Cross-browser implementation of element.addEventListener()
     * @param {function Array} fu -
     * @param {String} target -
     * @param {String} event -
     * @Use listen(function, 'target', 'event');
     */
    this.listen = function (fu, target = 'window', event = 'load') {
        let listeners = new Promise((resolve, reject) => {
            let validFunctions = [],
                invalidFunctions = [];
            if (Array.isArray(fu)) {
                for (let i = 0; i < fu.length; ++i) {
                    if (typeof fu[i] === 'function') {
                        validFunctions.push(fu[i]);
                    } else {
                        invalidFunctions.push(fu[i]);
                    }
                }
            } else if (typeof fu === 'function') {
                validFunctions.push(fu);
            }
            else {
                invalidFunctions.push(fu);
            }
            resolve(validFunctions);
            reject(invalidFunctions);
        });
        listeners.then((valid) => {
            for (let i = 0; i < valid.length; ++i) {
                if (window.addEventListener) { // W3C DOM
                    target.addEventListener(event, valid[i], false);
                } else if (window.attachEvent) { // IE DOM
                    target.attachEvent('onload', valid[i]);
                }
            }
        }).catch((rejected) => {
            for (let i = 0; i < rejected; ++i) {
                console.error(rejected[i] + " is not a function!");
            }
        });
    };

    /*
     *
     * !! TODO !!
     *
     * Basically just shitty jQuery.
     * @param {String} target - Takes a css selector or an array of css selectors.
     * @todo - Finish and make it actually work.
     */
    this.get = function (target = ['document']) {
        let gotten = [];
        try {
            if (Array.isArray(target)) {
                target.forEach((query) => {
                    let firstChar = String(query.charAt(0));
                    if (firstChar === '#') {
                        query = query.replace('#', '');
                        [].forEach.call(document.getElementById(query), (el) => {
                            gotten.push(el);
                        });
                    } else if (firstChar === '.') {
                        query = query.replace('.', '');
                        [].forEach.call(document.getElementsByClassName(query), (el) => {
                            console.log('is class');
                            gotten.push(el);
                        });
                    } else {
                        if (query === 'document' || query === 'doc') {
                            gotten.push(document.documentElement);
                        } else if (query === 'body') {
                            gotten.push(document.body);
                        } else {
                            [].forEach.call(document.getElementsByTagName(query), (el) => {
                                gotten.push(el);
                            });
                        }
                    }
                });
            }
        } catch (e) {
            console.error('DIFCOREUTILITIES.get() failed: ' + e);
        }
        return ( gotten.length > 0 ? gotten : null );
    };

    /*
     *
     * !! TODO !!
     *
     * Directly manipulate stylesheets instead on inline styles.
     * @todo - this needs to be modified to get existing stylesheets
     * @research - is this actually faster, better, harder, or stronger? use cases?
     */
    this.mutate = function (element, rules) {
        let styleElement = document.createElement('style'),
            styleSheet;
        document.head.appendChild(styleElement);
        styleSheet = styleElement.sheet;
        for (let i = 0, rl = rules.length; i < rl; i++) {
            let j = 1,
                rule = rules[i],
                selector = rules[i][0],
                propStr = '';
            // If the second argument of a rule is an array of arrays, correct our variables.
            if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
                rule = rule[1];
                j = 0;
            }
            for (let pl = rule.length; j < pl; j++) {
                let prop = rule[j];
                propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
            }
            styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
        }
    };

    /*
     * Simple XHR GET that returns a promise to allow chaining and,
     * properly handle asynchronus behavior of XHR.
     * @param {String} source - The source URL.
     */
    this.pull = function (source) {
        return new Promise((resolve, reject) => {
            let r = new XMLHttpRequest();
            r.responseType = "document";
            r.open("get", source);
            r.onload = () => {
                if (r.readyState === r.DONE && ( r.status >= 200 && r.status <= 300 )) {
                    resolve(r.response);
                } else {
                    reject({status: this.status, statusText: r.statusText});
                }
            };
            r.onerror = () => {
                reject({status: this.status, statusText: r.statusText});
            };
            r.send(null);
        });
    };


    /*
     * Rounds a number to the specified decimal place obviously.
     * This doesn't support rounding whole numbers. Use Math.round() for that.
     * @param {float} rnum - The decimal number.
     * @param {int} rlength - The decimal places to round to.
     */
    this.round = function (rnum, rlength) {
        return Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    };

    this.getOpposite = function (angle, adjacent) {
        return adjacent * Math.tan(angle * Math.PI / 180);
    };

    /*
     * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
     * @param {String} text - The text to be rendered.
     * @param {String} font  - The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
     */
    this.getTextWidth = function (text, font) {
        let canvas = canvas || document.createElement('canvas');
        let context = canvas.getContext("2d");
        context.font = font;
        let metrics = context.measureText(text);
        return metrics.width;
    };

    /*
     * Strips all the classes, except classes specified to be ignored,
     * from the element and all it's children if recursive is enabled.
     * @param {Element} el - The element to be stripped of classes.
     * @param {String Array} ignores - The prefixes of classes, or just classes, to be ignored.
     * @param {boolean} recursive - True to also strip classes from the element's children.
     */
    this.stripClasses = function (el, ignores = [], recursive = true) {
        if (el.classList.length > 0) {
            [].forEach.call(el.classList, (className) => {
                className = String(className);
                if (ignores.length > 0) {
                    // where cn is the nth class of classList
                    for (let cn = 0; cn < el.classList.length; ++cn) {
                        let ignore = false;
                        // where ig is the nth String of ignores
                        for (let ig = 0; ig < ignores.length; ++ig) {
                            if (String(el.classList[cn]).includes(ignores[ig])) {
                                ignore = true;
                            }
                        }
                        if (!ignore) {
                            el.classList.remove(className);
                        }
                    }
                } else {
                    el.classList.remove(className);
                }
            });
        }
        if (el.hasChildNodes && recursive) {
            [].forEach.call(el.children, (child) => {
                this.stripClasses(child, ignores, recursive);
            });
        }
    };

    function scrollToElement(target, duration, callback = null) {
        let scrollUp = false,
            scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            targetTop = target.getBoundingClientRect().top + scrollTop,
            distance = (-1 * parseInt(scrollTop - targetTop)),
            angle = 0,
            speed = 0.05;
        const offset = 0.5,
            baseAlpha = 0.5;
        let targetEl = target,
            targetYOffset = 0;
        while (targetEl) {
            targetYOffset += (targetEl.offsetTop);
            targetEl = targetEl.offsetParent;
        }
        if (scrollTop > targetTop) {
            scrollUp = true;
        }
        let then = performance.now();
        render();
        function render(now) {
            let alpha;
            if (scrollUp) {
                alpha = self.round((baseAlpha + Math.sin(angle) * offset), 2);
            } else {
                alpha = self.round((baseAlpha - Math.sin(angle) * offset), 2);
            }
            console.log(scrollTop, targetTop, distance, targetYOffset);
            //window
            angle += speed;
            then = now;
            //requestAnimationFrame(render);
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    }

    this.shellSort = function (array) {
        let length = array.length,
            h = 1;
        while (h < length / 3) {
            h = 3 * h + 1;
        }
        while (h > 0) {
            for (let i = h; i < length; i++) {
                for (let j = i; j > 0 && array[j] < array[j - h]; j -= h) {
                    self.swap(array, j, j - h);
                }
            }
            //decreasing h
            h = --h / 3;
        }
        return array;
    };

    /*
     * Simple JS animation for elements, needs a lot of work.
     * All the these animations should be roled into one object.
     */
    this.slide = function (el, initialOffset, finalOffset, callback = null) {
        let slideIn = false;
        if (finalOffset > initialOffset) {
            slideIn = true;
        }
        el.style.zIndex = 1000010;
        el.style.transform = 'translateX(' + ( parseFloat(initialOffset) * -100 ) + '%)';
        let angle = 0,
            speed = 0.05,
            baseOffset = 0.5;
        render();
        function render() {
            let offset;
            if (slideIn) {
                offset = self.round((baseOffset + Math.sin(angle)), 2);
                if (offset >= finalOffset - 0.01) {
                    offset = finalOffset;
                }
            } else {
                offset = self.round((baseOffset - Math.sin(angle)), 2);
                if (offset <= finalOffset + 0.01) {
                    offset = finalOffset;
                }
            }
            el.style.transform = 'translateX(' + ( parseFloat(offset) * -100 ) + '%)';
            angle += speed;
            if (offset !== finalOffset) {
                requestAnimationFrame(render);
            } else {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        }
    };

    /*
     * Simple JS animation for elements, needs a lot of work.
     * All the these animations should be roled into one object.
     */
    this.fade = function (el, initialAlpha, finalAlpha, callback = null) {
        let fadeIn = false;
        if (finalAlpha > initialAlpha) {
            fadeIn = true;
        }
        el.style.zIndex = 1000010;
        el.style.opacity = parseFloat(initialAlpha);
        let angle = 0,
            speed = 0.05,
            offset = 0.5,
            baseAlpha = 0.5;
        render();
        function render() {
            let alpha;
            if (fadeIn) {
                alpha = self.round((baseAlpha + Math.sin(angle) * offset), 2);
                if (alpha >= finalAlpha - 0.01) {
                    alpha = finalAlpha;
                }
            } else {
                alpha = self.round((baseAlpha - Math.sin(angle) * offset), 2);
                if (alpha <= finalAlpha + 0.01) {
                    alpha = finalAlpha;
                }
            }
            el.style.opacity = alpha;
            angle += speed;
            if (alpha !== finalAlpha) {
                requestAnimationFrame(render);
            } else {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        }
    };

    /*
     * Sets a cookie.
     */
    this.setCookie = function (cookieName, value, lifespan) {
        let deathDate = new Date();
        deathDate.setDate(deathDate.getDate() + lifespan);
        let cookieValue = encodeURIComponent(value) + ((lifespan === null) ? '' : ('; expires=' + deathDate.toUTCString()));
        document.cookie = cookieName + '=' + cookieValue;
    };
    /*
     * All your cookie are belong to us.
     */
    this.getCookie = function (cookieName) {
        let retrievedCookieName,
            retrievedCookieValue,
            cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; ++i) {
            retrievedCookieName = cookies[i].substr(0, cookies[i].indexOf('='));
            retrievedCookieValue = cookies[i].substr(cookies[i].indexOf('=') + 1);
            retrievedCookieName = retrievedCookieName.replace(/^\s+|\s+$/g, '');
            if (retrievedCookieName === cookieName) {
                return decodeURIComponent(retrievedCookieValue);
            }
        }
    };

    /*
     * Announce loaded and ready.
     */
    this.announceReady = function () {
        window._DIFDesignCoreReady = new CustomEvent('DIFDesignCoreReady', { bubbles: true });
        window.dispatchEvent(window._DIFDesignCoreReady);
        window.dispatchEvent( new Event( 'resize' ) );
		console.log('DIF Design > Ready');
    };

}