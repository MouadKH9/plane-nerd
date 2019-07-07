<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Flight;

class StatsController extends Controller{
    public function getAll(){
        return response()->json([
            "flightsCount"=> $this->getFlightsCount(),
            "milesCovered"=> $this->getMilesCovered(),
            "topRoutes"=> $this->getTopRoutes()
        ]);
    }

    function getFlightsCount(){
        return DB::table('flights')->count();
    }
    function getMilesCovered(){
        return DB::table('flights')->sum('milesTravelled');
    }

    function getTopRoutes(){
        $tmp = DB::table('flights')
                ->select('departurePoint','arrivalPoint',DB::raw('count(*) as count'))
                ->groupBy('departurePoint','arrivalPoint')
                ->orderBy('count','desc')
                ->limit(5)
                ->get();
        return $tmp;
    }
}
