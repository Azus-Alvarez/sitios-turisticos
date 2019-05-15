<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSiteImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('site_images', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('site_image_file_type',50)->nullable($value = true);
          $table->string('site_image_file_name',50)->nullable($value = true);
          $table->longText('site_image_file')->nullable($value = true);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('site_images');
    }
}