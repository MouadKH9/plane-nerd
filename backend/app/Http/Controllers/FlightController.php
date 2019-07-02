<?php

namespace App\Http\Controllers;

use App\Flight;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
class FlightController extends Controller
{
    public function index(){
        $flights = Flight::all();
        return response()->json($flights);
    }

    public function create(Request $request){
        Model::unguard();
        try {
            Flight::create($request->all());
            return response()->json(["success"=>true]);
        } catch (\Exception $e) {
            return response()->json(["success"=> false, "error"=>$e->getMessage()]);
        }
    }

    public function show($id){
        try {
            $flight = Flight::findOrFail($id);
            return response()->json([ "flight"=>$flight]);
        } catch (\Exception $e) {
            return response()->json(["success"=> false, "error"=>$e->getMessage()]);
        }
    }

    public function edit(Request $request,$id){
        Model::unguard();
        try {
            $flight = Flight::find($id);
            $flight->fill($request->all());
            $flight->save();
            return response()->json(["success"=>true,"flight"=> $flight]);
        } catch (\Exception $e) {   
            return response()->json(["success"=> false, "error"=>$e->getMessage()]);
        }
    }

    public function destroy($id){
        try {
            $flight = Flight::destroy($id);
            return response()->json(["success"=>true]);
        } catch (\Exception $e) {   
            return response()->json(["success"=> false, "error"=>$e->getMessage()]);
        }
    }
}
