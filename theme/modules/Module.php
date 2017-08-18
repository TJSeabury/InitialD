<?php namespace DIFDesign\theme\modules;

class Module implements ModuleParadigm
{
    protected $styles;
    protected $scripts;
    public function __construct( $stylesPath, $scriptsPath )
    {
        $this->styles = $stylesPath;
        $this->scripts = $scriptsPath;
    }
    public function init()
    {
        
    }
    public function run()
    {

    }
}