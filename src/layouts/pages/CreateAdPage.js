import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ApiService from "../../services/api";
import AppLayout from "../AppLayout";
import { ImageUploader } from "../../components/ImageUploader";
import { CategorySelector } from "../../components/CategorySelector";
import { CustomTextField } from "../../components/CustomTextField";
import { CustomNumericField } from "../../components/CustomNumericField";

export default function CreateAdPage() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    image: null,
    price: "",
  });
  const [categories, setCategories] = useState([]);

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
          description="عنوان آگهی تاثیر به سزایی در جذب کردن مخاطبان به آگهی شما دارد"
          placeholder="متن را وارد کنید"
          value={formData.title}
          onChange={(title) =>
            setFormData({ ...formData, title })
          }
        />

        <CustomTextField
          title="توضیحات"
          description="با ارائه توضیحات کامل شانس فروش شما بالاتر می‌رود"
          placeholder="متن را وارد کنید"
          multiline
          value={formData.description}
          onChange={(description) =>
            setFormData({ ...formData, description })
          }
        />

        <CustomNumericField
          title="قیمت"
          placeholder="قیمت را وارد کنید"
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
