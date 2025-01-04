import { Box, TextField, Typography } from "@mui/material"

export function CustomTextField({
  title,
  description,
  placeholder,
  multiline = false,
  value,
  label,
  onChange
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1">
        {description}
      </Typography>
      <TextField
        
        label={label}
        fullWidth
        placeholder={placeholder}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </Box>
  )
}
