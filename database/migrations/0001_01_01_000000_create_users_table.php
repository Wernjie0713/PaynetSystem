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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('matric_no')->unique()->nullable();
            $table->string('password');
            $table->string('duitnow_id')->unique()->nullable();
            $table->string('faculty')->nullable();
            $table->string('campus')->nullable();
            $table->string('phone_no')->unique()->nullable();
            $table->integer('total_count')->default(0);
            $table->integer('oct_count')->default(0);
            $table->integer('nov_count')->default(0);
            $table->integer('dec_count')->default(0);
            $table->integer('week1_count')->default(0);
            $table->integer('week2_count')->default(0);
            $table->integer('week3_count')->default(0);
            $table->integer('week4_count')->default(0);
            $table->integer('week5_count')->default(0);
            $table->integer('week6_count')->default(0);
            $table->integer('week7_count')->default(0);
            $table->integer('week8_count')->default(0);
            $table->integer('week9_count')->default(0);
            $table->integer('week10_count')->default(0);
            $table->integer('week11_count')->default(0);
            $table->integer('week12_count')->default(0);
            $table->integer('week13_count')->default(0);
            $table->boolean('is_profile_complete')->default(false);
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
