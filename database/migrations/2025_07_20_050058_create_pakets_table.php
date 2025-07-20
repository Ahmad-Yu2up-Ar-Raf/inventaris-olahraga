<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pakets', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            
            // Relasi
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Informasi dasar paket
            $table->string('nama')->unique();
            $table->text('deskripsi');
            $table->enum('tipe_booth', ['kecil', 'sedang', 'besar', 'premium'])->default('sedang');
            $table->decimal('luas_area', 8, 2); // dalam m²
            $table->string('lokasi_tersedia');
            
            // Harga dan pembayaran
            $table->decimal('harga', 15, 2);
            $table->decimal('dp_minimum', 15, 2);
            $table->decimal('dp_percentage', 5, 2)->default(30.00); // 30%
            $table->decimal('modal_minimum', 15, 2)->nullable();
            $table->decimal('royalty_fee', 5, 2)->nullable(); // dalam persen
            
            // Cicilan dan pembayaran
            $table->integer('cicilan_tersedia')->default(1); // 1 = lunas langsung
            $table->integer('tenor_cicilan')->nullable(); // dalam bulan
            $table->decimal('bunga_cicilan', 5, 2)->nullable(); // per bulan
            $table->boolean('cicilan_0_persen')->default(false);
            $table->json('metode_pembayaran'); // payment methods
            $table->text('syarat_cicilan')->nullable();
            
            // Kontrak dan persyaratan
            $table->integer('kontrak_minimum'); // dalam bulan
            $table->integer('minimum_order')->default(1);
            
            // Fasilitas dan support
            $table->json('fasilitas'); // peralatan, furniture
            $table->json('training_included'); // jenis pelatihan
            $table->boolean('support_marketing')->default(true);
            
            // Stok dan ketersediaan
            $table->integer('stok');
            $table->enum('status', ['aktif', 'nonaktif', 'habis', 'coming_soon'])->default('aktif');
            $table->date('berlaku_sampai')->nullable(); // untuk promo terbatas
            $table->boolean('is_featured')->default(false); // paket unggulan
            
            // Media dan dokumentasi
            $table->string('gambar')->nullable(); // gambar utama
            $table->json('galeri_foto')->nullable(); // multiple photos
            $table->string('brosur_pdf')->nullable(); // file brosur
            $table->string('video_url')->nullable(); // video promosi
            
            // Payment Gateway
            $table->json('payment_methods'); // config payment gateway
            $table->boolean('installment_available')->default(false);
            $table->json('installment_options')->nullable(); // opsi cicilan gateway
            $table->string('payment_gateway')->nullable(); // midtrans, xendit
            $table->json('gateway_config')->nullable(); // config khusus
            
            // SEO dan marketing
            $table->string('slug')->unique()->nullable(); // untuk URL friendly
            $table->text('meta_description')->nullable();
            $table->json('tags')->nullable(); // tags untuk filter
            $table->integer('views')->default(0); // tracking views
            $table->decimal('rating', 3, 2)->default(0.00); // rating 0-5
            $table->integer('total_sold')->default(0); // total terjual
            
            // Indexes
            $table->index(['status', 'tipe_booth']);
            $table->index(['harga', 'status']);
            $table->index('is_featured');
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pakets');
    }
};