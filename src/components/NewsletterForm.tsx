
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';
import { submitToGoogleSheets, ContactData } from '@/services/googleSheetsService';

interface NewsletterFormProps {
  source?: string;
  title?: string;
  placeholder?: string;
  buttonText?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  source = 'newsletter',
  title = 'Đăng Ký Nhận Tin Mới Nhất',
  placeholder = 'Nhập email của bạn',
  buttonText = 'Đăng ký'
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast({
        title: "Vui lòng nhập email!",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const contactData: ContactData = {
        timestamp: new Date().toLocaleString('vi-VN'),
        source: source,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: 'Đăng ký nhận tin tức'
      };

      const success = await submitToGoogleSheets(contactData);
      
      if (success) {
        toast({
          title: "Đăng ký thành công!",
          description: "Cảm ơn bạn đã đăng ký nhận tin tức từ chúng tôi.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: ''
        });
      } else {
        throw new Error('Đăng ký thất bại');
      }
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra!",
        description: "Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="newsletter-name">Họ và tên</Label>
          <Input
            id="newsletter-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ và tên của bạn"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="newsletter-email">Email <span className="text-red-500">*</span></Label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={placeholder}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="newsletter-phone">Số điện thoại</Label>
          <Input
            id="newsletter-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại của bạn"
            className="mt-1"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-red-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang đăng ký...' : buttonText}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterForm;
