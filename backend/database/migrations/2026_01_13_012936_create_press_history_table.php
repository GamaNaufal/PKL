<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('press_history', function (Blueprint $table) {
            $table->id();
            
            // Relasi & Info Dasar
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('part_type_id')->constrained('part_types')->onDelete('cascade');
            $table->string('production_sequence_number')->nullable(); // Nomor Urut produksi
            $table->date('press_date'); // Tanggal Press
            $table->string('machine_number')->nullable(); // Nomor Mesin
            
            // Compound Info (Cek Compound)
            $table->string('compound_number')->nullable(); // No Compound
            $table->string('compound_lot')->nullable(); // No Lot Compound
            $table->date('compound_expiry_date')->nullable(); // Tgl Kadaluarsa
            
            // Temperatur
            $table->decimal('setting_temp_upper', 5, 2)->nullable(); // Setting temperatur atas
            $table->decimal('setting_temp_lower', 5, 2)->nullable(); // Setting temperatur bawah
            $table->decimal('actual_temp_upper', 5, 2)->nullable(); // Aktual temperatur lubang sensor atas
            $table->decimal('actual_temp_lower', 5, 2)->nullable(); // Aktual temperatur lubang sensor bawah
            $table->decimal('cool_runner_temp', 5, 2)->nullable(); // Temperature Cool runner
            
            // Pressure
            $table->decimal('holding_pressure', 5, 2)->nullable(); // Holding Pressure
            
            // Production Results
            $table->integer('cycle_time')->nullable(); // Cycle Produksi (dalam detik)
            $table->integer('production_quantity')->nullable(); // Jumlah produksi
            $table->integer('qty_ok')->nullable(); // Qty OK
            $table->integer('qty_ng')->nullable(); // Qty NG (otomatis: production_quantity - qty_ok)
            $table->string('ng_type')->nullable(); // Jenis NG
            
            // Cumulative
            $table->integer('cumulative_not_cleaning')->nullable(); // Kumulatif Belum Cleaning
            
            // PENGECEKAN AWAL PRODUKSI (INJECTION)
            $table->text('injection_mold_jig_check')->nullable(); // Cek Mold dan Jig (PIN, Lubang PIN, Core, Bearing, Cut Flow)
            $table->text('injection_ejector_position')->nullable(); // Posisi Ejector
            $table->text('injection_release_used')->nullable(); // Release yang digunakan
            $table->text('injection_air_gun_check')->nullable(); // Pengecekan ujung air gun, rubber cover & selongsong
            $table->text('injection_vacuum_check')->nullable(); // Cek isapan vacuum awal dan setelah stop
            $table->text('injection_first_shot_disposal')->nullable(); // Buang shot pertama awal atau setelah stop
            
            // PENGECEKAN AWAL PRODUKSI (COMPRESSION)
            $table->text('compression_mold_jig_check')->nullable(); // Cek Mold dan Jig
            $table->text('compression_ejector_position')->nullable(); // Posisi Ejector
            $table->text('compression_first_shot_disposal')->nullable(); // Buang shot pertama
            $table->text('compression_release_used')->nullable(); // Release yang digunakan
            $table->text('compression_air_gun_check')->nullable(); // Pengecekan ujung air gun, rubber cover, selongsong, nampan
            $table->text('compression_polka_yoke_condition')->nullable(); // Kondisi Alat Polka Yoke
            $table->text('compression_vacuum_check')->nullable(); // Cek isapan vacuum
            
            $table->string('press_type')->nullable(); // injection atau compression
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('press_history');
    }
};
