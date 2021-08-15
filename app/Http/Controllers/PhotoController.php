<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use League\Glide\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class PhotoController extends Controller
{
    public function index()
    {
        $direction =  request('direction', 'asc');
        $sort =  request('sort', 'id');
        $perPage =  request('perPage', 5);
        $photos = Photo::filter(request()->only('search'))
            ->sort($sort, $direction)
            ->paginate($perPage)->withQueryString();
        //dd($photos);
        return inertia(
            'Photos/Index',
            [
                'filters' => request()->all('search'),
                'items' => $photos,
            ]
        );
    }


    public function storeFile()
    {
        if (request()->file('file')->isValid()) {
            $path = request()->file('file')->store('photo');

            $params = [
                "w" => "300",
                "h" => "300",
                "fit" => "crop"
            ];

            $url = Photo::getUrlByPath($path, $params);

            return [
                "name" => basename($path),
                "url" => $url,
            ];
        }
    }



    public function store(TagStoreRequest $request)
    {
        Tag::create($request->validated());
        return back()->with('success', "The Tag '{$request->name}' has been created.");
    }


    public function update(Tag $tag, TagUpdateRequest $request)
    {
        $tag->update($request->validated());
        return back()->with('success', "The Tag '{$tag->name}' has been updated.");
    }


    public function destroy(Tag $tag)
    {
        $tag->delete();
        return back()->with('success', "The Tag '{$tag->name}' has been deleted.");
    }
}
