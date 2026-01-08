'use client'

const Footer = () => {
  return (
    <footer className="flex px-8 lg:px-24 pt-8 pb-8 items-center justify-center -mt-20 lg:-mt-24 relative z-30">
      <div className="flex flex-col gap-2 items-center">
        <p className="font-zed text-gray-300 text-[12px] text-center">
          Сделано <span className="gradient-text">с любовью</span>
        </p>
        <p className="font-zed text-gray-500/40 text-[9px] text-center opacity-30">
          Идея портфолио взята у другого кодера
        </p>
      </div>
    </footer>
  )
}

export default Footer
