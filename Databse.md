```
1. User: Bảng này lưu thông tin về người dùng trong hệ thống.
Column	            Type	            Description
id	                INT                 Primary key Tự động tăng
email	            VARCHAR(255)	    Email người dùng, phải là duy nhất
email_verified_at   TIMESTAMP           NOTNULL Xác thực email
password	        VARCHAR(255)	    Mã hóa mật khẩu
name	            VARCHAR(255)	    Tên của người dùng
rememberToken	    VARCHAR(100)	    Ghi nhớ Token - authentication
profile_pic	        VARCHAR(255)	    Đường dẫn tới ảnh đại diện của người dùng
role                ENUM('admin',       authorization 
                            'user')
created_at	        TIMESTAMP	        Thời gian tạo tài khoản
updated_at	        TIMESTAMP	        Thời gian cập nhật thông tin tài khoản
2. password_reset_token
Column              Type                Description
email               VARCHAR(255)        Primary key NOTNULL
token               VARCHAR(255)        NOTNULL OTP
created_at          TIMESTAMP           Lưu trữ thời gian khi token được tạo ra
3. Sessions
Column              Type                Description
id                  INT                 Primary key NOTNULL
user_id             INT                 Foreign key Khóa ngoại tới bảng User
ip_address          VARCHAR(45)         Địa chỉ IP khi đăng nhập 
user_agent          TEXT                Lưu trữ thông tin về trình duyệt và môi trường của người dùng
payload             LONGTEXT            Lưu trữ dữ liệu lớn, chẳng hạn như thông tin chi tiết về sự kiện hoặc dữ liệu bổ sung dạng văn bản, không giới hạn.
last_activity       INT                 Lưu trữ thời gian hoạt động cuối cùng dưới dạng số nguyên
4. Posts
Column	            Type	            Description
id	                INT	                Primary key Tự động tăng
created_by	        INT	                Foreign key Tham chiếu tới bảng Users (Người tạo)
updated_by	        INT	                Foreign key Tham chiếu tới bảng Users (Người sửa)
status              ENUM('public',      Trạng thái bài đăng: công khai
                            'private',                      riêng tư
                            'friend')                       chế độ bạn bè
content	            TEXT NOTNULL	    Nội dung bình luận
image_url           VARCHAR(255)        Đường dẫn hình ảnh
created_at	        TIMESTAMP	        Thời gian bình luận
updated_at	        TIMESTAMP	        Thời gian cập nhật bài viết
comment_count	    INT	                Số lượt bình luận bài viết
5. Comments
Column	            Type	            Description
id	                INT	                Primary key tự động tăng
post_id	            INT	                Foreign key tham chiếu tới bảng Posts
created_by	        INT	                Foreign key tham chiếu tới bảng Users (Người tạo)
updated_by	        INT	                Foreign key Tham chiếu tới bảng Users (Người sửa)
content	            TEXT	            Nội dung bình luận
image_url           VARCHAR(255)        Đường dẫn hình ảnh
created_at	        TIMESTAMP	        Thời gian bình luận
```