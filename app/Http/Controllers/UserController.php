<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;  
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // Hiển thị danh sách tất cả người dùng
    public function index()
    {
        $users = User::all();  
        return UserResource::collection($users);  
    }

    // Hiển thị form tạo người dùng mới
    public function create()
    {
        return view('users.create');
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        // Nếu có ảnh đại diện mới, lưu ảnh
        $profilePic = $request->file('profile_pic') 
            ? $request->file('profile_pic')->store('images', 'public') 
            : null;

        // Tạo người dùng mới
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'profile_pic' => $profilePic,
            'role' => $validated['role'] ?? 'user', 
        ]);

        return redirect()->route('users.index');
    }

    // Hiển thị form chỉnh sửa thông tin người dùng
    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();

        // Nếu có ảnh đại diện mới, lưu ảnh và xóa ảnh cũ
        if ($request->hasFile('profile_pic')) {
            // Xóa ảnh cũ nếu có
            if ($user->profile_pic) {
                Storage::delete('public/' . $user->profile_pic);
            }
            // Lưu ảnh mới
            $profilePic = $request->file('profile_pic')->store('images', 'public');
        } else {
            // Giữ nguyên ảnh cũ nếu không có ảnh mới
            $profilePic = $user->profile_pic;
        }

        // Cập nhật thông tin người dùng
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'] ? bcrypt($validated['password']) : $user->password,
            'profile_pic' => $profilePic,
        ]);

        return redirect()->route('users.index');
    }

    // Xóa người dùng
    public function destroy(User $user)
    {
        // Xóa ảnh đại diện nếu có
        if ($user->profile_pic) {
            Storage::delete('public/' . $user->profile_pic);
        }
        $user->delete();

        return redirect()->route('users.index');
    }

    // Lấy ảnh đại diện của người dùng
    public function getProfilePic($user)
    {
        // Kiểm tra xem người dùng có avatar không
        if ($user->profile_pic) {
            return Storage::url($user->profile_pic);
        }
        // Nếu không có avatar -> ảnh mặc định
        return asset('images/default.png');
    }
}