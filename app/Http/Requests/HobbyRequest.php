<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HobbyRequest extends FormRequest
{
    // Xác định liệu người dùng có quyền thực hiện yêu cầu này hay không.
    public function authorize(): bool
    {
        return true;
    }
    // Xác thực dữ liệu đầu vào cho yêu cầu.
    public function rules()
    {
        return [
            'name' => 'required|string|unique:hobbies,name|max:20', // Tên sở thích là bắt buộc
            'description' => 'nullable|string|max:100', // Mô tả sở thích là tùy chọn
        ];
    }
    // Thông báo lỗi tùy chỉnh nếu có lỗi xác thực.
    public function messages()
    {
        return [
            'name.required' => 'Tên sở thích là bắt buộc.',
            'name.unique' => 'Tên sở thích là duy nhất',
            'name.max' => 'Tên sở thích không được vượt quá 20 ký tự.',
            'description.max' => 'Mô tả không được vượt quá 100 ký tự.',
        ];
    }
}
