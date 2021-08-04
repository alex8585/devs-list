<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__ . '/auth.php';

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Users
    Route::get('users', [UsersController::class, 'index'])->name('users');
    Route::get('users/create', [UsersController::class, 'create'])->name('users.create');
    Route::post('users', [UsersController::class, 'store'])->name('users.store');
    Route::get('users/{user}/edit', [UsersController::class, 'edit'])->name('users.edit');
    Route::put('users/{user}', [UsersController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UsersController::class, 'destroy'])->name('users.destroy');
    Route::put('users/{user}/restore', [UsersController::class, 'restore'])->name('users.restore');



    // Categories
    //Route::get('categories', [CategoriesController::class, 'index'])->name('categories')->middleware('remember');
    // Route::get('categories', [CategoriesController::class, 'index'])->name('categories');
    // Route::get('categories/create', [CategoriesController::class, 'create'])->name('categories.create');
    // Route::post('categories', [CategoriesController::class, 'store'])->name('categories.store');
    // Route::get('categories/{category}/edit', [CategoriesController::class, 'edit'])->name('categories.edit');
    // Route::put('categories/{category}', [CategoriesController::class, 'update'])->name('categories.update');
    // Route::delete('categories/{category}', [CategoriesController::class, 'destroy'])->name('categories.destroy');
    // Route::put('categories/{category}/restore', [CategoriesController::class, 'restore'])->name('categories.restore');


    // Notes
    // Route::get('notes', [NotesController::class, 'index'])->name('notes');
    // Route::get('notes/create', [NotesController::class, 'create'])->name('notes.create');
    // Route::post('notes', [NotesController::class, 'store'])->name('notes.store');
    // Route::get('notes/{note}/edit', [NotesController::class, 'edit'])->name('notes.edit');
    // Route::put('notes/{note}', [NotesController::class, 'update'])->name('notes.update');
    // Route::delete('notes/{note}', [NotesController::class, 'destroy'])->name('notes.destroy');
    // Route::put('notes/{note}/restore', [NotesController::class, 'restore'])->name('notes.restore');

    // portfolios
    // Route::get('portfolios', [PortfolioController::class, 'index'])->name('portfolios');
    // Route::post('portfolios', [PortfolioController::class, 'store'])->name('portfolios.store');
    // Route::put('portfolios/{portfolio}', [PortfolioController::class, 'update'])->name('portfolios.update');
    // Route::delete('portfolios/{portfolio}', [PortfolioController::class, 'destroy'])->name('portfolios.destroy');

    // tags
    Route::get('tags', [TagsController::class, 'index'])->name('tags');
    Route::post('tags', [TagsController::class, 'store'])->name('tags.store');
    Route::put('tags/{tag}', [TagsController::class, 'update'])->name('tags.update');
    Route::delete('tags/{tag}', [TagsController::class, 'destroy'])->name('tags.destroy');
});
