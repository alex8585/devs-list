<?php

namespace App\Providers;

use League\Glide\ServerFactory;
use League\Glide\Responses\LaravelResponseFactory;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Storage;
use League\Glide\Server;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(Server::class, function ($app) {
            return ServerFactory::create([
                'response' => new LaravelResponseFactory(app('request')),
                'source' => Storage::getDriver(),
                'cache' => Storage::getDriver(),
                'cache_path_prefix' => '.cache',
                'base_url' => 'img',
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        JsonResource::withoutWrapping();
    }
}
