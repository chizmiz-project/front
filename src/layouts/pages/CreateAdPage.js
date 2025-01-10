import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import ApiService from "../../services/Api";
import AppLayout from "../AppLayout";
import { ImageUploader } from "../../components/ImageUploader";
import { CustomTextField } from "../../components/CustomTextField";
import { CustomNumericField } from "../../components/CustomNumericField";
import CategorySelector from '../../components/category/CategorySelector';
import { useSnackbar } from "../../context/SnackbarProvider";
import { errorColor } from "../../theme";

export default function CreateAdPage() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const [titleErrorText, setTitleErrorText] = useState('');
  const [descriptionErrorText, setDescriptionErrorText] = useState('');
  const [priceErrorText, setPriceErrorText] = useState('');

  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    image: null,
    price: "",
  });

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
        openSnackbar('آگهی با موفقیت ساخته شد', 'success')
        navigate("/");
      } else {
        if (response.isBadRequest) {
          for (let key in response.data) {
            if (key == 'title')
              setTitleErrorText(response.data[key].join("\r\n"));
            if (key == 'description')
              setDescriptionErrorText(response.data[key].join("\r\n"));
            if (key == 'price')
              setPriceErrorText(response.data[key].join("\r\n"));
            if (key == 'main_picture')
              alert('image');
          }
        }
        openSnackbar('خطا در ثبت آگهی', 'error')
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
          onSelect={(categoryId) => {
            setFormData({ ...formData, categoryId })
          }
          }
        />

        <CustomTextField
          title="عنوان آگهی"
          description="در عنوان آگهی به موارد مهم و چشم‌گیر اشاره کنید."
          placeholder="عنوان را وارد کنید"
          value={formData.title}
          helperText={titleErrorText}
          error={titleErrorText !== ''}
          onChange={(title) => {
            setFormData({ ...formData, title })
            setTitleErrorText('')
          }
          }
        />

        <CustomTextField
          title="توضیحات"
          description="جزییات و نکات جالب توجه آگهی‌ خود را کامل و دقیق بنویسید. همچنین حتما به ساعات پاسخ‌گویی خود اشاره کنید."
          placeholder="متن را وارد کنید"
          multiline
          helperText={descriptionErrorText}
          error={descriptionErrorText !== ''}
          value={formData.description}
          onChange={(description) => {
            setFormData({ ...formData, description })
            setDescriptionErrorText('');
          }
          }
        />

        <CustomNumericField
          title="قیمت"
          placeholder="قیمت را به عدد وارد کنید"
          value={formData.price}
          helperText={priceErrorText}
          error={priceErrorText !== ''}
          onChange={(price) => {
            setFormData({ ...formData, price })
            setPriceErrorText('')
          }
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
