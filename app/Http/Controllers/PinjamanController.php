<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePinjaman;
use App\Models\Barang;
use App\Models\Pinjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PinjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');
           $page = $request->input('page', 1);

        // $status = $request->input('status');
        $query = Pinjaman::orderBy('created_at', 'desc')->with('barang');

     if ($search) {
            $query->where(function($q) use ($search) {
                $searchLower = strtolower($search);
                $q->whereRaw('LOWER(peminjam_id) LIKE ?', ["%{$searchLower}%"])
                  ->orWhereRaw('LOWER(pinjaman_id) LIKE ?', ["%{$searchLower}%"]);
            });
        }



       $pinjaman = $query->paginate($perPage, ['*'], 'page', $page);

       $pinjaman->through(function($item) {
            return [
                ...$item->toArray(),
             
            ];
        });
        return Inertia::render('dashboard/pinjaman', [
            'pinjaman' => $pinjaman->items() ?? [],
         'filters' => [
                'search' => $search ?? '',
              
                'status' => $status ?? [],
                
            ],
            'pagination' => [
                'data' => $pinjaman->toArray(),
                'total' => $pinjaman->total(),
                'currentPage' => $pinjaman->currentPage(),
                'perPage' => $pinjaman->perPage(),
                'lastPage' => $pinjaman->lastPage(),
         
     
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
    public function store(StorePinjaman $request)
    {
         
    }

    /**
     * Display the specified resource.
     */
    public function show(Pinjaman $pinjaman)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pinjaman $pinjaman)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pinjaman $pinjaman)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
   public function destroy(Request $request)
    {
        
        $ids = $request->input('ids');
        if (empty($ids)) {
            return redirect()->route('dashboard.pinjaman.index')
                ->with('error', 'Tidak ada event yang dipilih untuk dihapus.');
        }

        // Validasi apakah semua ID milik user yang sedang login
        $pinjaman = Pinjaman::whereIn('id', $ids)->get();
        if ($pinjaman->count() !== count($ids)) {
            return redirect()->route('dashboard.pinjaman.index')
                ->with('error', 'Unauthorized access atau event tidak ditemukan.');
        }

        try {
            DB::beginTransaction();
              
            // SOLUSI: Delete satu per satu agar Observer terpicu
            foreach ($pinjaman as $event) {
          
        
                $event->delete(); // Ini akan trigger observer pinjaman
            }
            
            DB::commit();

            $deletedCount = $pinjaman->count();
            return redirect()->route('dashboard.pinjaman.index')
                ->with('success', "{$deletedCount} Pinjaman berhasil dihapus beserta semua file terkait.");

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Pinjaman deletion error: ' . $e->getMessage());
            return redirect()->route('dashboard.pinjaman.index')
                ->with('error', 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage());
        }
    }

       public function statusUpdate(Request $request)
    {
        
        $ids = $request->input('ids');
        $value = $request->input('value');
        $column = $request->input('column');

        if (empty($ids)) {
            return redirect()->route('dashboard.pinjaman.index')
                ->with('error', 'Tidak ada event yang dipilih untuk dihapus.');
        }

        $pinjaman = Pinjaman::whereIn('id', $ids)->get();
        if ($pinjaman->count() !== count($ids)) {
            return redirect()->route('dashboard.pinjaman.index')
                ->with('error', 'Unauthorized access atau event tidak ditemukan.');
        }

        try {
            DB::beginTransaction();
              

$pinjamanBarangIds = $pinjaman->pluck('barang_id')->toArray();

             foreach ($pinjaman as $event) {
            
                $event->update([$column => $value]);
            }

     $barang = Barang::whereIn('id', $pinjamanBarangIds)->where('user_id', Auth::id())->get();

                
             foreach ($barang as $event) {


                if($value === 'approve'){

                    $event->update(['status' => 'dipinjam']);
                }else{
                    $event->update(['status' => 'tersedia']);


                }
            }
            
            DB::commit();
            

            $deletedCount = $pinjaman->count();
            return redirect()->route('dashboard.pinjaman.index')
                ->with('success', "{$deletedCount} Pinjaman berhasil dihapus beserta semua file terkait.");

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Pinjaman deletion error: ' . $e->getMessage());
            return redirect()->route('dashboard.pinjaman.index')
                ->with('error', 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage());
        }
    }
}
