import { AdCard } from "../components/Ad";
import { Box, Grid2 } from "@mui/material";

const sampleAd = {
    id: '1',
    title: 'پژو 206 تیپ 5، مدل 1397',
    price: 517000000,
    imageUrl: 'https://mdn.github.io/shared-assets/images/examples/balloon.jpg',
    createdAt: "۲ روز پیش",
    condition: 'used'
};

export default function Grid2Layout() {
    return <Grid2 container spacing={2}>
        <Grid2>
            <AdCard ad={sampleAd}></AdCard>
        </Grid2>
        <Grid2>
            <AdCard ad={sampleAd}></AdCard>
        </Grid2>
        <Grid2>
            <AdCard ad={sampleAd}></AdCard>
        </Grid2>
    </Grid2>
}