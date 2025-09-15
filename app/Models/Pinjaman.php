<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pinjaman extends Model
{
    use HasFactory;

    protected $table = 'pinjaman';
    protected $fillable = [
        'barang_id',
        'nama',
        'tanggal_dipinjam',
        'tanggal_dikembalikan',
        'jumlah_pinjaman',
        
    ];

    protected $casts = [
    'barang_id' => 'integer',
        'nama' => 'string' ,
        'tanggal_dipinjam' => 'date',
        'tanggal_dikembalikan' => 'date',
        'jumlah_pinjaman' => 'integer',
     
    ];


    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class, 'barang_id');
    }
    
}
