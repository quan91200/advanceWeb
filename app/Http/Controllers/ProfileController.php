<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        // Giữ ảnh cũ nếu không có ảnh mới
        $profilePicPath = $user->profile_pic;
        if ($request->hasFile('profile_pic')) {
            // Xóa ảnh cũ nếu tồn tại
            if ($user->profile_pic && Storage::exists('public/' . $user->profile_pic)) {
                Storage::delete('public/' . $user->profile_pic);
            }

            // Lưu ảnh mới với tên duy nhất (đặt theo thời gian)
            $profilePicPath = $request->file('profile_pic')->storeAs(
                'images',
                time() . '.' . $request->file('profile_pic')->getClientOriginalExtension(),
                'public'
            );
        } elseif (!$user->profile_pic) {
            $profilePicPath = 'images/default.png';
        }
        // Cập nhật thông tin người dùng
        $user->fill($request->except('profile_pic'));
        // Gán ảnh mới hoặc giữ ảnh cũ
        $user->profile_pic = $profilePicPath;
        // Xóa xác minh email nếu email được thay đổi
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();
        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request): RedirectResponse
    {
        // Xác thực mật khẩu hiện tại
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);
        $user = $request->user();
        // Xóa ảnh hồ sơ nếu tồn tại
        if ($user->profile_pic && Storage::exists('public/' . $user->profile_pic)) {
            Storage::delete('public/' . $user->profile_pic);
        }
        Auth::logout();
        $user->delete();
        // Invalidate session và tạo token mới
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Redirect::to('/');
    }
}