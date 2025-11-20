import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import ContactClient from './contact-client';

export const metadata: Metadata = generateSEO({
  title: 'Liên Hệ - Tư Vấn Mua Xe Tải',
  description: 'Liên hệ với chúng tôi để được tư vấn miễn phí về các dòng xe tải, xe cẩu, sơ mi rơ moóc. Đội ngũ chuyên nghiệp, tận tâm.',
  keywords: ['liên hệ', 'tư vấn xe tải', 'mua xe tải', 'hotline'],
  canonical: '/lien-he',
});

export default function ContactPage() {
  return <ContactClient />;
}
