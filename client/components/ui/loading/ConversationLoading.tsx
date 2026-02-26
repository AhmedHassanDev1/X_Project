

function ConversationLoading() {
  return (
    <div className="w-full h-20 p-3 flex gap-3 items-center">
         <div className=" h-full aspect-square rounded-full bg-zinc-800 skeleton-loading-animate"></div>
         <div className="flex-1  space-y-3">
            <div className="w-11/12 h-4 rounded-lg   bg-zinc-800 skeleton-loading-animate"></div>
            <div className="w-2/3 h-4   rounded-lg bg-zinc-800 skeleton-loading-animate"></div>
         </div>
    </div>
  )
}

export default ConversationLoading