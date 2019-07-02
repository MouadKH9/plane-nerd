<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Hash;
use Validator;


use App\User;
class UserController extends Controller{

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email'=>'email|required',
            'password'=>'required|min:6'
        ]);
        if($validator->fails())
            return response()->error("Error: ". $validator->errors()->first(),401);
        $credentials = $request->only('email','password');
        $email = $credentials['email'];
        $password = $credentials['password'];
        $token = auth('api')->attempt(['email' => $email, 'password' => $password]);

        if(!$token)
            return response()->error("Incorrect credentials",401);

        return response()->success(["token"=>$token]);

    }

    public function register(Request $request){
        $credentials = $request->only('name', 'email', 'password');

        $validator = Validator::make($request->all(),[
            'email'=>'email|required',
            'password'=>'required|min:6'
        ]);
        if($validator->fails())
            return response()->error("Error: ". $validator->errors()->first(),401);

        $name = $request->name;
        $email = $request->email;
        $password = $request->password;

        $user = User::create(['name' => $name, 'email' => $email, 'password' => Hash::make($password)]);

        return response()->success(["message"=>"Registered successfully!"]);
    }

    public function user(Request $request){
        $user = Auth::user();
        return response()->success($user);
    }

    public function getAll()
    {
        $users = user::orderBy('id', 'desc')->get();
        return response()->success(['users'=>$users]);
    }
}
