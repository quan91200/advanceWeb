<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        return [
            'content' => 'required|string|max:1000',  
            'status' => 'required|in:public,private,friend',  
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',  
        ];
    }
}