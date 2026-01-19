<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PartType;
use Illuminate\Http\Request;

class PartTypeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('q');

        $query = PartType::query();

        if ($search) {
            $query->where('part_number', 'like', "%{$search}%")
                  ->orWhere('part_name', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
        }

        $partTypes = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $partTypes
        ]);
    }

    public function show($id)
    {
        $partType = PartType::find($id);

        if (!$partType) {
            return response()->json(['message' => 'Part type not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $partType
        ]);
    }

    public function store(Request $request)
    {
        // Only Admin Press can add new part types
        if ($request->user()->role->name !== 'admin_press' && $request->user()->role->name !== 'admin_it') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'part_number' => 'required|string|unique:part_types',
            'part_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
        ]);

        $partType = PartType::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Part type created successfully',
            'data' => $partType
        ], 201);
    }
}
