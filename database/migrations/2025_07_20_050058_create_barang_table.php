<?php

use App\Enums\BarangStatus;
use App\Enums\VisibilityEnums;
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
            
            
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nama')->unique();
            $table->text('deskripsi');
            $table->string('status')->default(BarangStatus::Tersedia->value);
            $table->string('visibility')->default(VisibilityEnums::Public->value);
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