<?php

namespace App\Models;

use App\Models\Model;
use League\Glide\Server;
use App\Models\ImgCategory;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Photo extends Model
{
    use HasFactory;

    private static $obj = "photos";


    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(ImgCategory::class, 'photo_img_category');
    }



    public static function getUrlByPath($path, $params = [])
    {
        $params = array_merge(["obj" => self::$obj], $params);
        $fullPath = App::make(Server::class)->getBaseUrl() . '/' . basename($path);
        return URL::to($fullPath) . "/?" . http_build_query($params);
    }

    public function getImgUrlAttribute()
    {
        //'w' => 400, 'h' => 400, 'fit' => 'crop'
        return $this->imgUrl(['w' => 100]);
    }

    public function getBigImgUrlAttribute()
    {
        //'w' => 400, 'h' => 400, 'fit' => 'crop'
        return $this->imgUrl([]);
    }

    public function imgUrl(array $attributes)
    {
        if ($this->img) {
            return URL::to(App::make(Server::class)->fromPath($this->img, $attributes));
        }
        return null;
    }
}
