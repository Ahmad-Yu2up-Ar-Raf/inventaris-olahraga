<?php

use App\Http\Controllers\OverviewController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PinjamanController;
use App\Http\Controllers\BarangPageController;
use Illuminate\Support\Facades\Route;


Route::get('/', [HomeController::class, 'index']);





Route::middleware(['auth', 'verified'])->group(function () {



 Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('/', OverviewController::class);
        Route::resource('barang', BarangController::class);
        Route::resource('pinjaman', PinjamanController::class);
        Route::post('/barang/{barang}/status', [BarangController::class, 'statusUpdate'])->name('barang.status');
        Route::post('/pinjaman/{pinjaman}/status', [PinjamanController::class, 'statusUpdate'])->name('pinjaman.status');
    });

});
Route::prefix('barang')->name('barang.')->group(function () {
    Route::get('/', [BarangPageController::class, 'index'])->name('index');
    Route::post('/', [BarangPageController::class, 'store'])->name('store');
    Route::get('/{barang}', [BarangPageController::class, 'show'])->name('show');

});





require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
