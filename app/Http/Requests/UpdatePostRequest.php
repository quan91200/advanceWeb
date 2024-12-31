<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    public function authorize()
    {
        return true;  // Chấp nhận yêu cầu từ tất cả người dùng (hoặc bạn có thể thay đổi để kiểm tra quyền truy cập)
    }

    public function rules()
    {
        return [
            'content' => 'nullable|string|max:1000',  // Nội dung bài đăng, tối đa 1000 ký tự (có thể bỏ trống khi cập nhật)
            'status' => 'required|in:public,private,friend',  // Trạng thái bài đăng
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',  // Ảnh, tối đa 5MB
        ];
    }

    public function messages()
    {
        return [
            'content.required' => 'Nội dung bài đăng là bắt buộc.',
            'status.required' => 'Trạng thái bài đăng là bắt buộc.',
            'image_url.image' => 'File tải lên phải là một hình ảnh.',
            'image_url.max' => 'Ảnh phải có kích thước tối đa 5MB.',
        ];
    }
}