<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        // Cho phép tất cả người dùng tạo tài khoản
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|unique:users|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
            'profile_pic' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}