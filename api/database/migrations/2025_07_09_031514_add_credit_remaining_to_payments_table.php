<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCreditRemainingToPaymentsTable extends Migration
{
    public function up()
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->decimal('credit_remaining', 13, 2)->default(0)->after('amount');
        });
    }

    public function down()
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn('credit_remaining');
        });
    }
}
