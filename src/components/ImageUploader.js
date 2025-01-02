import { useState } from "react"
import { Box, Typography, IconButton, Stack } from "@mui/material"
import { Camera, Close, AddPhotoAlternate } from "@mui/icons-material"

export function ImageUploader({ onImageSelect }) {
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = event => {
    const file = event.target.files?.[0]
    handleFile(file)
  }

  const handleFile = file => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("لطفا فقط فایل تصویری آپلود کنید")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
      onImageSelect(file)
    }
  }

  const handleDragOver = event => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = event => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = event => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    handleFile(file)
  }

  const handleRemove = event => {
    event.stopPropagation()
    setPreview(null)
    onImageSelect(null)
  }

  if (preview) {
    return (
      <Box
        sx={{
          position: "relative",
          mb: 3,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 1
        }}
      >
        <Box
          component="img"
          src={preview}
          alt="پیش‌نمایش تصویر"
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: 300,
            objectFit: "cover",
            display: "block"
          }}
        />
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            top: 8,
            right: 8
          }}
        >
          <IconButton
            component="label"
            size="small"
            aria-label="تغییر تصویر"
            sx={{
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "background.paper"
              },
              boxShadow: 1
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            <AddPhotoAlternate />
          </IconButton>
          <IconButton
            onClick={handleRemove}
            size="small"
            aria-label="حذف تصویر"
            sx={{
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "background.paper"
              },
              boxShadow: 1
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </Box>
    )
  }

  return (
    <Box
      component="label"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        p: 4,
        border: "2px dashed",
        borderColor: isDragging ? "primary.main" : "grey.300",
        borderRadius: 2,
        cursor: "pointer",
        mb: 3,
        transition: "all 0.2s ease",
        bgcolor: isDragging ? "action.hover" : "transparent",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: "action.hover"
        }
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <Camera
        sx={{
          fontSize: 40,
          color: isDragging ? "primary.main" : "text.secondary"
        }}
      />
      <Typography color={isDragging ? "primary" : "text.secondary"}>
        تصویر را اینجا رها کنید یا کلیک کنید
      </Typography>
    </Box>
  )
}
