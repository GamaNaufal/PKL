<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'name' => 'operator',
            'display_name' => 'Operator',
            'description' => 'Operator pabrik untuk melihat dan membuat laporan part'
        ]);

        Role::create([
            'name' => 'admin_press',
            'display_name' => 'Admin Press',
            'description' => 'Administrator Press Department'
        ]);

        Role::create([
            'name' => 'qc',
            'display_name' => 'QC',
            'description' => 'Quality Control'
        ]);

        Role::create([
            'name' => 'supervisi_press',
            'display_name' => 'Supervisi Press',
            'description' => 'Supervisi Press Department'
        ]);

        Role::create([
            'name' => 'mixing_depart',
            'display_name' => 'Mixing Department',
            'description' => 'Mixing Department'
        ]);

        Role::create([
            'name' => 'admin_it',
            'display_name' => 'Admin IT',
            'description' => 'Administrator IT System'
        ]);
    }
}
