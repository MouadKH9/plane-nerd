<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Flight;

class StatsController extends Controller{
    public function getAll(){
        return response()->json([
            "flightsCount"=> $this->getFlightsCount(),
            "milesCovered"=> $this->getMilesCovered(),
            "topRoutes"=> $this->getTopRoutes(),
            "flightsPerDay"=> $this->getFlightsPerDay(),
        ]);
    }

    function getFlightsCount(){
        return DB::table('flights')->count();
    }
    function getMilesCovered(){
        return DB::table('flights')->sum('milesTravelled');
    }

    function getTopRoutes(){
        return DB::table('flights')
                ->select('departurePoint','arrivalPoint',DB::raw('count(*) as count'))
                ->groupBy('departurePoint','arrivalPoint')
                ->orderBy('count','desc')
                ->limit(5)
                ->get();
    }

    function getFlightsPerDay(){
        $data = DB::table('flights')
                ->select('travelDate',DB::raw('count(*) as count'))
                ->groupBy('travelDate')
                ->get();
        if(count($data) == 0) return [];
        $period = new \DatePeriod(
            new \DateTime($data[0]->travelDate),
            new \DateInterval('P1D'),
            new \DateTime(date('Y-m-d', time()))
        );
        $res = array();
        // Log::debug($v->travelDate . ' ? ' . $value->format('Y-m-d') );
        foreach ($period as $key => $value) {
            foreach ($data as $k => $v){
                if($v->travelDate == $value->format('Y-m-d')){
                    $tmp = $v->count;
                    break;
                }
                else 
                    $tmp = 0;
            }
            array_push($res,[$value->format('Y-m-d') => $tmp]);
        }
        return $res;
    }
}
