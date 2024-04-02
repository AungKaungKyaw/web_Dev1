<?php

//$input = "hello world";
if(!empty($input)){
    echo $input;
}
class Dat{
    private $page;
    public function assignValue(){
        $this->setValue("helloasdfsdf");
    }
    public function output(){
        echo $this->page;
    }
    public function setValue($val){
        $this->page .=$val;
    }

}
$helo = new Dat();
$helo->assignValue();
$helo->output();
?>
