<?php

namespace App\Models;

use App\Enums\BarangStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Barang extends Model
{
    use HasFactory;

    protected $table = 'barang';
    protected $fillable = [
        'user_id',
        'nama',
        'deskripsi',
        'status',
        'quantity',
        'gambar',
        'lab',
        
    ];

    protected $casts = [
        'nama' => 'string',
        'gambar' => 'string',
        'lab' => 'string',
        'deskripsi' => 'string',
        'quantity' => 'integer',
        'status' => BarangStatus::class,
     
    ];

    /**
     * Relasi ke User (Admin yang input)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke Orders
     */
    // public function orders(): HasMany
    // {
    //     return $this->hasMany(BarangOrder::class);
    // }

    /**
     * Scope untuk barang aktif
     */
 
}