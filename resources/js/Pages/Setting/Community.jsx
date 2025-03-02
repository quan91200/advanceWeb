import NoHeader from '@/Layouts/NoHeader'
import { Head } from '@inertiajs/react'
import React from 'react'

const Community = () => {
    return (
        <NoHeader
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">Community Standards</h2>}
        >
            <Head title="Community Standards" />
            <div className='max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg my-5'>
                <div className='border-b-2 border-gray-700 pb-4'>
                    <div className='flex items-center justify-center mb-4'>
                        <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-300'>Community Standards</h2>
                    </div>
                    <div className='text-gray-800 dark:text-gray-300 space-y-4'>
                        <p><strong>Cập nhật lần cuối:</strong> 01-03-2025</p>
                        <p>Chúng tôi cam kết xây dựng một môi trường an toàn, tôn trọng và tích cực cho tất cả người dùng <span className='text-blue-500 font-bold'>CobhamSocial</span>. Các tiêu chuẩn này giúp duy trì sự lành mạnh của cộng đồng.</p>

                        <h3 className='text-xl font-semibold'>1. Nội dung Không được Phép</h3>
                        <ul className='list-disc pl-6'>
                            <li>Nội dung kích động bạo lực, thù hận, phân biệt chủng tộc, hoặc quấy rối.</li>
                            <li>Hình ảnh và nội dung khiêu dâm, tục tĩu hoặc không phù hợp.</li>
                            <li>Thông tin sai lệch, giả mạo hoặc có thể gây hiểu nhầm nghiêm trọng.</li>
                            <li>Nội dung vi phạm bản quyền hoặc quyền sở hữu trí tuệ.</li>
                        </ul>

                        <h3 className='text-xl font-semibold'>2. Hành vi Cấm</h3>
                        <ul className='list-disc pl-6'>
                            <li>Quấy rối, bắt nạt hoặc đe dọa người khác.</li>
                            <li>Mạo danh người khác hoặc giả mạo danh tính.</li>
                            <li>Spam, quảng cáo không mong muốn hoặc lừa đảo.</li>
                            <li>Khai thác lỗ hổng hoặc gây rối hệ thống.</li>
                        </ul>

                        <h3 className='text-xl font-semibold'>3. Quyền và Trách nhiệm của Người dùng</h3>
                        <ul className='list-disc pl-6'>
                            <li>Hãy tôn trọng ý kiến và quyền riêng tư của người khác.</li>
                            <li>Báo cáo nội dung hoặc hành vi vi phạm tiêu chuẩn cộng đồng.</li>
                            <li>Chịu trách nhiệm về nội dung bạn chia sẻ trên nền tảng.</li>
                        </ul>

                        <h3 className='text-xl font-semibold'>4. Thực thi và Hình phạt</h3>
                        <p>Chúng tôi có quyền gỡ bỏ nội dung, cảnh báo, tạm khóa hoặc chấm dứt tài khoản nếu vi phạm các tiêu chuẩn cộng đồng.</p>

                        <h3 className='text-xl font-semibold'>5. Liên hệ</h3>
                        <p>Nếu bạn có bất kỳ câu hỏi hoặc muốn báo cáo vi phạm, vui lòng liên hệ qua <span className='text-blue-500 font-bold'>xb91200@gmail.com</span> hoặc
                            &nbsp;<a href='https://portfolio-web-design-drab.vercel.app/'
                                className='cursor-pointer text-blue-600 hover:underline'
                                target='_blank' rel='noreferrer'>
                                Cobham
                            </a>.
                        </p>

                        <p className='text-lg font-semibold text-center'>Cảm ơn bạn đã giúp xây dựng cộng đồng <span className='text-blue-600 font-bold'>CobhamSocial</span> lành mạnh!</p>
                    </div>
                </div>
            </div>
        </NoHeader>
    )
}

export default Community
