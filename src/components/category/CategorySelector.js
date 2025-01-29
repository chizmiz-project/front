import { Grid2, Paper, Typography } from "@mui/material"
import { primaryColor } from "../../context/Configs"

export default function CategorySelector({ categories, selectedCategory, onSelect }) {
  return (
<Grid2 container spacing={2} mb={2}>
      {categories.map(category => (
        <Grid2 item size={{ xs: 4, md: 3, lg: 2 }} key={category.id}>
          <Paper
            sx={{ p: 2, 
              textAlign: 'center', 
              backgroundColor: category.id === selectedCategory ? primaryColor : 'background.input',
              color: category.id === selectedCategory ? 'white' : 'text.secondary',
              transition: 'all .3s'
            }}
            onClick={() => onSelect(category.id)}
          >
            <Typography width={'100%'} variant="category">{category.title}</Typography>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  )
}