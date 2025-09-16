<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Pinjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
  $recordBarang = Barang::all()->where('user_id', Auth::id());
  
  $queryBarangIds = $recordBarang->pluck('id')->toArray();
   $recordPinjaman = Pinjaman::all()->whereIn('barang_id', $queryBarangIds );

  $barangCounts = Barang::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as barang'))
            ->where('user_id', Auth::id())
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date');

        $pinjamanCounts = Pinjaman::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as pinjaman'))
            ->whereIn('barang_id', $queryBarangIds )
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date');

   

        // Gabungkan data barang dan pinjaman berdasarkan tanggal
        $allDates = collect($barangCounts->keys())->merge($pinjamanCounts->keys())->unique();
        
        $counts = $allDates->map(function ($date) use ($barangCounts, $pinjamanCounts) {
            return [
                'date' => $date,
                'barang' => $barangCounts->get($date)->barang ?? 0,
                'pinjaman' => $pinjamanCounts->get($date)->pinjaman ?? 0,
               
            ];
        })->values();




$statusCount = $recordBarang->groupBy('status')->map(function ($group) {
    return $group->count();   });
$StatusPinjamanCount = $recordPinjaman->groupBy('status')->map(function ($group) {
    return $group->count();   });
$StatusBarangVisibilityCount = $recordBarang->groupBy('visibility')->map(function ($group) {
    return $group->count();   });

  $totalBarang = Barang::where('user_id', Auth::id())->count();
  $totalBarangDipinjam = Barang::where('user_id', Auth::id())->where('status', 'dipinjam')->count();


  $totalPinjaman = Pinjaman::whereIn('barang_id', $queryBarangIds )->count();
  $terjualPinjaman = Pinjaman::whereIn('barang_id', $queryBarangIds )->where('status', 'approve')->count();

          return Inertia::render('dashboard/index',[
                'reports' => [
                    'totalBarang' => $totalBarang,

                    'totalPinjaman' => $totalPinjaman,
                    'totalPinjamanDiterima' => $terjualPinjaman,
                    'totalBarangDipinjam' => $totalBarangDipinjam,
                    
                    'BarangvisibilityCount' => $StatusBarangVisibilityCount,
                    'BarangstatusCount' => $statusCount,
                    'StatusPinjamanCount' => $StatusPinjamanCount,
                    'countsByDate' => $counts,
                ],
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
