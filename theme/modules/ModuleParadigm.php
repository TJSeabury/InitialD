<?php namespace InitialD\theme\modules;

interface ModuleParadigm
{
    public function __construct();
    public function init();
    public function run();
}