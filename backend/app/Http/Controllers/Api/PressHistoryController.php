<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PressHistory;
use Illuminate\Http\Request;

class PressHistoryController extends Controller
{
    public function index(Request $request)
    {
        // Only operators can view their own press history or admins can view all
        $user = $request->user();
        
        $query = PressHistory::with(['user', 'partType']);
        
        if ($user->role->name !== 'admin_press' && $user->role->name !== 'admin_it') {
            $query->where('user_id', $user->id);
        }
        
        $pressHistories = $query->orderBy('created_at', 'desc')->paginate(20);
        
        return response()->json([
            'success' => true,
            'data' => $pressHistories
        ]);
    }

    public function store(Request $request)
    {
        // Only operators can create press history
        $user = $request->user();
        
        if (!in_array($user->role->name, ['operator', 'admin_press', 'admin_it'])) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: Only operators can create press history'
            ], 403);
        }

        $validated = $request->validate([
            'part_type_id' => 'required|exists:part_types,id',
            'production_sequence_number' => 'nullable|string',
            'press_date' => 'required|date',
            'machine_number' => 'nullable|string',
            'compound_number' => 'nullable|string',
            'compound_lot' => 'nullable|string',
            'compound_expiry_date' => 'nullable|date',
            'setting_temp_upper' => 'nullable|numeric',
            'setting_temp_lower' => 'nullable|numeric',
            'actual_temp_upper' => 'nullable|numeric',
            'actual_temp_lower' => 'nullable|numeric',
            'cool_runner_temp' => 'nullable|numeric',
            'holding_pressure' => 'nullable|numeric',
            'cycle_time' => 'nullable|integer',
            'production_quantity' => 'nullable|integer',
            'qty_ok' => 'nullable|integer',
            'ng_type' => 'nullable|string',
            'cumulative_not_cleaning' => 'nullable|integer',
            'injection_mold_jig_check' => 'nullable|string',
            'injection_ejector_position' => 'nullable|string',
            'injection_release_used' => 'nullable|string',
            'injection_air_gun_check' => 'nullable|string',
            'injection_vacuum_check' => 'nullable|string',
            'injection_first_shot_disposal' => 'nullable|string',
            'compression_mold_jig_check' => 'nullable|string',
            'compression_ejector_position' => 'nullable|string',
            'compression_first_shot_disposal' => 'nullable|string',
            'compression_release_used' => 'nullable|string',
            'compression_air_gun_check' => 'nullable|string',
            'compression_polka_yoke_condition' => 'nullable|string',
            'compression_vacuum_check' => 'nullable|string',
            'press_type' => 'required|in:injection,compression',
        ]);

        // Calculate qty_ng if production_quantity and qty_ok exist
        if ($validated['production_quantity'] && $validated['qty_ok']) {
            $validated['qty_ng'] = $validated['production_quantity'] - $validated['qty_ok'];
        }

        $validated['user_id'] = $user->id;

        $pressHistory = PressHistory::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Press history created successfully',
            'data' => $pressHistory->load(['user', 'partType'])
        ], 201);
    }

    public function show(PressHistory $pressHistory, Request $request)
    {
        $user = $request->user();
        
        // Check authorization
        if ($pressHistory->user_id !== $user->id && !in_array($user->role->name, ['admin_press', 'admin_it'])) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $pressHistory->load(['user', 'partType'])
        ]);
    }

    public function update(Request $request, PressHistory $pressHistory)
    {
        $user = $request->user();
        
        // Check authorization - only the creator or admins can update
        if ($pressHistory->user_id !== $user->id && !in_array($user->role->name, ['admin_press', 'admin_it'])) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $validated = $request->validate([
            'part_type_id' => 'exists:part_types,id',
            'production_sequence_number' => 'nullable|string',
            'press_date' => 'date',
            'machine_number' => 'nullable|string',
            'compound_number' => 'nullable|string',
            'compound_lot' => 'nullable|string',
            'compound_expiry_date' => 'nullable|date',
            'setting_temp_upper' => 'nullable|numeric',
            'setting_temp_lower' => 'nullable|numeric',
            'actual_temp_upper' => 'nullable|numeric',
            'actual_temp_lower' => 'nullable|numeric',
            'cool_runner_temp' => 'nullable|numeric',
            'holding_pressure' => 'nullable|numeric',
            'cycle_time' => 'nullable|integer',
            'production_quantity' => 'nullable|integer',
            'qty_ok' => 'nullable|integer',
            'ng_type' => 'nullable|string',
            'cumulative_not_cleaning' => 'nullable|integer',
            'injection_mold_jig_check' => 'nullable|string',
            'injection_ejector_position' => 'nullable|string',
            'injection_release_used' => 'nullable|string',
            'injection_air_gun_check' => 'nullable|string',
            'injection_vacuum_check' => 'nullable|string',
            'injection_first_shot_disposal' => 'nullable|string',
            'compression_mold_jig_check' => 'nullable|string',
            'compression_ejector_position' => 'nullable|string',
            'compression_first_shot_disposal' => 'nullable|string',
            'compression_release_used' => 'nullable|string',
            'compression_air_gun_check' => 'nullable|string',
            'compression_polka_yoke_condition' => 'nullable|string',
            'compression_vacuum_check' => 'nullable|string',
            'press_type' => 'in:injection,compression',
        ]);

        // Calculate qty_ng if production_quantity and qty_ok exist
        if (isset($validated['production_quantity']) && isset($validated['qty_ok'])) {
            $validated['qty_ng'] = $validated['production_quantity'] - $validated['qty_ok'];
        }

        $pressHistory->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Press history updated successfully',
            'data' => $pressHistory->load(['user', 'partType'])
        ]);
    }

    public function destroy(PressHistory $pressHistory, Request $request)
    {
        $user = $request->user();
        
        // Check authorization - only the creator or admins can delete
        if ($pressHistory->user_id !== $user->id && !in_array($user->role->name, ['admin_press', 'admin_it'])) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $pressHistory->delete();

        return response()->json([
            'success' => true,
            'message' => 'Press history deleted successfully'
        ]);
    }
}
