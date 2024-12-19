<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
     // Hiển thị danh sách người dùng
     public function index()
     {
         $users = User::all();
         return view('users.index', compact('users'));
     }
 
     // Hiển thị form tạo người dùng
     public function create()
     {
         return view('users.create');
     }
 
     // Lưu người dùng vào cơ sở dữ liệu
     public function store(Request $request)
     {
         $request->validate([
             'name' => 'required|string',
             'email' => 'required|email|unique:users',
             'password' => 'required|min:8|confirmed',
         ]);
 
         $user = User::create([
             'name' => $request->name,
             'email' => $request->email,
             'password' => bcrypt($request->password),
         ]);
 
         return redirect()->route('users.index');
     }
 
     // Hiển thị thông tin người dùng
     public function show($id)
     {
         $user = User::findOrFail($id);
         return view('users.show', compact('user'));
     }
 
     // Hiển thị form chỉnh sửa người dùng
     public function edit($id)
     {
         $user = User::findOrFail($id);
         return view('users.edit', compact('user'));
     }
 
     // Cập nhật người dùng
     public function update(Request $request, $id)
     {
         $request->validate([
             'name' => 'required|string',
             'email' => 'required|email|unique:users,email,' . $id,
         ]);
 
         $user = User::findOrFail($id);
         $user->update($request->only('name', 'email'));
 
         return redirect()->route('users.index');
     }
 
     // Xóa người dùng
     public function destroy($id)
     {
         $user = User::findOrFail($id);
         $user->delete();
 
         return redirect()->route('users.index');
     }
}
