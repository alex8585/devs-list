<?php

namespace App\Http\Controllers;

use App\Models\ImgCategory;
use App\Models\Photo;
use League\Glide\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class ImgCategoriesController extends Controller
{
    public function index()
    {
        $direction =  request('direction', 'asc');
        $sort =  request('sort', 'id');
        $perPage =  request('perPage', 5);
        $items = ImgCategory::filter(request()->only('search'))
            ->sort($sort, $direction)
            ->paginate($perPage)->withQueryString();
        //dd($items);
        return inertia(
            'ImgCategories/Index',
            [
                'filters' => request()->all('search'),
                'items' => $items,
            ]
        );
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
