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
        Schema::create('pinjaman', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('barang_id')->constrained('barang')->onDelete('cascade');
            $table->string('nama')->unique();
            $table->date('tanggal_dipinjam')->nullable();
            $table->date('tanggal_dikembalikan')->nullable();
            $table->integer('jumlah_pinjaman')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pinjaman');
    }
};
