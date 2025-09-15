<?php

namespace App\Http\Controllers;

use App\Models\Pinjaman;
use Illuminate\Http\Request;
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
                  ->orWhereRaw('LOWER(barang_id) LIKE ?', ["%{$searchLower}%"]);
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
    public function store(Request $request)
    {
        //
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
    public function destroy(Pinjaman $pinjaman)
    {
        //
    }
}
