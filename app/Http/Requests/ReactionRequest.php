<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'reaction_type_id' => 'required|exists:reaction_types,id', 
            'reactable_id' => 'required|exists:posts,id|exists:comments,id',
            'reactable_type' => 'required|string|in:post,comment', // Kiểu đối tượng (post hoặc comment)
        ];
    }
    public function messages()
    {
        return [
            'reaction_type_id.required' => 'Loại phản ứng là bắt buộc.',
            'reaction_type_id.exists' => 'Loại phản ứng không tồn tại.',
            'reactable_id.required' => 'Đối tượng phản ứng là bắt buộc.',
            'reactable_id.exists' => 'Đối tượng phản ứng không tồn tại.',
            'reactable_type.required' => 'Kiểu đối tượng phản ứng là bắt buộc.',
            'reactable_type.in' => 'Kiểu đối tượng phản ứng phải là post hoặc comment.',
        ];
    }
}
