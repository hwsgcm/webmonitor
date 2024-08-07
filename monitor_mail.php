<?php


$post = isset($_POST) && $_POST ? $_POST : '';
if($post){
    @mail("hongwei@sgcarmart.com","Website down", print_r($post,true));
}