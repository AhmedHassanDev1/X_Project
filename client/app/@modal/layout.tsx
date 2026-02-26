


function layout({ children }: { children: React.ReactNode}) {
  return (
    <>
      <div className="w-screen min-h-screen grid place-content-center bg-[#3e3e6a56] fixed inset-0">
        {children}
      </div>
      
    </>
  )
}

export default layout