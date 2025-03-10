<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FriendRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    // Xác thực dữ liệu đầu vào cho yêu cầu.
    public function rules(): array
    {
        return [
            'friend_id' => 'required|exists:users,id',
            'status' => 'required|in:pending,accepted,blocked',
        ];
    }
    public function messages()
    {
        return [
            'friend_id.required' => 'Bạn phải chọn một người bạn.',
            'friend_id.exists' => 'Người bạn không tồn tại.',
            'status.required' => 'Trạng thái quan hệ bạn bè là bắt buộc.',
            'status.in' => 'Trạng thái chỉ có thể là pending, accepted, hoặc blocked.',
        ];
    }
}
