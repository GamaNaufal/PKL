<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PartTypeSeeder::class,
        ]);

        // Create admin user
        User::factory()->create([
            'name' => 'Admin IT',
            'email' => 'admin@yamatogomu.com',
            'password' => bcrypt('password123'),
            'role_id' => 6, // Admin IT
            'phone' => '081234567890',
            'department' => 'IT',
        ]);

        // Create operator user
        User::factory()->create([
            'name' => 'Pak Bapak',
            'email' => 'operator@yamatogomu.com',
            'password' => bcrypt('password123'),
            'role_id' => 1, // Operator
            'phone' => '081234567891',
            'department' => 'Press',
        ]);

        // Create admin press
        User::factory()->create([
            'name' => 'Admin Press',
            'email' => 'admin.press@yamatogomu.com',
            'password' => bcrypt('password123'),
            'role_id' => 2, // Admin Press
            'phone' => '081234567892',
            'department' => 'Press',
        ]);

        // Create QC
        User::factory()->create([
            'name' => 'QC Staff',
            'email' => 'qc@yamatogomu.com',
            'password' => bcrypt('password123'),
            'role_id' => 3, // QC
            'phone' => '081234567893',
            'department' => 'QC',
        ]);

        // Create Supervisi Press
        User::factory()->create([
            'name' => 'Supervisi Press',
            'email' => 'supervisi@yamatogomu.com',
            'password' => bcrypt('password123'),
            'role_id' => 4, // Supervisi Press
            'phone' => '081234567894',
            'department' => 'Press',
        ]);

        // Create Mixing Department
        User::factory()->create([
            'name' => 'Mixing Department',
            'email' => 'mixing@yamatogomu.com',
            'password' => bcrypt('password123'),
            'role_id' => 5, // Mixing Department
            'phone' => '081234567895',
            'department' => 'Mixing',
        ]);
    }
}
