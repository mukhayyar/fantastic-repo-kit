<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Symfony\Component\Console\Output\ConsoleOutput;

class UserController extends Controller
{
    public function index()
    {
        $output = new ConsoleOutput();
        $user_model = User::all();
        $user_redis = Redis::get("users::all");
        if(json_decode($user_redis)){
            $output->writeln('Using Redis');
            return response(json_decode($user_redis));
        } else {
            $output->writeln('Using DB');
            Redis::set("users::all",json_encode($user_model));
            return response($user_model);
        }
    }
}
