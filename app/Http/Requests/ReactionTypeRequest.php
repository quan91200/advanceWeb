<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReactionTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:50|unique:reaction_types,name', 
            'icon' => 'required|string', 
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Tên loại phản ứng là bắt buộc.',
            'name.unique' => 'Tên loại phản ứng đã tồn tại.',
            'icon.required' => 'Biểu tượng loại phản ứng là bắt buộc.',
        ];
    }
}
