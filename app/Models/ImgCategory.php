<?php

namespace App\Models;

use App\Models\Photo;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ImgCategory extends Model
{
    use HasFactory;


    public function pfotos(): BelongsToMany
    {
        return $this->belongsToMany(Photo::class, 'photo_img_category', 'photo_id', 'img_categoty_id');
    }
}
