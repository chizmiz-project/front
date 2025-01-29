import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@mui/material";
import ApiService from "../../services/Api";
import AppLayout from "../AppLayout";
import { CustomTextField } from "../../components/CustomTextField";
import { CustomNumericField } from "../../components/CustomNumericField";
import CategorySelector from "../../components/category/CategorySelector";
import { useSnackbar } from "../../context/SnackbarProvider";
import ImageUploader from "../../components/ImageUploader";

const STATUS_CHOICES = {
  1: "فعال",
  2: "رزرو شده",
  3: "فروخته شد",
};

export default function EditAdPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    image: null,
    price: "",
    status: 1,
  });

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const response = await ApiService.get(`/advertisement/${id}`);
        if (response.isSuccess) {
          const { category, title, description, price, status, pictures } = response.data;
          setFormData({ categoryId: category, title, description, price, status });
          setUploadedFiles(pictures);
        } else {
          alert("خطا در دریافت اطلاعات آگهی");
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
        alert("مشکلی در دریافت اطلاعات رخ داد");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await ApiService.get("/category");
        if (response.isSuccess) {
          setCategories(response.data);
        } else {
          alert("خطا در دریافت دسته بندی‌ها");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("مشکلی در دریافت دسته بندی‌ها رخ داد");
      }
    };

    fetchAdData();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const data = {
      category: formData.categoryId,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      status: formData.status,
      pictures: uploadedFiles,
    };

    try {
      const response = await ApiService.put(`/advertisement/${id}/`, data);
      if (response.isSuccess) {
        openSnackbar("آگهی با موفقیت ویرایش شد", "success");
        navigate("/");
      } else {
        openSnackbar("خطا در ویرایش آگهی", "error");
      }
    } catch (error) {
      console.error("Error updating ad:", error);
      alert("مشکلی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AppLayout title="ویرایش آگهی">
      <form onSubmit={handleSubmit}>
        <CategorySelector
          categories={categories}
          selectedCategory={formData.categoryId}
          onSelect={(categoryId) => setFormData({ ...formData, categoryId })}
        />

        <CustomTextField
          title="عنوان آگهی"
          placeholder="عنوان را وارد کنید"
          value={formData.title}
          onChange={(title) => setFormData({ ...formData, title })}
        />

        <CustomTextField
          title="توضیحات"
          placeholder="متن را وارد کنید"
          multiline
          value={formData.description}
          onChange={(description) => setFormData({ ...formData, description })}
        />

        <CustomNumericField
          title="قیمت"
          placeholder="قیمت را به عدد وارد کنید"
          value={formData.price}
          onChange={(price) => setFormData({ ...formData, price })}
        />

        <Typography variant="h2" gutterBottom>
          وضعیت آگهی
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            {Object.entries(STATUS_CHOICES).map(([value, label]) => (
              <MenuItem key={value} value={parseInt(value)}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ImageUploader
          uploadedFiles={uploadedFiles}
          onFilesChange={setUploadedFiles}
          maxImages={5}
        />

        <Button type="submit" fullWidth variant="contained" size="large" disabled={isUploading}>
          {isUploading ? "در حال ارسال..." : "ویرایش آگهی"}
        </Button>
      </form>
    </AppLayout>
  );
}
