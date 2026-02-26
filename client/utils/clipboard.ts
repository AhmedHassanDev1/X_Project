
export const writeTextInClipboard =async(text:string)=>{
      try {
         const res= await navigator.clipboard.writeText(text)
         console.log("Text copied to clipboard",res);
         
      } catch (err) {
         console.log('Failed to copy text: ', err);
         
      }

}
