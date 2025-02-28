<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'phone_number' => 'nullable|string|max:20',
            'dob' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'job' => 'nullable|string|max:100',
            'relationship' => 'nullable|string|max:50',
            'bio' => 'nullable|string',
            'location_id' => 'nullable|exists:locations,id',
        ];
    }
    public function messages()
    {
        return [
            'phone_number.max' => 'Số điện thoại không được dài quá 20 ký tự.',
            'dob.date' => 'Ngày sinh không hợp lệ.',
            'gender.in' => 'Giới tính không hợp lệ.',
            'job.max' => 'Công việc không được dài quá 100 ký tự.',
            'relationship.max' => 'Mối quan hệ không được dài quá 50 ký tự.',
            'location_id.exists' => 'Địa điểm không tồn tại.',
        ];
    }
}
