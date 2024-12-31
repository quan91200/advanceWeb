<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        // Cho phép tất cả người dùng chỉnh sửa thông tin của mình
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email,' . $this->route('user')->id,
            'password' => 'nullable|min:8|confirmed',
            'profile_pic' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}