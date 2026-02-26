



function layout({ children  }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-screen h-screen bg-[#23292e] grid place-content-center">
        {children}
      </div>
    </>
  )
}

export default layout