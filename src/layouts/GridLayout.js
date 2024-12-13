import { AdCard } from "../components/Ad";
import { Box, Grid2 } from "@mui/material";

const sampleAd = {
    id: '1',
    title: 'پژو ۲۰۶ تیپ ۵ مدل ۱۳۹۷',
    price: '۵۷۰,۰۰۰,۰۰۰',
    imageUrl: 'https://mdn.github.io/shared-assets/images/examples/balloon.jpg',
    createdAt: "۲ روز پیش",
    condition: 'used'
};

export default function Grid2Layout() {
    return <Grid2 container spacing={1.2}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(element =>
            <AdCard ad={sampleAd}></AdCard>
        )
        }
    </Grid2>
}