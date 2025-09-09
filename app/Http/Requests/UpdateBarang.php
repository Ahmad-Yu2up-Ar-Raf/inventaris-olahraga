<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateBarang extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {   

        $eventId = $this->route('barang')->id;

        return [
            'nama' => 'required|unique:barang,nama,' . $eventId . ' |max:255|string',
           'gambar' => 'required|image|mimes:jpg,png,jpeg|max:2048|dimensions:min_width=100,min_height=100',
         
            'deskripsi' => 'nullable|string',
            'lab' => 'nullable|string',
     
            'status' => 'nullable|string',
            

            
            'quantity' => 'nullable|integer|min:1',
            

        ];
    }
}
