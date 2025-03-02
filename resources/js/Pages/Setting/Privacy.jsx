import NoHeader from '@/Layouts/NoHeader'
import { Head } from '@inertiajs/react'
import React from 'react'

const Privacy = () => {
    return (
        <NoHeader
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">Privacy Policy</h2>}
        >
            <Head title="Privacy Policy" />
            <div className='max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg my-5'>
                <div className='border-b-2 border-gray-700 pb-4'>
                    <div className='flex items-center justify-center mb-4'>
                        <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-300'>Privacy Policy</h2>
                    </div>
                    <div className='text-gray-800 dark:text-gray-300 space-y-4'>
                        <p><strong>Cập nhật lần cuối:</strong> 01-03-2025</p>
                        <p>Chính sách quyền riêng tư này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi sử dụng&nbsp;<span className='text-blue-500 font-bold'>CobhamSocial</span>.</p>

                        <h3 className='text-xl font-semibold'>1. Thông tin Chúng tôi Thu thập</h3>
                        <ul className='list-disc pl-6'>
                            <li>Thông tin bạn cung cấp khi tạo tài khoản (tên, email, số điện thoại, v.v.).</li>
                            <li>Dữ liệu hoạt động của bạn trên nền tảng, bao gồm nội dung bạn đăng tải.</li>
                            <li>Thông tin kỹ thuật như địa chỉ IP, trình duyệt, thiết bị sử dụng.</li>
                        </ul>

                        <h3 className='text-xl font-semibold'>2. Cách Chúng tôi Sử dụng Thông tin</h3>
                        <ul className='list-disc pl-6'>
                            <li>Cung cấp và cải thiện dịch vụ.</li>
                            <li>Cá nhân hóa trải nghiệm người dùng.</li>
                            <li>Bảo mật tài khoản và phát hiện hoạt động đáng ngờ.</li>
                            <li>Gửi thông báo và cập nhật liên quan đến dịch vụ.</li>
                        </ul>

                        <h3 className='text-xl font-semibold'>3. Chia sẻ Thông tin</h3>
                        <p>Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn. Tuy nhiên, chúng tôi có thể chia sẻ thông tin với:</p>
                        <ul className='list-disc pl-6'>
                            <li>Các nhà cung cấp dịch vụ bên thứ ba để hỗ trợ hoạt động của nền tảng.</li>
                            <li>Cơ quan pháp luật nếu được yêu cầu theo quy định.</li>
                        </ul>

                        <h3 className='text-xl font-semibold'>4. Quyền của Bạn</h3>
                        <ul className='list-disc pl-6'>
                            <li>Truy cập, chỉnh sửa hoặc xóa thông tin cá nhân.</li>
                            <li>Hạn chế hoặc từ chối một số quyền sử dụng dữ liệu.</li>
                            <li>Hủy đăng ký nhận email tiếp thị.</li>
                        </ul>

                        <h3 className='text-xl font-semibold'>5. Bảo Mật Dữ Liệu</h3>
                        <p>Chúng tôi áp dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin cá nhân khỏi truy cập trái phép, mất mát hoặc tiết lộ.</p>

                        <h3 className='text-xl font-semibold'>6. Thay đổi Chính sách</h3>
                        <p>Chúng tôi có thể cập nhật chính sách quyền riêng tư này theo thời gian. Nếu có thay đổi quan trọng, chúng tôi sẽ thông báo qua email hoặc trên nền tảng.</p>

                        <h3 className='text-xl font-semibold'>7. Liên hệ</h3>
                        <p>Nếu có bất kỳ câu hỏi nào về chính sách quyền riêng tư, vui lòng liên hệ với chúng tôi qua <span className='text-blue-500 font-bold'>xb91200@gmail.com</span> hoặc
                            &nbsp;<a href='https://portfolio-web-design-drab.vercel.app/'
                                className='cursor-pointer text-blue-600 hover:underline'
                                target='_blank' rel='noreferrer'>
                                Cobham
                            </a>.
                        </p>

                        <p className='text-lg font-semibold text-center'>Cảm ơn bạn đã tin tưởng sử dụng <span className='text-blue-600 font-bold'>CobhamSocial</span>!</p>
                    </div>
                </div>
            </div>
        </NoHeader>
    )
}

export default Privacy