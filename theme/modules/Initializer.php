<?php namespace InitialD\theme\modules;

class Initializer
{
    public static function init()
    {
        add_shortcode( 'mugen-box', 'mugen_box_shortcode' );
        
    }
}