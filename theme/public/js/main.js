/*
* Main scripts
* © Copyright 2017, DIF Design, All Rights reserved.
* @author Tyler Seabury, tylerseabury@gmail.com
* @author DIF Design
* @authorURL https://github.com/TJSeabury/
* @authorURL http://difdesign.com/
* @version 1.0
*/
window.addEventListener('DIFDesignCoreReady', function main() {
	'use strict';
	
	let D = DIFDesignCoreUtilities;
	let $ = jQuery;
	
	/*
    * Tags each page with a class based on the Wordpress fed page title.
    * Useful for targeting specific pages with styles.
	*/
	document.body.classList.add( document.title.replace( /\W/g, '' ) );
    
	let wpadminbar = document.querySelector('#wpadminbar');
	let mainHeader = document.querySelector('.fusion-header-wrapper');
	if ( D.W > 1023 )
	{
		let difFirstFullHeight = document.querySelectorAll('.difFirstFullHeight');
		let difFullHeight = document.querySelectorAll('.difFullHeight');
		/*
		* Sets the height of elements to the viewport height minus the headers.
		* @param {HTMLElement Array} elements - The elements to set the height of.
		* @param {Number} fraction - A number to modify the height being applied to the element.
		* @param {HTMLElement Array} subtration - Elements to subtract the height of from the final height applied to the element.
		* @use Add class 'difFullHeight' to elements to set their height.
		*/
		D.heightSetter( difFirstFullHeight, 1.0, [] );
		D.heightSetter( difFullHeight, 1.0, [mainHeader] );
	}
	
	/*
	* Inject request appointment button in main nav and form in header.
	*/
	let nav = mainHeader.querySelector('#menu-primary');
	let requestAppointment = ( () =>
  	{
		let requestPageURL = '#';
		let r = document.createElement('li');
		let classes = [
			'menu-item',
			'menu-item-type-post_type',
			'menu-item-object-page',
			'menu-item-bookNow',
			'fusion-last-menu-item'
		];
		r.setAttribute('role','menuitem');
		r.id = 'menu-item-bookNow';
		for ( let i = 0; i < classes.length; ++i )
		{
			r.classList.add( classes[i] );
		}
		r.innerHTML = '<a href=' + requestPageURL + ' class="difThemeButton"><span class="menu-text">BOOK NOW</span></a>';
		return r;
	}
 	)();
	nav.appendChild(requestAppointment);
    
    /* --------------------------------------------------- */
    

    // code . . . 
    

    /* --------------------------------------------------- */
	
	/*
    * Smooth scroll to anchor.
    * @use Add class 'difScrollToAnchor' to any link to enable smooth scrolling to it's target.
	*/
	const links = document.querySelectorAll('.difScrollToAnchor');
	[].forEach.call( links, 
	e => 
	{
		e.addEventListener( 'click', 
		ev => 
		{
			ev.preventDefault();
			const sY = getScrollAmount( document.querySelector( e.href.replace( window.location.protocol + '//' + window.location.host + window.location.pathname, '' ) ) );
			$("html, body").animate({ scrollTop: sY +'px' }, 666);
		}
		);
	}
	);
	function getScrollAmount(t)
	{
		const wpHeader = document.querySelector('#wpadminbar').offsetHeight || 0;
		const fusionHeader = document.querySelector('.fusion-header-wrapper').offsetHeight || 0;
		return t.getBoundingClientRect().top - wpHeader - fusionHeader;
	}
	
	/*
	* Generic prevent Default action.
    * Simply prevent the default behavior of clicks, nothing more.
    * @use Add class 'jsNoDefault' to any element to prevent actions, i.e., clicks on links.
	*/
	const noDefaults = document.getElementsByClassName( 'jsNoDefault' );
	for ( let i = 0; i < noDefaults.length; ++i )
	{
		if ( noDefaults[i] instanceof HTMLElement )
		{
			noDefaults[i].addEventListener( 'click', e =>
			{
				e.preventDefault();
			}
			);
		}
	}
});