<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserHobbyResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Friend;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class UserController extends Controller
{
    // Hiển thị thông tin cá nhân của người dùng
    public function show($id)
    {   
        $authUser = Auth::user();
        $user = User::with(['posts', 'friends', 'hobbies'])
            ->withCount('posts', 'friends', 'hobbies')
            ->findOrFail($id);
        $notFriends = User::notFriends($authUser->id)->get();
        $friends = User::friendsList($id)->get();
        // Kiểm tra quan hệ bạn bè hiện tại
        $friendship = Friend::where(function ($query) use ($authUser, $id) {
            $query->where('user_id', $authUser->id)
                ->where('friend_id', $id);
        })->orWhere(function ($query) use ($authUser, $id) {
            $query->where('user_id', $id)
                ->where('friend_id', $authUser->id);
        })->first();
        // Xác định trạng thái bạn bè
        $friendStatus = $friendship ? $friendship->status : 'none'; // none, pending, accepted, rejected
        $friendshipId = $friendship->id ?? null; // ID của quan hệ bạn bè (nếu tồn tại)
        return inertia('User/Show', [
            'user' => (new UserResource($user))->resolve(),
            'notFriends' => $notFriends,
            'friendsList' => $friends,
            'friendStatus' => $friendStatus, // Trạng thái bạn bè (none, pending, accepted, rejected)
            'friendshipId' => $friendshipId,
        ]);
    }
    // Hiển thị form cập nhật thông tin hồ sơ người dùng
    public function edit(Request $request)
    {
        $user = $request->user();
        $userHobbies = $user->userHobbies;
        // Trả về thông tin hồ sơ và sở thích hiện tại của người dùng
        return inertia('User/Edit',[
            'user' => (new UserResource($user))->resolve(),
            'userHobbies' => (UserHobbyResource::collection($userHobbies))->resolve(),
        ]);
    }
    // Hiển thị các cài đặt của người dùng (dark mode, language, xóa tài khoản)
    public function setting(SettingRequest $request)
    {
        $user = $request->user();
        return inertia('User/Setting', [
            'user' => new UserResource($user),
        ]);
    }
    // account center
    public function accountCenter(Request $request)
    {
        $user = $request->user();
        return inertia('Setting/AccountCenter', [
            'user' => new UserResource($user),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    // Cập nhật thông tin hồ sơ người dùng
    public function update(UserRequest $request)
    {
        $user = $request->user();
        $data = $request->validated();
        if ($request->hasFile('profile_pic')) {
            if ($user->profile_pic) {
                Storage::delete('public/' . $user->profile_pic);
            }
            $data['profile_pic'] = $request->file('profile_pic')->store('images', 'public');
        }
        
        $user->update($data);
        return redirect()->route('users.show', ['id' => $user->id])
            ->with('success', 'Thông tin người dùng đã được cập nhật.');
    }
    // Xóa người dùng
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);
        $user = $request->user();
        // Xóa các dữ liệu liên quan
        $user->posts()->delete();
        $user->comments()->delete();
        $user->reactions()->delete();
        $user->friends()->detach();
        $user->delete();
        Auth::logout();
        return Inertia::render('Auth/Login', [
            'message' => 'Your account has been deleted and you have been logged out.'
        ]);
    }
    // Block
    public function block()
    {
        return inertia('Setting/Block');
    }
    // Language
    public function language(Request $request)
    {
        return inertia('Setting/Language', [
            'language' => $request->user()->language,
        ]);
    }
    public function updateLanguage(Request $request)
    {   
        $request->validate([
            'language' => 'required|in:en,vi',
        ]);

        $user = $request->user();
        $user->language = $request->language;
        $user->save();

        return back()->with('success', 'Language updated successfully!');
    }
    // Dark mode
    public function darkMode(Request $request)
    {
        return inertia('Setting/Darkmode');
    }
    public function updateDarkMode(Request $request)
    {
        $request->validate([
            'dark_mode' => 'required|in:light,dark',
        ]);

        $user = auth()->user();
        $user->update(['dark_mode' => $request->dark_mode]);

        return back();
    }
    // EmotionOptions
    public function emotionOptions()
    {
        return inertia('Setting/EmotionOptions');
    }
    // community
    public function community()
    {
        return inertia('Setting/Community');
    }
    // Privacy
    public function privacy()
    {
        return inertia('Setting/Privacy');
    }
    // TermOfService
    public function termOfService()
    {
        return inertia('Setting/TermOfService');
    }
    // Notification
    public function notification()
    {
        return inertia('Setting/Notification');
    }
}
