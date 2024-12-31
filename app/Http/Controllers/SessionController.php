<?php

namespace App\Http\Controllers;

use App\Models\Sessions;

class SessionController extends Controller
{
    // Xóa các session cũ
    public function cleanup()
    {
        Sessions::cleanOldSessions(30); // Xóa session cũ hơn 30 ngày
        return response()->json(['message' => 'Old sessions cleaned up']);
    }

    // Lấy tất cả session của một người dùng
    public function getUserSessions($userId)
    {
        $sessions = Sessions::where('user_id', $userId)->get();
        return response()->json($sessions);
    }

    // Xóa session theo ID
    public function destroy($sessionId)
    {
        $session = Sessions::find($sessionId);

        if ($session) {
            $session->delete();
            return response()->json(['message' => 'Session deleted']);
        }

        return response()->json(['message' => 'Session not found'], 404);
    }
}