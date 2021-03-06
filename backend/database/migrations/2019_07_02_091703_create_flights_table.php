<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFlightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('travelDate');
            $table->string('airline');
            $table->string('flightNumber');
            $table->string('aircraftRegistration');
            $table->string('seatNumber');
            $table->string('departurePoint');
            $table->string('arrivalPoint');
            $table->string('captain');
            $table->string('firstOfficer');
            $table->string('customerServiceManager');
            $table->integer('milesTravelled')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flights');
    }
}
