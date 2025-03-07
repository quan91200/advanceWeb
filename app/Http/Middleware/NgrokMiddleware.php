<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\App;

class NgrokMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (App::environment('local') && str_contains($request->header('host'), 'ngrok-free.app')) {
            $ngrokUrl = 'https://' . $request->getHost();
        
            Config::set('app.url', $ngrokUrl);
            URL::forceRootUrl($ngrokUrl);
        }        
    }
}
