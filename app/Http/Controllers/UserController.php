<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;  
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        $query = User::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request('sort_direction','desc');
        if (request('name')) {
            $query->where('name','like','%'. request('name') .'%');
        }
        if (request('email')) {
            $query->where('email','like','%'. request('email') .'%');
        }
        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);  
            return inertia("User/Index", [
                "users" => UserResource::collection($users),
                'queryParams' => request()->query() ?: null,
                'success' => session('success'),
            ]); 
    }

    // Hiển thị form tạo người dùng mới
    public function create()
    {
        return view('users.create');
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = now();  
        $data['password'] = bcrypt($data['password']);
        if ($request->hasFile('profile_pic')) {
            $data['profile_pic'] = $request->file('profile_pic')->store('images', 'public');
        }
        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'profile_pic' => $data['profile_pic'] ?? null, 
            'role' => $data['role'] ?? 'user', 
            'email_verified_at' => $data['email_verified_at'], 
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
        $data = $request->validated();
        if (isset($data['password']) && $data['password']) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);  
        }
        if ($request->hasFile('profile_pic')) {
            if ($user->profile_pic) {
                Storage::delete('public/' . $user->profile_pic);
            }
            $data['profile_pic'] = $request->file('profile_pic')->store('images', 'public');
        }
        $user->update($data);
        return redirect()->route('users.index');
    }
    // Xóa người dùng
    public function destroy(User $user)
    {
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