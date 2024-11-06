<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Silber\Bouncer\BouncerFacade;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'is_profile_complete' => true,
        ]);

        $admin->assign(['admin']);

        // foreach (range(1, 100) as $index) {
        //     $normalUser = User::factory()->create([
        //     'name' => 'User' . $index,
        //     'email' => 'user' . $index . '@example.com',
        //     'matric_no' => 'A88EC0' . str_pad($index, 3, '0', STR_PAD_LEFT),
        //     'duitnow_id' => '0123456' . str_pad($index, 3, '0', STR_PAD_LEFT),
        //     'faculty' => 'Faculty of Computing (FC)',
        //     'campus' => 'UTM JOHOR BAHRU',
        //     'is_profile_complete' => true,
        //     ]);

        //     $normalUser->assign(['user']);
        // }

        // Define abilities
        BouncerFacade::ability()->firstOrCreate([
            'name' => 'manage-transactions',
            'title' => 'Manage Transaction',
        ]);
        BouncerFacade::ability()->firstOrCreate([
            'name' => 'edit-profile',
            'title' => 'Edit Profile',
        ]);

        // Assign ability to user role only
        BouncerFacade::allow('user')->to('manage-transactions');
        BouncerFacade::disallow('admin')->to('manage-transactions');

        BouncerFacade::allow('user')->to('edit-profile');
        BouncerFacade::disallow('admin')->to('edit-profile');

        
        // BouncerFacade::ability()->firstOrCreate([
        //     'name' => 'manage-users',
        //     'title' => 'Manage Users',
        // ]);
        // BouncerFacade::allow('admin')->to('manage-users');
        // BouncerFacade::disallow('user')->to('manage-users');

        // foreach(range(1,100) as $count) {
        //     DB::table("transactions")->insert([
        //         'user_id'=>2,
        //         'reference_id'=>$count,
        //         'amount'=>2.24,
        //         'date'=> date('2024-10-6'),
        //     ]);
        // }
    }
}
