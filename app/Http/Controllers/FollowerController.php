<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

class FollowerController extends Controller
{
    // Người dùng theo dõi người khác
    public function follow(User $user)
{
    if (Auth::check()) {
        $follow = auth()->user()->following()->toggle($user->id);
        return response()->json($follow);
    }

    return response()->json(['message' => 'Unauthorized'], 401);
}


    // Chấp nhận yêu cầu theo dõi
    public function acceptFollowRequest(User $user)
    {
        // Kiểm tra nếu người dùng hiện tại đã đăng nhập
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Lấy yêu cầu theo dõi từ bảng followers của người dùng
        $follower = auth()->user()->followers()->where('user_id_1', $user->id)->first();

        if ($follower) {
            $follower->pivot->update(['status' => 'accepted']);
            return response()->json('Follow request accepted');
        }

        return response()->json('Follow request not found', 404);
    }

     // Từ chối yêu cầu theo dõi
     public function rejectFollowRequest(User $user)
     {
         // Kiểm tra nếu người dùng hiện tại đã đăng nhập
         if (!Auth::check()) {
             return response()->json(['message' => 'Unauthorized'], 401);
         }
 
         // Lấy yêu cầu theo dõi từ bảng followers của người dùng
         $follower = auth()->user()->followers()->where('user_id_1', $user->id)->first();
 
         if ($follower) {
             // Cập nhật trạng thái follow thành 'rejected'
             $follower->pivot->update(['status' => 'rejected']);
             return response()->json(['message' => 'Follow request rejected']);
         }
 
         return response()->json(['message' => 'Follow request not found'], 404);
     }
}