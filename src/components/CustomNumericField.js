import { Box, TextField as MuiTextField, Typography } from "@mui/material";

export function CustomNumericField({
  title,
  description,
  placeholder,
  value,
  onChange,
  error,
  helperText
}) {
  const handleChange = (e) => {
    const newValue = e.target.value;

    // Only update if the value is a valid number or empty
    if (!newValue || !isNaN(newValue)) {
      onChange(newValue);
    }
  };

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
        value={value}
        onChange={handleChange}
        variant="outlined"
        type="number"
        error={error}
        helperText={helperText}
      />
    </Box>
  );
}
