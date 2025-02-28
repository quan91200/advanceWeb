<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocationRequest extends FormRequest
{
    // Xác định liệu người dùng có quyền thực hiện yêu cầu này hay không.
    public function authorize()
    {
        return true; // Đảm bảo rằng yêu cầu được phép thực hiện (có thể thay đổi tùy theo quyền hạn)
    }
    // Xác thực dữ liệu đầu vào cho yêu cầu.
    public function rules()
    {
        return [
            'country_code' => 'required|string|max:10',
            'country_name' => 'required|string|max:100',
            'city' => 'nullable|string|max:100',
        ];
    }
    // Thông báo lỗi tùy chỉnh nếu có lỗi xác thực.
    public function messages()
    {
        return [
            'country_code.required' => 'Mã quốc gia là bắt buộc.',
            'country_name.required' => 'Tên quốc gia là bắt buộc.',
            'city.string' => 'Tên thành phố phải là chuỗi ký tự.',
        ];
    }
}
