<?php namespace InitialD;

define( 'InitialDTHEMEROOT', get_stylesheet_directory_uri() );

/*
* Lazy load classes for brevity.
* @param string $class The fully-qualified class name.
* @return void
*/
spl_autoload_register( function ( $class )
{
    $prefix = 'InitialD\\';
    $base_dir = __DIR__ . '/';
    $len = strlen( $prefix );
    if ( strncmp( $prefix, $class, $len ) !== 0 )
	{
        return;
    }
    $relative_class = substr( $class, $len );
    $file = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';
    if ( file_exists( $file ) )
	{
        include_once $file;
    }
} );

/*
* Instantiate and setup child theme.
*/
$Theme = new InitialD(
	__DIR__,
	InitialDTHEMEROOT,
	time()
);

$Theme->initAdmin();

$Theme->initStyles(
	'/public/css/modules/',
	'/public/css/',
	'aggregate.min.css'
);

$Theme->initScripts();


/*
* Enable modules based on theme options.
*/
if ( (bool)get_option('InitialD_interface_ajax_shortcodes') )
{
	interfaces\AjaxShortcodes::enable();
}




/*
* Misc parent theme setup and modifiers.
*/

/* function avada_lang_setup()
{
	$lang = get_stylesheet_directory() . '/languages';
	load_child_theme_textdomain(
		'Avada',
		$lang
	);
}
add_action(
	'after_setup_theme',
	'avada_lang_setup'
);


function my_child_theme_image_size()
{
	 remove_image_size( 'recent-works-thumbnail' ); 
	 add_image_size(
		 'recent-works-thumbnail',
		 420,
		 '',
		 false
	 );
}
add_action(
	'after_setup_theme',
	'my_child_theme_image_size',
	11
); */

/*
* Plugin modifiers.
*/
/* add_filter(
	'gform_enable_field_label_visibility_settings', // Adds the option to hide Gravity form field labels.
	'__return_true'
); */










