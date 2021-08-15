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

    public static $obj = "photos";


    public static  $imgParams =
    [
        'full' => [],
        'img' => ['w' => 300, 'h' => 300, 'fit' => 'crop'],
        'thumbnail' => ['w' => 100, 'h' => 100, 'fit' => 'crop'],
    ];



    public function categories(): BelongsToMany

    {
        return $this->belongsToMany(ImgCategory::class, 'photo_img_category', 'img_categoty_id', 'photo_id');
    }



    public static function getUrlByPath($path, $params = [])
    {
        $params = array_merge(["obj" => self::$obj], $params);
        $fullPath = App::make(Server::class)->getBaseUrl() . '/' . basename($path);
        return URL::to($fullPath) . "/?" . http_build_query($params);
    }

    public function getThumbnailAttribute()
    {
        $params = self::$imgParams['thumbnail'];
        return self::getUrlByPath($this->url, $params);
    }

    public function getImgUrlAttribute()
    {
        $params = self::$imgParams['img'];
        return self::getUrlByPath($this->url, $params);
    }

    public function getFullUrlAttribute()
    {
        //'w' => 400, 'h' => 400, 'fit' => 'crop'
        return self::getUrlByPath($this->url);
    }
}
