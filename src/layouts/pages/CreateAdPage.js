import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, TextField } from "@mui/material"
import ApiService from "../../services/api"
import AppLayout from "../AppLayout"
import { ImageUploader } from "../../components/ImageUploader"
import { CategorySelector } from "../../components/CategorySelector"
import { CustomTextField } from "../../components/CustomTextField"

const categories = [
  { id: "1", title: "املاک" },
  { id: "2", title: "املاک" },
  { id: "3", title: "املاک" },
  { id: "4", title: "املاک" },
  { id: "5", title: "املاک" },
  { id: "6", title: "املاک" },
  { id: "7", title: "املاک" }
]

export default function CreateAdPage() {
  const navigate = useNavigate()
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    image: null,
    price: ""
  })

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
