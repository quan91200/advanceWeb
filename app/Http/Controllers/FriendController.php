<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use App\Http\Requests\FriendRequest;
use App\Http\Resources\FriendResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class FriendController extends Controller
{
    // Danh sách người dùng
    public function index()
    {
        $currentUser = Auth::user();

        return inertia('Friend/Index', [
            'friends' => UserResource::collection(User::friendsList($currentUser->id)->get()),
            'not_friends' => UserResource::collection(User::notFriends($currentUser->id)->get()),
        ]);
    }

    // Gửi lời mời kết bạn
    public function store(FriendRequest $request)
    {
        $user = Auth::user();
        $friendId = $request->friend_id;

        // Kiểm tra nếu đã tồn tại lời mời kết bạn
        $friendship = Friend::where(function ($query) use ($user, $friendId) {
            $query->where('user_id', $user->id)->where('friend_id', $friendId);
        })->orWhere(function ($query) use ($user, $friendId) {
            $query->where('user_id', $friendId)->where('friend_id', $user->id);
        })->first();

        if ($friendship) {
            return response()->json(['message' => 'Mối quan hệ đã tồn tại.', 'status' => $friendship->status], 400);
        }

        // Tạo lời mời kết bạn
        $friend = Friend::create([
            'user_id' => $user->id,
            'friend_id' => $friendId,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Lời mời kết bạn đã được gửi.',
            'data' => new FriendResource($friend),
        ]);
    }

    // Chấp nhận hoặc từ chối lời mời kết bạn
    public function update($id, FriendRequest $request)
    {
        $user = Auth::user();
        $friendship = Friend::findOrFail($id);

        if ($friendship->status !== 'pending') {
            return response()->json(['message' => 'Không thể cập nhật mối quan hệ này.'], 400);
        }

        if ($friendship->friend_id !== $user->id) {
            return response()->json(['message' => 'Bạn không có quyền thao tác.'], 403);
        }

        $status = $request->status;
        if ($status === 'accepted') {
            $friendship->update(['status' => 'accepted']);
            return response()->json(['success' => true, 'message' => 'Đã chấp nhận lời mời kết bạn.']);
        } elseif ($status === 'rejected') {
            $friendship->delete();
            return response()->json(['success' => true, 'message' => 'Đã từ chối lời mời kết bạn.']);
        }

        return response()->json(['success' => false, 'message' => 'Trạng thái không hợp lệ.'], 400);
}
    // Hủy kết bạn
    public function destroy($id)
    {
        $user = Auth::user();
        $friendship = Friend::findOrFail($id);

        if ($friendship->user_id !== $user->id && $friendship->friend_id !== $user->id) {
            return response()->json(['message' => 'Bạn không có quyền thao tác.'], 403);
        }

        $friendship->delete();
        return response()->json(['message' => 'Đã hủy kết bạn thành công.'], 200);
    }
    // Chặn người bạn
    public function block($id)
    {
        $user = Auth::user();
        $friendship = Friend::findOrFail($id);

        if (!in_array($user->id, [$friendship->user_id, $friendship->friend_id])) {
            return response()->json(['message' => 'Bạn không có quyền thao tác.'], 403);
        }

        $friendship->update(['status' => 'blocked']);
        return response()->json(['message' => 'Đã chặn người bạn này.'], 200);
    }
}