<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('sites', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('name',255)->nullable($value = true);
          $table->longText('description')->nullable($value = true);
          $table->float('location_latitude',24,16)->nullable($value = true);
          $table->float('location_longitude',24,16)->nullable($value = true);
          $table->unsignedInteger('site_image_id');
          $table->foreign('site_image_id')->references('id')->on('site_images')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('sites');
    }
}