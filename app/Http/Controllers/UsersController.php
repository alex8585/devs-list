<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserCollection;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\Request;
use App\Http\Requests\UserDeleteRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Redirect;

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
        User::create($data);
        return back()->with('success', 'User created.');
    }


    public function update(User $user, UserUpdateRequest $request)
    {
        $user->update($request->validated());
        return back()->with('success', 'User updated.');
    }

    public function destroy(User $user, UserDeleteRequest $request)
    {
        $request->validated();
        $user->delete();
        return back(303)->with('success', 'User deleted.');
    }
}
