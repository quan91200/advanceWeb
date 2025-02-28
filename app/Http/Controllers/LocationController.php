<?php

namespace App\Http\Controllers;

use App\Http\Requests\LocationRequest;
use App\Http\Resources\LocationResource;
use App\Models\Location;

class LocationController extends Controller
{
    // Lấy danh sách tất cả các địa điểm
    public function index()
    {
        $locations = Location::all();
        return LocationResource::collection($locations);
    }
    // Lấy thông tin chi tiết của một địa điểm
    public function show($id)
    {
        $location = Location::findOrFail($id);
        return new LocationResource($location);
    }
    // Tạo mới một địa điểm
    public function store(LocationRequest $request)
    {
        $location = Location::create([
            'country_code' => $request->country_code,
            'country_name' => $request->country_name,
            'city' => $request->city,
        ]);
        return new LocationResource($location);
    }
    // Cập nhật thông tin của một địa điểm
    public function update(LocationRequest $request, $id)
    {
        $location = Location::findOrFail($id);
        $location->update([
            'country_code' => $request->country_code,
            'country_name' => $request->country_name,
            'city' => $request->city,
        ]);
        return new LocationResource($location);
    }
    // Xóa một địa điểm
    public function destroy($id)
    {
        $location = Location::findOrFail($id);
        $location->delete();
        return response()->json(['message' => 'Location deleted successfully']);
    }
}
