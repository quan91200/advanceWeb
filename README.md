# WEB USING LARAVEL + REACTJS

## `php artisan serve`

## `php artisan tinker`

## `npm run dev`

## `Commit code`

### `1. Cài đặt môi trường Laravel`
 `composer create-project laravel/laravel social-network`

### `2. Cài đặt thư viện Inertia`
`composer require laravel/breeze --dev`

```
php artisan breeze:install
react
dark
phpunit
```

### `3. Database`

[schema datase](./Databse.md)

```
php artisan make:model User -mfs
php artisan make:controller UserController
```
Tương tự cho các bảng khác

### `4. Model Factory Seeder Controller`

### `5. Reusable Component`

Dropdown

Toast

Button

Pagination

Modal
### `6. i18next - Multiple Language`

Vietnamese - English

### `7. Hệ thống hóa cơ sở dữ liệu`

Hệ thống hóa cơ sở dữ liệu, cập nhật models, seeder, factories, controllers và requests

- Sửa đổi migration, tạo các bảng mới hoặc chỉnh sửa các bảng hiện có.
- Cập nhật models để hỗ trợ các mối quan hệ và validation.
- Tạo seeder và factories cho dữ liệu mẫu.
- Cập nhật controllers và requests để xử lý các nghiệp vụ liên quan đến dữ liệu.

### `8. Hoàn thiện Post`

- Bỏ table Follower, Reaction.
- Hoàn thiện Create - Read - Update - Delete cho Post.
- Bổ sung Trash, Restore, Force delete Post.
- Bổ sung Reusable Component: SortButton.

`
php artisan route:clear
php artisan cache:clear
php artisan config:clear
`