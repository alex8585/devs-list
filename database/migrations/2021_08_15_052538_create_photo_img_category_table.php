<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotoImgCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photo_img_category', function (Blueprint $table) {
            $table->id();
            $table->integer('img_categoty_id')->unsigned();
            $table->integer('photo_id')->unsigned();
            //$table->primary(['img_categoty_id', 'photo_id']);
            //$table->foreign('img_categoty_id')->references('id')->on('img_categories');
            //$table->foreign('photo_id')->references('id')->on('photos');


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
        Schema::dropIfExists('photo_img_category');
    }
}
