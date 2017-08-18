<?php namespace InitialD\theme\modules\box;

class Box extends InitialD\theme\modules\Module
{
    public function init()
    {
        add_shortcode( 'InitialD-box', 'mugen_button_shortcode' );
    }
    public function run( $atts = [], $content = null, $tag = '' )
    {
        $atts = array_change_key_case( (array)$atts, CASE_LOWER );
        $mugen_atts = shortcode_atts( ['title' => 'WordPress.org'], $atts, $tag );
        $o = '';
        $o .= '<div class="mugen-box">';
        $o .= '<h2>' . esc_html__( $mugen_atts['title'], 'mugen' ) . '</h2>';
        if ( !is_null( $content ) )
        {
            $o .= apply_filters( 'the_content', $content );
            $o .= do_shortcode( $content );
        }
        $o .= '</div>';
        return $o;
    }
}