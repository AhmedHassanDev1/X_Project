import { topicsTrending } from "@/constants/topicsTrending"
import { Link, Stack, Typography } from "@mui/material"

function TrendingList() {
    return (
        <div className="w-full max-w-80  rounded-2xl border-solid border-[1px] border-zinc-700 p-2 ">
            <Typography variant="h6" fontWeight={"bold"}>What’s happening</Typography>
            <Stack >
                {topicsTrending.slice(0,6).map(el => (
                    <div
                        key={el.title}
                        className="flex flex-col p-2 hover:bg-stone-900 cursor-pointer">
                        <Typography sx={{color:"gray"}} variant="body2">trending in {el.location}</Typography>
                        <Typography variant="subtitle2">{el.title}</Typography>
                    </div>
                ))}
            </Stack>
            <Link margin={"5px"} href="#">show more</Link>
        </div>
    )
}

export default TrendingList