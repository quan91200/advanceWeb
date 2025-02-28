<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserHobbyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id', // Kiểm tra người dùng tồn tại
            'hobby_id' => 'required|exists:hobbies,id', // Kiểm tra sở thích tồn tại
        ];
    }
    public function messages()
    {
        return [
            'user_id.required' => 'Người dùng là bắt buộc.',
            'user_id.exists' => 'Người dùng không tồn tại.',
            'hobby_id.required' => 'Sở thích là bắt buộc.',
            'hobby_id.exists' => 'Sở thích không tồn tại.',
        ];
    }
}
