import { Grid, Paper, Typography } from "@mui/material"
import { primaryColor } from "../theme"

export function CategorySelector({ categories, selectedCategory, onSelect }) {
  return (
    <Grid container spacing={1} sx={{ mb: 3 }}>
      {categories.map(category => (
        <Grid item xs={4} xl={2} key={category.id}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              gap: 1,
              boxSizing: 'border-box',
              border: category.id === selectedCategory ? 2 : 0,
              borderColor: primaryColor
            }}
            onClick={() => onSelect(category.id)}
          >
            <Typography width={'100%'} variant="body2" align="center">
              {category.title}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
