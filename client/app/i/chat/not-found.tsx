import { Button, Stack, Typography } from "@mui/material";
import { MdOutlineLocalPostOffice } from "react-icons/md";
function NotFound() {
  return (
    <Stack sx={{padding:"8px"}} justifyContent={"center"} alignItems={"center"} spacing={2}>
      <div className="p-4 bg-slate-800 rounded-full">
        <MdOutlineLocalPostOffice size={50}   />
      </div>
      <Typography variant="h6">Start Conversation</Typography>
      <Typography variant="body2">Choose from your existing conversations, or start a new one.</Typography>
      <Button variant="contained"  sx={{background:"white",color:"black", fontWeight:"bold"}} >New Chat</Button>
    </Stack>
  )
}

export default NotFound