"use client"

import { HtmlHTMLAttributes } from "react"
import { useInView } from "react-intersection-observer"

type InfiniteScrollContainerProps = {
    endPosition: "top" | "bottom"
    fetchMore: () => void
    isloading: boolean
    isFetchingNextPage: boolean
    children?: React.ReactNode
    props?: HtmlHTMLAttributes<HTMLElement>
}
function InfiniteScrollContainer({ fetchMore, isloading, isFetchingNextPage, endPosition, children, ...props }: InfiniteScrollContainerProps) {
    const { ref } = useInView({
        threshold: 0.5,
        onChange: (inView) => {
            console.log(inView);
            if (inView && !isloading && !isFetchingNextPage) {
                fetchMore()
            }
        }
    })
    return (
        <section {...props}>
            {endPosition === "top" && <div ref={ref} className={`w-full h-10 ${endPosition === "top" ? "mb-5" : "mt-5"}`}></div>}
            {children}
            {endPosition === "bottom" && <div ref={ref} className={`w-full h-10 ${endPosition === "bottom" ? "mb-5" : "mt-5"}`}></div>}
        </section>
    )
}

export default InfiniteScrollContainer