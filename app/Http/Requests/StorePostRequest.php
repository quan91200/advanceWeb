<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize()
    {
        return true;  // Chấp nhận yêu cầu từ tất cả người dùng (hoặc bạn có thể thay đổi để kiểm tra quyền truy cập)
    }

    public function rules()
    {
        return [
            'content' => 'required|string|max:1000',  // Nội dung bài đăng, tối đa 1000 ký tự
            'status' => 'required|in:public,private,friend',  // Trạng thái bài đăng
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',  // Ảnh, tối đa 5MB
        ];
    }
}