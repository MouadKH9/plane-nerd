<?php

use Illuminate\Http\Request;

Route::post('auth/login','UserController@login');
Route::post('auth/register','UserController@register');
// auth:api
Route::group(['middleware' => ['jwt.auth']], function () {
    
    Route::get('flight/all', "FlightController@index");
    Route::post('flight/add', "FlightController@create");
    Route::put('flight/edit/{id}', "FlightController@edit");
    Route::delete('flight/delete/{id}', "FlightController@destroy");
    Route::get('flight/{id}', "FlightController@show");


    Route::get('stats', 'StatsController@getAll');
});
