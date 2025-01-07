<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;  
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
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
        if (request()->has('dark_mode')) {
            session(['dark_mode' => request('dark_mode')]);
        }
        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);  
        $darkMode = auth()->user()->dark_mode ?? false;
        $language = auth()->user()->language ??'en';
        return inertia("User/Index", [
            "user" => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'dark_mode' => $darkMode,
            'language' => $language,
        ]); 
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
        return redirect()->route('user.index');
    }
    public function show($id)
    {
        $user = User::with(['sessions', 'posts', 'comments'])
            ->withCount(['posts', 'comments', 'sessions'])
            ->findOrFail($id);
        return inertia('User/Show', [
            'user' => new UserResource($user),
        ]);
    }
    public function edit(User $user)
    {
        return inertia('User/Edit',[
            'user' => new UserResource($user),
        ]);
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
        return redirect()->route('user.show', ['user' => auth()->id()]);
    }
    public function destroy(User $user)
    {
        if ($user->profile_pic) {
            Storage::delete('public/' . $user->profile_pic);
        }
        $user->delete();

        return redirect()->route('users.index');
    }
    public function getProfilePic($user)
    {
        if ($user->profile_pic) {
            return Storage::url($user->profile_pic);
        }
        return asset('storage/public/images/default.png');
    }
    // Darkmode
    public function updateDarkmode(Request $request)
    {
        $request->validate([
            'dark_mode' => 'required|boolean',
        ]);
        $user = auth()->user();
        $user->dark_mode = $request->dark_mode;
        $user->save();
        return response()->json([
            'message' => 'Dark mode updated successfully.',
            'dark_mode' => $user->dark_mode,
        ]);
    }
    // Multiple Language
    public function updateLanguage(Request $request)
    {
        $request->validate([
            'language' => 'required|string|in:en,vn',
        ]);

        $user = auth()->user();
        $user->language = $request->language;
        $user->save();

        return response()->json(['message' => 'Language updated successfully!']);
    }
}