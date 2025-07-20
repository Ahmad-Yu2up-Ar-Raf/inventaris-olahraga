<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\TipeBooth;
use App\StatusPaket;
use App\Enums\PaymentGateway;

class Paket extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama',
        'deskripsi',
        'tipe_booth',
        'luas_area',
        'lokasi_tersedia',
        'harga',
        'dp_minimum',
        'dp_percentage',
        'modal_minimum',
        'royalty_fee',
        'cicilan_tersedia',
        'tenor_cicilan',
        'bunga_cicilan',
        'cicilan_0_persen',
        'metode_pembayaran',
        'syarat_cicilan',
        'kontrak_minimum',
        'minimum_order',
        'fasilitas',
        'training_included',
        'support_marketing',
        'stok',
        'status',
        'berlaku_sampai',
        'is_featured',
        'gambar',
        'galeri_foto',
        'brosur_pdf',
        'video_url',
        'payment_methods',
        'installment_available',
        'installment_options',
        'payment_gateway',
        'gateway_config',
        'slug',
        'meta_description',
        'tags',
        'views',
        'rating',
        'total_sold',
    ];

    protected $casts = [
        'tipe_booth' => TipeBooth::class,
        'status' => StatusPaket::class,
        'payment_gateway' => PaymentGateway::class,
        'dp_percentage' => 'decimal:2',
        'harga' => 'decimal:2',
        'dp_minimum' => 'decimal:2',
        'modal_minimum' => 'decimal:2',
        'royalty_fee' => 'decimal:2',
        'luas_area' => 'decimal:2',
        'bunga_cicilan' => 'decimal:2',
        'rating' => 'decimal:2',
        'metode_pembayaran' => 'array',
        'fasilitas' => 'array',
        'training_included' => 'array',
        'galeri_foto' => 'array',
        'payment_methods' => 'array',
        'installment_options' => 'array',
        'gateway_config' => 'array',
        'tags' => 'array',
        'support_marketing' => 'boolean',
        'cicilan_0_persen' => 'boolean',
        'is_featured' => 'boolean',
        'installment_available' => 'boolean',
        'berlaku_sampai' => 'date',
        'views' => 'integer',
        'total_sold' => 'integer',
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
    //     return $this->hasMany(PaketOrder::class);
    // }

    /**
     * Scope untuk paket aktif
     */
    public function scopeActive($query)
    {
        return $query->where('status', StatusPaket::AKTIF);
    }

    /**
     * Scope untuk paket featured
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope untuk paket tersedia (stok > 0)
     */
    public function scopeAvailable($query)
    {
        return $query->where('stok', '>', 0);
    }

    /**
     * Scope untuk filter berdasarkan tipe booth
     */
    public function scopeByTipe($query, TipeBooth $tipe)
    {
        return $query->where('tipe_booth', $tipe);
    }

    /**
     * Scope untuk filter berdasarkan range harga
     */
    public function scopeByPriceRange($query, $min = null, $max = null)
    {
        if ($min) {
            $query->where('harga', '>=', $min);
        }
        if ($max) {
            $query->where('harga', '<=', $max);
        }
        return $query;
    }

    /**
     * Accessor untuk format harga
     */
    public function getFormattedHargaAttribute(): string
    {
        return 'Rp ' . number_format($this->harga, 0, ',', '.');
    }

    /**
     * Accessor untuk format DP
     */
    public function getFormattedDpAttribute(): string
    {
        return 'Rp ' . number_format($this->dp_minimum, 0, ',', '.');
    }

    /**
     * Accessor untuk sisa pembayaran
     */
    public function getSisaPembayaranAttribute(): float
    {
        return $this->harga - $this->dp_minimum;
    }

    /**
     * Accessor untuk format sisa pembayaran
     */
    public function getFormattedSisaPembayaranAttribute(): string
    {
        return 'Rp ' . number_format($this->sisa_pembayaran, 0, ',', '.');
    }

    /**
     * Check apakah paket bisa dibeli
     */
    public function canPurchase(): bool
    {
        return $this->status->canPurchase() && $this->stok > 0;
    }

    /**
     * Check apakah paket sedang promo
     */
    public function isPromo(): bool
    {
        return $this->berlaku_sampai && $this->berlaku_sampai->isFuture();
    }

    /**
     * Get URL gambar dengan fallback
     */
    public function getImageUrlAttribute(): string
    {
        return $this->gambar && asset('storage/' . $this->gambar) ;
    }

    /**
     * Get URL slug
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Increment views
     */
    public function incrementViews(): void
    {
        $this->increment('views');
    }

    /**
     * Update rating
     */
    public function updateRating(): void
    {
        // Logic untuk menghitung rating dari reviews
        // Bisa ditambahkan nanti jika ada sistem review
    }
}