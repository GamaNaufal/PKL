<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\PartType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = Report::with(['user', 'partType']);

        // Check if user can see all reports or only their own
        if ($request->user()->role->name !== 'admin_press' && $request->user()->role->name !== 'admin_it') {
            $query->where('user_id', $request->user()->id);
        }

        $reports = $query->orderBy('report_date', 'desc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $reports
        ]);
    }

    public function show($id)
    {
        $report = Report::with(['user', 'partType'])->find($id);

        if (!$report) {
            return response()->json(['message' => 'Report not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $report
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'part_type_id' => 'required|exists:part_types,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'quantity' => 'required|integer|min:0',
            'report_date' => 'required|date',
        ]);

        $report = Report::create([
            'user_id' => $request->user()->id,
            'part_type_id' => $validated['part_type_id'],
            'title' => $validated['title'],
            'content' => $validated['content'],
            'quantity' => $validated['quantity'],
            'report_date' => $validated['report_date'],
            'status' => 'draft',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Report created successfully',
            'data' => $report->load(['user', 'partType'])
        ], 201);
    }

    public function searchByPartNumber(Request $request)
    {
        $partNumber = $request->query('q');

        if (!$partNumber) {
            return response()->json(['message' => 'Part number query is required'], 400);
        }

        $query = Report::with(['user', 'partType'])
            ->whereHas('partType', function ($q) use ($partNumber) {
                $q->where('part_number', 'like', "%{$partNumber}%")
                  ->orWhere('part_name', 'like', "%{$partNumber}%");
            });

        if ($request->user()->role->name !== 'admin_press' && $request->user()->role->name !== 'admin_it') {
            $query->where('user_id', $request->user()->id);
        }

        $reports = $query->orderBy('report_date', 'desc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $reports
        ]);
    }

    public function searchByDate(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        if (!$startDate || !$endDate) {
            return response()->json(['message' => 'start_date and end_date are required'], 400);
        }

        $query = Report::with(['user', 'partType'])
            ->whereBetween('report_date', [$startDate, $endDate]);

        if ($request->user()->role->name !== 'admin_press' && $request->user()->role->name !== 'admin_it') {
            $query->where('user_id', $request->user()->id);
        }

        $reports = $query->orderBy('report_date', 'desc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $reports
        ]);
    }

    public function download($id, Request $request)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json(['message' => 'Report not found'], 404);
        }

        // Generate PDF or file
        // For now, return report data that can be downloaded as JSON/PDF on frontend
        return response()->json([
            'success' => true,
            'message' => 'Report ready for download',
            'data' => $report->load(['user', 'partType'])
        ]);
    }
}
