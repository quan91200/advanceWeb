<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        if ($this->isMethod('get')) {
            return []; // Không kiểm tra validation khi GET
        }
        return [
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'password' => 'required|min:8|confirmed',
            'language' => 'required|in:en,vi',
            'dark_mode' => 'required|in:light,dark',
        ];
    }
}
