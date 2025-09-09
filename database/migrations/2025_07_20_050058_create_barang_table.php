<?php

use App\Enums\BarangStatus;
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
        Schema::create('barang', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            
            // Relasi
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Informasi dasar barang
            $table->string('nama')->unique();
            $table->string('lab');
            $table->text('deskripsi');
            $table->string('status')->default(BarangStatus::class);
            $table->integer('quantity')->default(1);
            $table->string('gambar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barang');
    }
};