import { Grid2 } from "@mui/material"
import AdItem from "./AdItem"

const AdGrid = ({ ads }) => {
    console.log(ads);

    return (<Grid2 container spacing={1}>
        {ads.map((ad, index) => (
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }} item key={index}>
                <AdItem ad={ad} />
            </Grid2>
        ))}
    </Grid2>
    )
}

export default AdGrid;