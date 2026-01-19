<?php

namespace Database\Seeders;

use App\Models\PartType;
use Illuminate\Database\Seeder;

class PartTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PartType::create([
            'part_number' => 'PT-001',
            'part_name' => 'Engine Seal',
            'description' => 'Seal untuk mesin mobil',
            'category' => 'Seal'
        ]);

        PartType::create([
            'part_number' => 'PT-002',
            'part_name' => 'Brake Pad Support',
            'description' => 'Support untuk brake pad',
            'category' => 'Brake'
        ]);

        PartType::create([
            'part_number' => 'PT-003',
            'part_name' => 'Window Seal',
            'description' => 'Seal untuk jendela mobil',
            'category' => 'Seal'
        ]);

        PartType::create([
            'part_number' => 'PT-004',
            'part_name' => 'Door Gasket',
            'description' => 'Gasket untuk pintu mobil',
            'category' => 'Gasket'
        ]);

        PartType::create([
            'part_number' => 'PT-005',
            'part_name' => 'Oil Seal',
            'description' => 'Seal untuk oli',
            'category' => 'Seal'
        ]);
    }
}
