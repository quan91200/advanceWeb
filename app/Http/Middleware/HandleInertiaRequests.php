<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'locale' => app()->getLocale(),
            'translations' => function () {
                return json_decode(file_get_contents(resource_path('lang/' . app()->getLocale() . '.json')), true);
            },
            // Thông tin về người dùng đang đăng nhập
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'profile_pic' => $request->user()->profile_pic,
                    'dark_mode' => $request->user()->dark_mode,
                    'language' => $request->user()->language,
                ] : null,
            ],
            // Flash messages
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
            // Cấu hình hoặc thông tin chung
            'app' => [
                'name' => config('app.name'),
                'locale' => app()->getLocale(),
                'url' => config('app.url'),
            ],
        ]);
    }
}