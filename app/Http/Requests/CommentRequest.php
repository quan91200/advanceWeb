<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'content' => 'required|string|max:1000',  // Nội dung bình luận, tối đa 1000 ký tự
            'post_id' => 'required|exists:posts,id',  // Kiểm tra bài đăng tồn tại
            'parent_id' => 'nullable|exists:comments,id',  // Nếu là trả lời bình luận, kiểm tra parent_id có tồn tại
            'image_url' => 'nullable|image|max:5120',
        ];
    }
    public function messages()
    {
        return [
            'content.required' => 'Nội dung bình luận là bắt buộc.',
            'content.max' => 'Nội dung bình luận không được vượt quá 1000 ký tự.',
            'post_id.required' => 'Bài viết là bắt buộc.',
            'post_id.exists' => 'Bài viết không tồn tại.',
            'parent_id.exists' => 'Bình luận trả lời không tồn tại.',
            'image_url.image' => 'Tệp tải lên phải là một ảnh.',
            'image_url.max' => 'Ảnh tải lên không được vượt quá 5MB.',
        ];
    }
}
