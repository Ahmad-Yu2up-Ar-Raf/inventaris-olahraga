<?php

use App\Http\Controllers\OverviewController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;


Route::get('/', [HomeController::class, 'index']);

Route::middleware(['auth', 'verified'])->group(function () {



 Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('/', OverviewController::class);
        
        // Elections routes
        Route::resource('barang', BarangController::class);
        Route::post('/barang/{barang}/status', [BarangController::class, 'statusUpdate'])->name('barang.status');
    });



});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
