<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 4);
        $search = $request->input('search');
           $page = $request->input('page', 1);

        $status = $request->input('status');
        $query = Barang::where('status', 'tersedia')->where('visibility', 'public');

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

// "http://localhost:8000/storage/uploads//1756104047_elijah-pilchard--ZHRIK-3akk-unsplash.jpg"
       $barang = $query->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

       $barang->through(function($item) {
            return [
                ...$item->toArray(),
                'gambar' => $item->gambar ? url($item->gambar) : null
            ];
        });
        return Inertia::render('welcome', [
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
