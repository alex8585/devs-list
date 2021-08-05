<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\Request;
use App\Http\Requests\UserDeleteRequest;
use App\Http\Requests\UserUpdateRequest;

class UsersController extends Controller
{
    public function index()
    {
        $direction =  request('direction', 'asc');
        $sort =  request('sort', 'id');
        $perPage =  request('perPage', 5);

        return Inertia::render('Users/Index', [
            'filters' => Request::only('search'),
            'items' => User::filter(Request::only('search'))
                ->sort($sort, $direction)
                ->paginate($perPage)->withQueryString(),
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        return back()->with('success', "User '{$user->name}' has been created.");
    }

    public function update(User $user, UserUpdateRequest $request)
    {
        $user->update($request->validated());
        return back()->with('success', "User '{$user->name}' has been updated.");
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back(303)->with('success', "User '{$user->name}' has been deleted.");
    }
}
