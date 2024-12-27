<?php

namespace App\Http\Controllers;

use App\Models\Sessions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class SessionController extends Controller
{
    // Hiển thị danh sách sessions của người dùng (admin hoặc chính người dùng đó)
    public function index(Request $request)
    {
        if (Gate::denies('viewAny', Sessions::class)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $sessions = $request->user()->sessions;

        return response()->json($sessions);
    }

    // Hiển thị thông tin chi tiết của session
    public function show($sessionId)
    {
        $session = Sessions::find($sessionId);

        if (!$session) {
            return response()->json(['error' => 'Session not found'], 404);
        }

        return response()->json($session);
    }

    // Xóa một session (đăng xuất một phiên làm việc)
    public function destroy($sessionId)
    {
        $session = Sessions::find($sessionId);

        if (!$session) {
            return response()->json(['error' => 'Session not found'], 404);
        }

        if ($session->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $session->delete();

        return response()->json(['message' => 'Session terminated successfully']);
    }

    // Đăng xuất tất cả các phiên làm việc của người dùng
    public function destroyAll(Request $request)
    {
        $request->user()->sessions()->delete();

        return response()->json(['message' => 'All sessions terminated']);
    }
}