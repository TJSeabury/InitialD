<?php namespace DIFDesign\theme\modules\button;

class Button extends DIFDesign\theme\modules\Module
{
    public function init()
    {
        add_shortcode( 'DIFDesign-button', $this->run );
    }
    public function run( $atts = [], $content = null, $tag = '' )
    {
        $atts = array_change_key_case( (array)$atts, CASE_LOWER );
        $mugen_atts = shortcode_atts( ['href' => '#'], $atts, $tag );
        $o = '';
        $o .= '<a class="mugen-button" href="' . esc_html__( $mugen_atts['href'], mugen ) . '" >';
        if ( !is_null( $content ) )
        {
            $o .= $content;
        }
        $o .= '</a>';
        return $o;
    }
}