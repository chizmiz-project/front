import { Box, TextField as MuiTextField, Typography } from "@mui/material"

export function CustomTextField({
  title,
  description,
  placeholder,
  multiline = false,
  value,
  onChange
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {description}
      </Typography>
      <MuiTextField
        fullWidth
        placeholder={placeholder}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        value={value}
        onChange={e => onChange(e.target.value)}
        variant="outlined"
      />
    </Box>
  )
}
