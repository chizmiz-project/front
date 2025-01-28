import { useEffect, useState } from "react"
import {
    Box,
    Typography,
    IconButton,
    CircularProgress,
    Grid,
} from "@mui/material"
import { Close, AddAPhoto } from "@mui/icons-material"
import ApiService from "../services/Api"
import { useSnackbar } from "../context/SnackbarProvider"

export default function ImageUploader({
    uploadedFiles,
    onFilesChange,
    maxImages = 5
}) {
    const [images, setImages] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState(null)
    
    const {openSnackbar} = useSnackbar();
    useEffect(() => {
        openSnackbar(error, 'error', !!error)
      }, [error]);


    const handleFileSelect = event => {
        const files = Array.from(event.target.files || [])
        handleFiles(files)
    }

    const handleFiles = async files => {
        if (images.length + files.length > maxImages) {
            setError(`حداکثر ${maxImages} تصویر می‌توانید آپلود کنید`)
            return
        }

        const validFiles = files.filter(file => {
            if (!file.type.startsWith("image/")) {
                setError("لطفا فقط فایل تصویری آپلود کنید")
                return false
            }
            return true
        })

        const newImages = validFiles.map(file => ({
            id: Math.random()
                .toString(36)
                .substr(2, 9),
            file,
            preview: URL.createObjectURL(file),
            isUploading: true
        }))

        setImages(prev => [...prev, ...newImages])

        for (const image of newImages) {
            const response = await ApiService.uploadFile(image.file)

            if (response.isSuccess) {
                onFilesChange([...uploadedFiles, {picture: response.data.file_url}])

                setImages(prev =>
                    prev.map(img =>
                        img.id === image.id ? { ...img, isUploading: false } : img
                    )
                )
            } else {
                setImages(prev =>
                    prev.map(img =>
                        img.id === image.id
                            ? { ...img, isUploading: false, error: "خطا در آپلود تصویر" }
                            : img
                    )
                )
            }
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
        const files = Array.from(event.dataTransfer.files)
        handleFiles(files)
    }

    const handleRemove = imageId => {
        const imageToRemove = images.find(img => img.id === imageId)
        if (!imageToRemove) return

        // Remove from parent's file list
        const imageIndex = images.findIndex(img => img.id === imageId)
        const updatedFiles = [...uploadedFiles]
        updatedFiles.splice(imageIndex, 1)
        onFilesChange(updatedFiles)

        // Remove from local state and cleanup
        setImages(prev => {
            URL.revokeObjectURL(imageToRemove.preview)
            return prev.filter(img => img.id !== imageId)
        })
    }

    return (
        <>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {images.map(image => (
                    <Grid item xs={6} sm={4} key={image.id}>
                        <Box
                            sx={{
                                position: "relative",
                                borderRadius: 2,
                                overflow: "hidden",
                                boxShadow: 1,
                                aspectRatio: "1"
                            }}
                        >
                            <Box
                                component="img"
                                src={image.preview || "/placeholder.svg"}
                                alt="تصویر آپلود شده"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    filter: image.isUploading ? "blur(2px)" : "none",
                                    transition: "filter 0.2s"
                                }}
                            />
                            {image.isUploading ? (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }}
                                >
                                    <CircularProgress size={24} />
                                </Box>
                            ) : (
                                <IconButton
                                    onClick={() => handleRemove(image.id)}
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        bgcolor: "background.paper",
                                        "&:hover": {
                                            bgcolor: "background.paper"
                                        },
                                        boxShadow: 1
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            )}
                            {image.error && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        bgcolor: "error.main",
                                        color: "white",
                                        p: 0.5,
                                        fontSize: "0.75rem",
                                        textAlign: "center"
                                    }}
                                >
                                    {image.error}
                                </Box>
                            )}
                        </Box>
                    </Grid>
                ))}

                {images.length < maxImages && (
                    <Grid item xs={6} sm={4}>
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
                                height: "100%",
                                minHeight: 150,
                                border: "2px dashed",
                                borderColor: isDragging ? "primary.main" : "grey.300",
                                borderRadius: 2,
                                cursor: "pointer",
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
                                multiple
                                style={{ display: "none" }}
                            />
                            <AddAPhoto
                                sx={{
                                    fontSize: 40,
                                    color: isDragging ? "primary.main" : "text.secondary"
                                }}
                            />
                            <Typography
                                variant="caption"
                                color={isDragging ? "primary" : "text.secondary"}
                                align="center"
                            >
                                تصاویر را اینجا رها کنید
                                <br />
                                یا کلیک کنید
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </>
    )
}
