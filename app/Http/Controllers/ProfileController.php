<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    // Hiển thị form cập nhật hồ sơ người dùng
    public function edit(Request $request)
    {
        // Kiểm tra xem người dùng có profile chưa
        $profile = $request->user()->profile; 
        if (!$profile) {
            $profile = new Profile(); 
        }
        return inertia('Profile/Edit', [
            'profile' => (new ProfileResource($profile))->resolve(),
            'locations' => \App\Models\Location::all(),
        ]);
    }
    // Cập nhật thông tin hồ sơ người dùng
    public function update(ProfileRequest $request)
    {
        $user = $request->user();
        $data = $request->validated();
        // Kiểm tra xem người dùng đã có profile chưa
        $profile = $user->profile ?: new Profile();
        $profile->user_id = $user->id;
        $profile->fill($data);
        $profile->save();
        return redirect()->route('users.edit', ['id' => $user->id]);
    }
}

