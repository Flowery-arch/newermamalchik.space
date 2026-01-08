'use client'

import { ToolsIcon, LaptopIcon, ServerIcon, GearIcon, TypeScriptIcon, ReactIcon, NextJSIcon, TailwindIcon, BunIcon, PostgreSQLIcon, RedisIcon, DockerIcon, NginxIcon, GithubIcon, JavaScriptIcon, DiscordIcon } from './Icons'

interface Skill {
  name: string
  color: string
  icon?: React.ReactNode
}

const frontendSkills: Skill[] = [
  { name: 'TypeScript', color: '#3b82f6', icon: <TypeScriptIcon size={14} /> },
  { name: 'React', color: '#10b981', icon: <ReactIcon size={14} /> },
  { name: 'Next.js', color: '#22c55e', icon: <NextJSIcon size={14} /> },
  { name: 'Tailwind CSS', color: '#06b6d4', icon: <TailwindIcon size={14} /> },
]

const backendSkills: Skill[] = [
  { name: 'TypeScript', color: '#3b82f6', icon: <TypeScriptIcon size={14} /> },
  { name: 'JavaScript', color: '#facc15', icon: <JavaScriptIcon size={14} /> },
  { name: 'Bun', color: '#facc15', icon: <BunIcon size={14} /> },
  { name: 'PostgreSQL', color: '#3b82f6', icon: <PostgreSQLIcon size={14} /> },
  { name: 'Redis', color: '#ef4444', icon: <RedisIcon size={14} /> },
  { name: 'Discord.js', color: '#5865F2', icon: <DiscordIcon size={14} /> },
]

const tools: Skill[] = [
  { name: 'Docker', color: '#3b82f6', icon: <DockerIcon size={14} /> },
  { name: 'GitHub', color: '#ffffff', icon: <GithubIcon size={14} /> },
  { name: 'Nginx', color: '#22c55e', icon: <NginxIcon size={14} /> },
]

