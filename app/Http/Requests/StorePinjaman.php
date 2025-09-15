<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StorePinjaman extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    // public function authorize(): bool
    // {
    //     return Auth::check();
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
              'barang_id' => 'required|integer|min:1',
        'nama' => 'required|unique:pinjaman,nama|max:255|string',
        'tanggal_dipinjam'  =>  'required|date|after_or_equal:today',
        'tanggal_dikembalikan' => 'required|date|after_or_equal:tanggal_dipinjam',
        'jumlah_pinjaman' => 'required|integer|min:1',
          
        ];
    }
}
