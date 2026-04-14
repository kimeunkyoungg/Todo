import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderKanban, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const DEMO_ACCOUNT = {
  email: 'demo@taskflow.com',
  password: 'demo1234',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'register'

  // 로그인 상태
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 회원가입 상태
  const [regEmail, setRegEmail] = useState('')
  const [regName, setRegName] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('')
  const [showRegPassword, setShowRegPassword] = useState(false)
  const [showRegPasswordConfirm, setShowRegPasswordConfirm] = useState(false)
  const [regError, setRegError] = useState('')
  const [isRegLoading, setIsRegLoading] = useState(false)

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setError('')
    setRegError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
      sessionStorage.setItem('user', JSON.stringify({ name: '데모 사용자', email: email }))
      navigate('/dashboard')
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail(DEMO_ACCOUNT.email)
    setPassword(DEMO_ACCOUNT.password)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegError('')

    if (regPassword !== regPasswordConfirm) {
      setRegError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (regPassword.length < 8) {
      setRegError('비밀번호는 8자 이상이어야 합니다.')
      return
    }

    setIsRegLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    // TODO: 실제 회원가입 API 연동
    setIsRegLoading(false)
    alert('회원가입이 완료되었습니다. 로그인해주세요.')
    switchMode('login')
    setEmail(regEmail)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-between bg-card border-r border-border p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <FolderKanban className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Taskflow</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-foreground leading-tight text-balance co">
            팀과 함께 효율적으로
            <span className="block text-primary">일정을 관리하세요</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-max">
            개인 워크스페이스부터 팀 협업까지, Taskflow로 할 일과 일정을 한눈에 관리하세요.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          2026 Taskflow. All rights reserved.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <FolderKanban className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Taskflow</span>
          </div>

          {mode === 'login' ? (
            <>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-2xl font-bold text-foreground">로그인</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  계정에 로그인하여 워크스페이스에 접속하세요
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                  {isLoading ? '로그인 중...' : '로그인'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11"
                  onClick={() => switchMode('register')}
                >
                  회원가입
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-2xl font-bold text-foreground">회원가입</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Taskflow 계정을 만들고 시작하세요
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="reg-email">이메일</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="name@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-name">이름</Label>
                  <Input
                    id="reg-name"
                    type="text"
                    placeholder="홍길동"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">비밀번호</Label>
                  <div className="relative">
                    <Input
                      id="reg-password"
                      type={showRegPassword ? 'text' : 'password'}
                      placeholder="8자 이상 입력하세요"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password-confirm">비밀번호 확인</Label>
                  <div className="relative">
                    <Input
                      id="reg-password-confirm"
                      type={showRegPasswordConfirm ? 'text' : 'password'}
                      placeholder="비밀번호를 다시 입력하세요"
                      value={regPasswordConfirm}
                      onChange={(e) => setRegPasswordConfirm(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPasswordConfirm(!showRegPasswordConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showRegPasswordConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {regError && (
                  <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                    {regError}
                  </p>
                )}

                <Button type="submit" className="w-full h-11" disabled={isRegLoading}>
                  {isRegLoading ? '처리 중...' : '회원가입'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11"
                  onClick={() => switchMode('login')}
                >
                  로그인으로 돌아가기
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
