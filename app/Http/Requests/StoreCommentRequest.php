<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules()
    {
        return [
            'content' => 'nullable|string|min:5|max:1000|required_without:image_url',
            'image_url' => 'nullable|url|required_without:content',
            'parent_id' => 'nullable|exists:comments,id'
        ];
    }
}
