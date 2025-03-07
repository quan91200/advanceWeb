<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale = optional($request->user())->language ?? $request->getPreferredLanguage(['en', 'vi']);
        App::setLocale($locale);

        $response = $next($request);

        if (!$response instanceof Response) {
            return response($response);
        }

        return $response;
    }
}
