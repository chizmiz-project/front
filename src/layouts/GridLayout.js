import { AdCard } from "../components/Ad";
import { Box, Grid2 } from "@mui/material";
import cars from '../resources/cars.json'


export default function Grid2Layout() {
    return <Grid2 container spacing={1.2}>
        {cars.map(element =>
            <AdCard ad={element}></AdCard>
        )
        }
    </Grid2>
}