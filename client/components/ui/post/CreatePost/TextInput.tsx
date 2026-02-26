"use client"
import { ChangeEvent, forwardRef, useContext } from "react"
import { CreatePostContext } from "."


type TextInputPropsType = React.InputHTMLAttributes<HTMLInputElement>

const TextInput = forwardRef<HTMLInputElement, TextInputPropsType>(
  (props, ref) => {
    const { textContent, setTextContent } = useContext(CreatePostContext)

    return (
      <div>
        <input
          ref={ref}
          type="text"
          value={textContent || ""}
          className="w-full p-2 text-xl"
          placeholder="what’s happening?"
          onChange={(e) => setTextContent(e.target.value)}
          {...props}
        />
      </div>
    )
  }
)
TextInput.displayName = "TextInput"
export default TextInput