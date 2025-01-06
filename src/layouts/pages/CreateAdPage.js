import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import ApiService from "../../services/api"
import AppLayout from "../AppLayout"
import { ImageUploader } from "../../components/ImageUploader"
import { CategorySelector } from "../../components/category/CategorySelector"
import { CustomTextField } from "../../components/CustomTextField"

export default function CreateAdPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    image: null,
    price: ""
  })

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await ApiService.get('/category/')
      console.log(response)
      if (response.isSuccess)
        setCategories(response.data)
      console.log(response.data)
    }

    fetchCategories();
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setIsUploading(true)

    const data = {
      categoryId: formData.categoryId,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      main_picture: formData.image || undefined,
    }
    console.log(data)
    const response = await ApiService.createAd(data);
    console.log(response.data)
    setIsUploading(false)
  }

  return (
    <AppLayout title="ساخت آگهی">
      <form onSubmit={handleSubmit}>
        <CategorySelector
          categories={categories}
          selectedCategory={formData.categoryId}
          onSelect={categoryId => setFormData({ ...formData, categoryId })}
        />

        <CustomTextField
          title="عنوان فیلد"
          description="توضیحات بیشتر درباره فیلدی که قرار است پر شود"
          placeholder="متن را وارد کنید"
          value={formData.title}
          onChange={title => setFormData({ ...formData, title })}
        />

        <CustomTextField
          title="توضیحات"
          description="توضیحات بیشتر درباره فیلدی که قرار است پر شود"
          placeholder="متن را وارد کنید"
          multiline
          value={formData.description}
          onChange={description => setFormData({ ...formData, description })}
        />

        <CustomTextField
          title="قیمت"
          placeholder="قیمت را وارد کنید"
          value={formData.price}
          onChange={price => setFormData({ ...formData, price })}
        />

        <ImageUploader
          onImageSelect={image => setFormData({ ...formData, image })}
          isUploading = {isUploading}
        />

        <Button type="submit" fullWidth variant="contained" size="large">
          ساخت آگهی
        </Button>
      </form>
    </AppLayout>
  )
}
