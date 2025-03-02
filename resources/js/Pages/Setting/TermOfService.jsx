import NoHeader from '@/Layouts/NoHeader'
import { Head } from '@inertiajs/react'
import React from 'react'

const TermOfService = () => {
    return (
        <NoHeader
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">Terms of Service</h2>}
        >
            <Head title="Terms of Service" />
            <div className="max-w-4xl mx-auto p-6">
                <div className="p-6 dark:bg-gray-800 bg-gray-100 rounded-lg shadow-lg">
                    <div className="border-b border-gray-600 pb-4 mb-4 flex justify-center items-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">Terms of Service</h2>
                    </div>

                    <div className="space-y-6 text-gray-800 dark:text-gray-300 leading-relaxed">
                        <p><strong>Last Updated:</strong> 01-03-2025</p>

                        <h3 className="text-xl font-semibold">1. Chấp nhận Điều khoản</h3>
                        <p>Bằng cách tạo tài khoản hoặc sử dụng <span className='font-bold text-blue-600'>CobhamSocial</span>, bạn đồng ý tuân thủ các điều khoản này. Nếu bạn không đồng ý, vui lòng ngừng sử dụng dịch vụ.</p>

                        <h3 className="text-xl font-semibold">2. Tài khoản Người dùng</h3>
                        <ul className="list-disc pl-6">
                            <li>Bạn phải từ <span className='font-bold text-red-600'>16+</span> tuổi trở lên để sử dụng dịch vụ.</li>
                            <li>Bạn chịu trách nhiệm bảo vệ thông tin đăng nhập tài khoản của mình.</li>
                            <li>Chúng tôi có quyền tạm ngưng hoặc chấm dứt tài khoản nếu phát hiện vi phạm điều khoản.</li>
                        </ul>

                        <h3 className="text-xl font-semibold">3. Quyền riêng tư</h3>
                        <p>Chúng tôi tôn trọng quyền riêng tư của bạn. Vui lòng tham khảo&nbsp;
                            <a
                                href='/users/setting/privacy-policy'
                                target='_blank' rel='noreferrer'
                                className='text-blue-600 hover:underline cursor-pointer font-bold'
                            >
                                Chính sách quyền riêng tư
                            </a>&nbsp;
                            của chúng tôi để biết thêm chi tiết về cách chúng tôi thu thập và bảo vệ dữ liệu của bạn.
                        </p>

                        <h3 className="text-xl font-semibold">4. Nội dung Người dùng</h3>
                        <ul className="list-disc pl-6">
                            <li>Bạn giữ quyền sở hữu nội dung do bạn tạo và chia sẻ trên nền tảng.</li>
                            <li>Bạn cấp cho <span className='font-bold text-blue-600'>CobhamSocial</span> quyền sử dụng, lưu trữ và hiển thị nội dung của bạn để vận hành dịch vụ.</li>
                            <li>Không được đăng nội dung vi phạm pháp luật, xúc phạm, đe dọa hoặc có bản quyền của bên thứ ba.</li>
                        </ul>

                        <h3 className="text-xl font-semibold">5. Hành vi Cấm</h3>
                        <ul className="list-disc pl-6">
                            <li>Mạo danh người khác hoặc cung cấp thông tin sai lệch.</li>
                            <li>Phát tán phần mềm độc hại, spam hoặc thực hiện hành vi lừa đảo.</li>
                            <li>Can thiệp vào hoạt động của nền tảng hoặc vi phạm pháp luật hiện hành.</li>
                        </ul>

                        <h3 className="text-xl font-semibold">6. Chấm dứt Dịch vụ</h3>
                        <p>Chúng tôi có quyền đình chỉ hoặc chấm dứt tài khoản nếu bạn vi phạm các điều khoản này. Bạn cũng có thể ngừng sử dụng dịch vụ bất kỳ lúc nào.</p>

                        <h3 className="text-xl font-semibold">7. Giới hạn Trách nhiệm</h3>
                        <p><span className='font-bold text-blue-600'>CobhamSocial</span> không chịu trách nhiệm về:</p>
                        <ul className="list-disc pl-6">
                            <li>Nội dung do người dùng đăng tải.</li>
                            <li>Bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.</li>
                        </ul>

                        <h3 className="text-xl font-semibold">8. Sửa đổi Điều khoản</h3>
                        <p>Chúng tôi có thể thay đổi các điều khoản này bất cứ lúc nào. Nếu có thay đổi quan trọng, chúng tôi sẽ thông báo trước qua email hoặc trên nền tảng.</p>

                        <h3 className="text-xl font-semibold">9. Liên hệ</h3>
                        <p>Nếu có bất kỳ câu hỏi nào về điều khoản dịch vụ, vui lòng liên hệ với chúng tôi qua <span className='font-bolc text-blue-600'>xb91200@gmail.com</span> hoặc&nbsp;
                            <a
                                href='https://portfolio-web-design-drab.vercel.app/'
                                className='cursor-pointer text-blue-600 hover:underline'
                                target='_blank' rel='noreferrer'
                            >
                                Cobham
                            </a>.
                        </p>
                    </div>

                    <p className="mt-6 text-center text-gray-700 dark:text-gray-400 font-semibold">
                        Cảm ơn bạn đã sử dụng <span className='font-bold text-blue-600'>CobhamSocial</span> !
                    </p>
                </div>
            </div>
        </NoHeader>
    )
}

export default TermOfService