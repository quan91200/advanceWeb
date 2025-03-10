# laravel_react_social_app
## `php artisan serve`

## `php artisan tinker`

## `npm run dev`

## `Commit code`

### `1. Cài đặt môi trường Laravel`
 `composer create-project laravel/laravel social-network`

### `2. Cài đặt thư viện Inertia`
`composer require laravel/breeze --dev`
`php artisan breeze:install`

### `3. Database`

1. `users` - Quản lý thông tin người dùng (email, mật khẩu, tên người dùng, ngôn ngữ, giao diện).
2. `posts` - Quản lý bài viết (nội dung, trạng thái, hình ảnh, v.v).
3. `friends` - Quản lý quan hệ bạn bè (trạng thái mối quan hệ, ghi chú).
4. `comments` - Quản lý bình luận trên bài viết, có thể lồng nhau, kèm ảnh.
5. `profiles` - Quản lý thông tin hồ sơ người dùng: số điện thoại, địa chỉ, ngày sinh, công việc, giới tính, v.v.
6. `languages` - Quản lý các ngôn ngữ hỗ trợ
7. `reactions` - Quản lý các phản ứng (like, love, wow, sad, angry, v.v) của người dùng trên bài viết và bình luận.
8. `reaction_types` - Quản lý các loại phản ứng có thể có.
9. `hobbies` - Quản lý sở thích.
10. `user_hobbies` - Bảng trung gian giữa người dùng và sở thích.
11. `locations` - Quản lý các địa điểm(quốc gia, thành phố) cho người dùng, chuẩn hóa địa chỉ.


### `4. Model`

- Symblink `php artisan storage:link`
`tạo một liên kết biểu tượng (symlink) giữa thư mục storage/app/public và thư mục public/storage`

### `5. Factory Seeder Controller Resource Request`

### `6. Docker`
-Chạy Docker Desktop, chạy Container `laravel-social-app`
- Chạy Ubuntu trên windows subsystem for linux (wsl):
`wsl -d Ubuntu`
- Di chuyển đến thư mục chứa dự án:
`cd mnt/d/laravel-reactjs/laravel-social-app/`
- Symblink cho thư mục `storage` bên trong Docker (chạy 1 lần):
`./vendor/bin/sail artisan storage:link`

`ipconfig` - Wireless LAN adapter Wi-fi: IPv4 Address

powershell

`
wsl
export NGROK_URL=$(grep -o 'https://[a-z0-9.-]*.ngrok-free.app' ngrok.log | head -n1)
sed -i "s|^APP_URL=.*|APP_URL=$NGROK_URL|" .env
echo "Ngrok URL updated: $NGROK_URL"
`