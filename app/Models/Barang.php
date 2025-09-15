<?php

namespace App\Models;

use App\Enums\BarangStatus;
use App\Enums\VisibilityEnums;
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
        
    ];

    protected $casts = [
        'nama' => 'string',
        'gambar' => 'string',
        'deskripsi' => 'string',
        'quantity' => 'integer',
        'status' => BarangStatus::class,
        'visibility' => VisibilityEnums::class,
     
    ];

    /**
     * Relasi ke User (Admin yang input)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}