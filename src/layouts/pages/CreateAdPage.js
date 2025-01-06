import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ApiService from "../../services/api";
import AppLayout from "../AppLayout";
import { ImageUploader } from "../../components/ImageUploader";
import { CustomTextField } from "../../components/CustomTextField";
import { CustomNumericField } from "../../components/CustomNumericField";
import CategorySelector from '../../components/category/CategorySelector';

export default function CreateAdPage() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    image: null,
    price: "",
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiService.get("/category");
        if (response.isSuccess) {
          setCategories(response.data);
        } else {
          alert("خطا در دریافت دسته بندی‌ها: " + response.data?.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("مشکلی در دریافت دسته بندی‌ها رخ داد. لطفاً دوباره تلاش کنید.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const data = {
      categoryId: formData.categoryId,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      main_picture: formData.image || undefined,
    };

    try {
      const response = await ApiService.createAd("/advertisement/", data);
      if (response.isSuccess) {
        alert("آگهی شما با موفقیت ثبت شد");
        navigate("/");
      } else {
        alert("خطا در ثبت آگهی: " + response.data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error creating ad:", error);
      alert("مشکلی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AppLayout title="ساخت آگهی">
      <form onSubmit={handleSubmit}>
        <CategorySelector
          categories={categories}
          selectedCategory={formData.categoryId}
          onSelect={(categoryId) =>
            setFormData({ ...formData, categoryId })
          }
        />

        <CustomTextField
          title="عنوان آگهی"
          description="در عنوان آگهی به موارد مهم و چشم‌گیر اشاره کنید."
          placeholder="عنوان را وارد کنید"
          value={formData.title}
          onChange={(title) =>
            setFormData({ ...formData, title })
          }
        />

        <CustomTextField
          title="توضیحات"
          description="جزییات و نکات جالب توجه آگهی‌ خود را کامل و دقیق بنویسید. همچنین حتما به ساعات پاسخ‌گویی خود اشاره کنید."
          placeholder="متن را وارد کنید"
          multiline
          value={formData.description}
          onChange={(description) =>
            setFormData({ ...formData, description })
          }
        />

        <CustomNumericField
          title="قیمت"
          placeholder="قیمت را به عدد وارد کنید"
          value={formData.price}
          onChange={(price) =>
            setFormData({ ...formData, price })
          }
        />

        <ImageUploader
          onImageSelect={(image) =>
            setFormData({ ...formData, image })
          }
          isUploading={isUploading}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isUploading}
        >
          {isUploading ? "در حال ارسال..." : "ساخت آگهی"}
        </Button>
      </form>
    </AppLayout>
  );
}
