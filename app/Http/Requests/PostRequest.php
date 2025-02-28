<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'content' => 'required|string|max:1000', // Nội dung bài viết
            'status' => 'required|in:public,friend,private', // Trạng thái bài viết
            'image_url' => 'nullable|image|max:5120', // Tùy chọn ảnh đính kèm
        ];
    }
    public function messages()
    {
        return [
            'content.required' => 'Nội dung là bắt buộc.',
            'content.string' => 'Nội dung phải là một chuỗi.',
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.in' => 'Trạng thái phải là một trong các trạng thái sau: công khai, bạn bè, riêng tư.',
            'image_url.image' => 'Tệp tải lên phải là một ảnh.',
            'image_url.max' => 'Ảnh tải lên không được vượt quá 5MB.',
        ];
    }
}
