<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'part_type_id', 'title', 'content', 'file_path', 'quantity', 'status', 'report_date'];

    protected $casts = [
        'report_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function partType()
    {
        return $this->belongsTo(PartType::class);
    }
}
