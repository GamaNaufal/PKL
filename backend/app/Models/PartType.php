<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartType extends Model
{
    use HasFactory;

    protected $table = 'part_types';

    protected $fillable = ['part_number', 'part_name', 'description', 'category'];

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
