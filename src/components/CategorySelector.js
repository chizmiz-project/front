import { Grid, Paper, Typography } from "@mui/material"
import { Check } from "@mui/icons-material"

export function CategorySelector({ categories, selectedCategory, onSelect }) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {categories.map(category => (
        <Grid item xs={3} key={category.id}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              bgcolor: "grey.100",
              cursor: "pointer",
              position: "relative",
              boxSizing: "border-box",
              border: category.id === selectedCategory ? 2 : 0,
              borderColor: "primary.main"
            }}
            onClick={() => onSelect(category.id)}
          >
            <Typography variant="body2" align="center">
              {category.title}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
