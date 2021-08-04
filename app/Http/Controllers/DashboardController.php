<?php

namespace App\Http\Controllers;


use Inertia\Inertia;

use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function __construct()
    {
    }

    public function index()
    {
        return Inertia::render('Dashboard');
    }
}
