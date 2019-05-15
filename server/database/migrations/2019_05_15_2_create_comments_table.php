<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('comments', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->longText('content')->nullable($value = true);
          $table->dateTime('moment')->nullable($value = true);
          $table->integer('calification')->nullable($value = true);
          $table->double('approval',8,2)->nullable($value = true);
          $table->unsignedInteger('user_id');
          $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
          $table->unsignedInteger('site_id');
          $table->foreign('site_id')->references('id')->on('sites')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('comments');
    }
}