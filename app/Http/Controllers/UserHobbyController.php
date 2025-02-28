<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserHobbyRequest;
use App\Http\Resources\UserHobbyResource;
use App\Models\User;
use App\Models\Hobby;
use App\Models\UserHobby;
class UserHobbyController extends Controller
{
    //  Hiển thị form cập nhật sở thích người dùng
    public function edit(Request $request, $userId)
    {
        $user = $request->user();
        // Lấy sở thích của người dùng
        $userHobbies = $user->userHobbies;
        // Lọc các sở thích chưa có trong danh sách của người dùng
        $availableHobbies = Hobby::notInUserHobbies($userId)->get();
        // Lấy tất cả sở thích để hiển thị trong dropdown
        $allHobbies = Hobby::all();
        // Kiểm tra nếu người dùng chưa có sở thích
        if ($userHobbies->isEmpty()) {
            // Trả về null nếu không có sở thích
            return inertia('Hobby/Edit', [
                'userHobbies' => null,
                'allHobbies' => $allHobbies,
                'notInUserHobbies' => $availableHobbies,
            ]);
        }
        // Trả về thông tin sở thích của người dùng
        return inertia('Hobby/Edit', [
            'userHobbies' => (UserHobbyResource::collection($userHobbies))->resolve(),
            'allHobbies' => $allHobbies,
            'notInUserHobbies' => $availableHobbies,
        ]);
    }
    // Cập nhật sở thích của người dùng
    public function addHobbyToUser($userId, $hobbyId)
    {
        $user = User::findOrFail($userId);
        $hobby = Hobby::findOrFail($hobbyId);
        // Kiểm tra xem sở thích này đã tồn tại trong danh sách sở thích của người dùng chưa
        if (!$user->hobbies->contains($hobby->id)) {
            // Thêm sở thích vào người dùng
            $user->hobbies()->attach($hobby->id);
            return redirect()->back()->with('success', 'New hobby added successfully');
        }
         // Trả về thông báo nếu sở thích đã có
        return redirect()->back()->with('error', 'This hobby already exists in your list.');
    }
    // Tạo sở thích mới và thêm vào người dùng
    public function addNewHobbyToUser(UserHobbyRequest $request, $userId)
    {
        $user = User::findOrFail($userId);
        // Xác thực dữ liệu đầu vào cho sở thích mới
        $validated = $request->validated();
         // Tạo sở thích mới và thêm vào người dùng
        $hobby = Hobby::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
        ]);
         // Gắn sở thích mới vào người dùng
        $user->hobbies()->attach($hobby->id);
        return redirect()->back()->with('success', 'New hobby added successfully');
    }
    // Xóa sở thích của người dùng khỏi user_hobbies
    public function removeHobbyFromUser($userId, $hobbyId)
    {
        $user = User::findOrFail($userId);
        // Kiểm tra xem sở thích có tồn tại trong danh sách sở thích của người dùng không
        if ($user->hobbies->contains($hobbyId)) {
            // Xóa mối quan hệ giữa người dùng và sở thích (xóa từ bảng trung gian)
            $user->hobbies()->detach($hobbyId);
            return redirect()->back()->with('success', 'Hobby removed successfully');
        }
        return redirect()->back()->with('error', 'This hobby does not exist in your list');
    }
}
