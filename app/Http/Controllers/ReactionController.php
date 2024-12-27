<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    public function store(Request $request, Posts $post)
    {
        $validated = $request->validate([
            'reaction_type' => 'required|in:like,love,haha,wow,sad,angry',
        ]);

        $reaction = $post->reactions()->updateOrCreate(
            ['user_id' => $request->user()->id],
            ['reaction_type' => $request->reaction_type]
        );

        return response()->json($reaction);
    }

    public function destroy(Posts $post)
    {
        $reaction = $post->reactions()->where('user_id', request()->user()->id)->first();
        $reaction->delete();

        return response()->json('Reaction deleted');
    }
}

