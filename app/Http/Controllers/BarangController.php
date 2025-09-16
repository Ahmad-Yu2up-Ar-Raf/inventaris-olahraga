<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBarang;
use App\Http\Requests\UpdateBarang;
use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');
           $page = $request->input('page', 1);

        $status = $request->input('status');
        $query = Barang::where('user_id', Auth::id())->with('pinjaman');

     if ($search) {
            $query->where(function($q) use ($search) {
                $searchLower = strtolower($search);
                $q->whereRaw('LOWER(nama) LIKE ?', ["%{$searchLower}%"])
                  ->orWhereRaw('LOWER(deskripsi) LIKE ?', ["%{$searchLower}%"]);
            });
        }

        // FIX: Multiple status filter
        if ($status) {
            if (is_array($status)) {
                $query->whereIn('status', $status);
            } else if (is_string($status)) {
                $statusArray = explode(',', $status);
                $query->whereIn('status', $statusArray);
            }
        }


       $barang = $query->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

       $barang->through(function($item) {
            return [
                ...$item->toArray(),
                'gambar' => $item->gambar ? url($item->gambar) : null
            ];
        });
        return Inertia::render('dashboard/barang', [
            'barang' => $barang->items() ?? [],
         'filters' => [
                'search' => $search ?? '',
              
                'status' => $status ?? [],
                
            ],
            'pagination' => [
                'data' => $barang->toArray(),
                'total' => $barang->total(),
                'currentPage' => $barang->currentPage(),
                'perPage' => $barang->perPage(),
                'lastPage' => $barang->lastPage(),
         
     
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBarang $request)
    {
        try {

            
                    $gambarPath = null;
    if (request()->hasFile('gambar')) {
            $file = request()->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads/', $filename, 'public');
            $gambarPath = 'storage/' . $path;
        }
            // Observer akan handle file upload sebaranga otomatis
            $barang = Barang::create([
                ...$request->validated(),
                'user_id' => Auth::id(),
                    'gambar' => $gambarPath,
            ]);

            $fileCount = count($barang->files ?? []);
            $message = $fileCount > 0 
                ? "Barang berhasil ditambahkan dengan {$fileCount} file."
                : "Barang berhasil ditambahkan.";

            return redirect()->route('dashboard.barang.index')
                ->with('success', $message);

        } catch (\Exception $e) {
            Log::error('Barang creation error: ' . $e->getMessage());
            
            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()
            ]);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(Barang $barang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barang $barang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBarang $request, Barang $barang)
    {
        try {
           
                $updateData = [
             'nama' => $request['nama'],
  
           
            'deskripsi' => $request['deskripsi'],

            'status' => $request['status'],
            'visibility' => $request['visibility'],
            'quantity' => $request['quantity'],
        
    
           
        ];

 if (request()->hasFile('gambar')) {
            Log::info('New gambar file detected');
            
            // Hapus gambar lama jika ada
            if ( $barang->gambar && Storage::disk('public')->exists(str_replace('storage/', '',  $barang->gambar))) {
                Storage::disk('public')->delete(str_replace('storage/', '',  $barang->gambar));
                Log::info('Old gambar deleted: ' .  $barang->gambar);
            }
            
            // Upload gambar baru
            $file = request()->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $filename, 'public');
            $updateData['gambar'] = 'storage/' . $path;
            
            Log::info('New gambar uploaded: ' . $updateData['gambar']);
        } else {
            Log::info('No new gambar file, keeping existing gambar');
            // Jika tidak ada file baru, pertahankan gambar yang sudah ada
            // Tidak perlu menambahkan 'gambar' ke updateData agar tidak mengganti dengan null
        }






            $barang->update($updateData);

            $fileCount = count($barang->files ?? []);
            $message = request()->hasFile('files') || request()->has('files')
                ? "Merchandise berhasil diupdate dengan {$fileCount} file."
                : "Merchandise berhasil diupdate.";

            return redirect()->route('dashboard.barang.index')
                ->with('success', $message);

        } catch (\Exception $e) {
            Log::error('Merchandise update error: ' . $e->getMessage());
            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat mengupdate data: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        
        $ids = $request->input('ids');
        if (empty($ids)) {
            return redirect()->route('dashboard.barang.index')
                ->with('error', 'Tidak ada event yang dipilih untuk dihapus.');
        }

        // Validasi apakah semua ID milik user yang sedang login
        $barang = Barang::whereIn('id', $ids)->where('user_id', Auth::id())->get();
        if ($barang->count() !== count($ids)) {
            return redirect()->route('dashboard.barang.index')
                ->with('error', 'Unauthorized access atau event tidak ditemukan.');
        }

        try {
            DB::beginTransaction();
              
            // SOLUSI: Delete satu per satu agar Observer terpicu
            foreach ($barang as $event) {
                if ($event->gambar && Storage::disk('public')->exists(str_replace('storage/', '', $event->gambar))) {
                    Storage::disk('public')->delete(str_replace('storage/', '', $event->gambar));
                }
        
                $event->delete(); // Ini akan trigger observer barang
            }
            
            DB::commit();

            $deletedCount = $barang->count();
            return redirect()->route('dashboard.barang.index')
                ->with('success', "{$deletedCount} Barang berhasil dihapus beserta semua file terkait.");

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Barang deletion error: ' . $e->getMessage());
            return redirect()->route('dashboard.barang.index')
                ->with('error', 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage());
        }
    }

    public function statusUpdate(Request $request)
    {
        
        $ids = $request->input('ids');
        $value = $request->input('value');
        $colum = $request->input('colum');

        if (empty($ids)) {
            return redirect()->route('dashboard.barang.index')
                ->with('error', 'Tidak ada event yang dipilih untuk dihapus.');
        }

        // Validasi apakah semua ID milik user yang sedang login
        $barang = Barang::whereIn('id', $ids)->where('user_id', Auth::id())->get();
        if ($barang->count() !== count($ids)) {
            return redirect()->route('dashboard.barang.index')
                ->with('error', 'Unauthorized access atau event tidak ditemukan.');
        }

        try {
            DB::beginTransaction();
              
             foreach ($barang as $event) {
                $event->update([$colum => $value]);
            }

   

            
            
            DB::commit();
            

            $deletedCount = $barang->count();
            return redirect()->route('dashboard.barang.index')
                ->with('success', "{$deletedCount} Barang berhasil dihapus beserta semua file terkait.");

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Barang deletion error: ' . $e->getMessage());
            return redirect()->route('dashboard.barang.index')
                ->with('error', 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage());
        }
    }
}
