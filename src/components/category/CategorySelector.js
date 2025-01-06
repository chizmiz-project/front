import { Grid2, Paper, Typography } from "@mui/material"
import { primaryColor } from "../../theme"

export function CategorySelector({ categories, selectedCategory, onSelect }) {
  return (
<Grid2 container spacing={2} mb={2}>
      {categories.map(category => (
        <Grid2 item size={{ xs: 4, md: 3, lg: 2 }} key={category.id}>
          <Paper
            sx={{ p: 2, 
              textAlign: 'center', 
              border: category.id === selectedCategory ? 2 : 0,
              borderColor: primaryColor
            }}
            onClick={() => onSelect(category.id)}
          >
            <Typography width={'100%'} variant="body2">{category.title}</Typography>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  )
}