const Skills = () => {
  // Функция для конвертации hex в rgba с прозрачностью
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <div id="skillset" className="flex flex-col pl-6 pr-4 sm:px-8 lg:px-24 relative">
      {/* Декоративные символы для Skills */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden sm:block">
        <div className="absolute top-16 left-12 text-4xl lg:text-6xl text-white/5 font-mono select-none">{"TS"}</div>
        <div className="absolute top-28 right-20 text-3xl lg:text-5xl text-white/5 font-mono select-none">{"JS"}</div>
        <div className="absolute bottom-24 left-24 text-5xl lg:text-7xl text-white/5 font-mono select-none">{"<>"}</div>
        <div className="absolute bottom-32 right-12 text-4xl lg:text-6xl text-white/5 font-mono select-none">{"{}"}</div>
        <div className="absolute top-1/2 left-1/6 text-3xl lg:text-4xl text-white/5 font-mono select-none">{"()"}</div>
        <div className="absolute top-1/3 right-1/5 text-3xl lg:text-5xl text-white/5 font-mono select-none">{"[]"}</div>
        <div className="absolute bottom-1/4 left-1/3 text-3xl lg:text-4xl text-white/5 font-mono select-none">{"=>"}</div>
        <div className="absolute top-1/5 right-1/3 text-3xl lg:text-5xl text-white/5 font-mono select-none">{"..."}</div>
      </div>
      <div className="flex flex-col items-start text-start gap-4 sm:gap-6 lg:gap-10 z-50 mt-4 sm:mt-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="hidden lg:flex items-center p-2 sm:p-3 rounded-xl bg-red-700/10">
            <ToolsIcon className="text-red-100" size={20} />
          </div>
          <h1 className="text-white font-raleway font-semibold text-[32px] sm:text-[38px] md:text-[42px] lg:text-6xl leading-tight lg:leading-18">
            Мои <span className="text-red-100 font-raleway tracking-tighter font-semibold inline-flex items-center gap-6">навыки</span>.
          </h1>
        </div>
        
        <p className="text-[12px] sm:text-[13px] lg:text-[14px] font-zed text-white/80 lg:max-w-4xl">
          Я создаю быстрые, надежные и масштабируемые веб-платформы. 
          В работе с фронтендом использую TypeScript, React и Next.js, а на бэкенде TypeScript с Bun, также изучаю другие языки, такие как Go. 
          У меня есть опыт работы с CI/CD, контейнеризацией и современными средами развертывания, стремлюсь к эффективной и удобной в поддержке инфраструктуре на всех проектах.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-28 mt-4">
          {/* Frontend */}
          <div className="flex flex-col gap-12 lg:gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:gap-4 items-start lg:items-center">
                <div className="hidden lg:flex p-2 rounded-xl bg-teal-700/10">
                  <LaptopIcon className="text-teal-100" size={22} />
                </div>
                <h1 className="text-white font-raleway font-semibold text-2xl leading-18">
                  <span className="font-raleway text-teal-100 tracking-tighter font-semibold">Фронтенд</span> разработка.
                </h1>
              </div>
              <p className="font-zed text-white/60 max-w-2xl text-[13px] whitespace-pre-line">
                Я разрабатываю адаптивные и доступные сайты с упором на чистый дизайн, плавные взаимодействия и внимание к деталям.
              </p>
              <div className="flex flex-wrap gap-4 mt-4 items-center">
                {frontendSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center px-6 border-dotted rounded-full border-1 hover:scale-[103%] hover:shadow-xl cursor-default py-1.5 transition-all duration-300"
                    style={{
                      backgroundColor: hexToRgba(skill.color, 0.05),
                      borderColor: hexToRgba(skill.color, 0.2),
                      color: skill.color
                    }}
                  >
                    {skill.icon && <span style={{ color: skill.color }}>{skill.icon}</span>}
                    <p className="font-zed text-[11px]" style={{ color: skill.color }}>{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:gap-4 items-start lg:items-center">
                <div className="hidden lg:flex p-2 rounded-xl bg-fuchsia-700/10">
                  <GearIcon className="text-fuchsia-100" size={22} />
                </div>
                <h1 className="text-white font-raleway font-semibold text-2xl leading-18">
                  <span className="font-raleway text-fuchsia-100 tracking-tighter font-semibold">Окружение</span> и CI/CD.
                </h1>
              </div>
              <p className="font-zed text-white/60 max-w-2xl text-[13px]">
                Я использую современные инструменты, чтобы упростить разработку и развертывание, обеспечивая стабильную инфраструктуру и удобные процессы работы.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center px-6 border-dotted rounded-full border-1 hover:scale-[103%] hover:shadow-xl cursor-default py-2 transition-all duration-300"
                    style={{
                      backgroundColor: hexToRgba(tool.color, 0.05),
                      borderColor: hexToRgba(tool.color, 0.2),
                      color: tool.color
                    }}
                  >
                    {tool.icon && <span style={{ color: tool.color }}>{tool.icon}</span>}
                    <p className="font-zed text-[11px]" style={{ color: tool.color }}>{tool.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Backend и Footer */}
          <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:gap-4 items-start lg:items-center">
              <div className="hidden lg:flex p-2 rounded-xl bg-blue-700/10">
                <ServerIcon className="text-blue-100" size={22} />
              </div>
              <h1 className="text-white font-raleway font-semibold text-2xl leading-18">
                <span className="font-raleway text-blue-100 tracking-tighter font-semibold">Бекенд</span> разработка.
              </h1>
            </div>
              <p className="font-zed text-white/60 max-w-2xl text-[13px]">
                Я создаю стабильные и эффективные серверные системы, обеспечивающие надежную работу и легкую интеграцию с другими сервисами.
              </p>
              <div className="flex flex-wrap gap-4 mt-4 items-center">
                {backendSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center px-6 border-dotted rounded-full border-1 hover:scale-[103%] hover:shadow-xl cursor-default py-1.5 transition-all duration-300"
                    style={{
                      backgroundColor: hexToRgba(skill.color, 0.05),
                      borderColor: hexToRgba(skill.color, 0.2),
                      color: skill.color
                    }}
                  >
                    {skill.icon && <span style={{ color: skill.color }}>{skill.icon}</span>}
                    <p className="font-zed text-[11px]" style={{ color: skill.color }}>{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="hidden lg:flex items-center justify-center mt-auto">
              <footer className="flex flex-col gap-2 items-center justify-center">
                <p className="font-zed text-gray-300 text-[12px] text-center">
                  Сделано <span className="gradient-text">с любовью</span>
                </p>
                <p className="font-zed text-gray-500/40 text-[9px] text-center opacity-30">
                  Идея портфолио взята у другого кодера
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
