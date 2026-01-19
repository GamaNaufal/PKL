<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PressHistory extends Model
{
    use HasFactory;

    protected $table = 'press_history';

    protected $fillable = [
        'user_id',
        'part_type_id',
        'production_sequence_number',
        'press_date',
        'machine_number',
        'compound_number',
        'compound_lot',
        'compound_expiry_date',
        'setting_temp_upper',
        'setting_temp_lower',
        'actual_temp_upper',
        'actual_temp_lower',
        'cool_runner_temp',
        'holding_pressure',
        'cycle_time',
        'production_quantity',
        'qty_ok',
        'qty_ng',
        'ng_type',
        'cumulative_not_cleaning',
        'injection_mold_jig_check',
        'injection_ejector_position',
        'injection_release_used',
        'injection_air_gun_check',
        'injection_vacuum_check',
        'injection_first_shot_disposal',
        'compression_mold_jig_check',
        'compression_ejector_position',
        'compression_first_shot_disposal',
        'compression_release_used',
        'compression_air_gun_check',
        'compression_polka_yoke_condition',
        'compression_vacuum_check',
        'press_type',
    ];

    protected $casts = [
        'press_date' => 'date',
        'compound_expiry_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
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
