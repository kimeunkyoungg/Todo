import { useState } from 'react'
import {
    Calendar,
    CheckSquare,
    ChevronDown,
    Home,
    Plus,
    Settings,
    Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function NavItem({ icon: Icon, label, active }) {
    return (
        <button
            className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                active
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
        >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
        </button>
    )
}

export default function Sidebar({ workspaces, currentWorkspaceId, onWorkspaceChange }) {
    const [expanded, setExpanded] = useState(true)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    return (
        <aside className="w-60 shrink-0 flex flex-col h-full bg-sidebar border-r border-sidebar-border">
            <nav className="flex-1 overflow-y-auto p-3">
                {/* 기본 내비게이션 */}
                <div className="space-y-0.5 mb-5">
                    <NavItem icon={Home} label="홈" active />
                    <NavItem icon={Calendar} label="캘린더" />
                    <NavItem icon={CheckSquare} label="모든 할 일" />
                </div>

                {/* 워크스페이스 섹션 헤더 */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex w-full items-center justify-between px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-sidebar-foreground transition-colors"
                >
                    <span>워크스페이스</span>
                    <ChevronDown
                        className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            expanded && 'rotate-180'
                        )}
                    />
                </button>

                {/* 워크스페이스 목록 */}
                {expanded && (
                    <div className="mt-1 space-y-0.5">
                        {workspaces.map((ws) => (
                            <button
                                key={ws.id}
                                onClick={() => onWorkspaceChange(ws.id)}
                                className={cn(
                                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                    ws.id === currentWorkspaceId
                                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                        : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                )}
                            >
                                <div
                                    className={cn(
                                        'flex h-6 w-6 items-center justify-center rounded text-xs font-medium shrink-0',
                                        ws.isShared
                                            ? 'bg-info/20 text-info'
                                            : 'bg-primary/20 text-primary'
                                    )}
                                >
                                    {ws.isShared ? (
                                        <Users className="h-3.5 w-3.5" />
                                    ) : (
                                        ws.name.charAt(0)
                                    )}
                                </div>
                                <span className="flex-1 truncate text-left">{ws.name}</span>
                                {ws.isShared && (
                                    <span className="text-xs text-muted-foreground">
                                        {ws.members.length}명
                                    </span>
                                )}
                            </button>
                        ))}

                        {/* 워크스페이스 추가 */}
                        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                            <div className="flex h-6 w-6 items-center justify-center rounded border border-dashed border-muted-foreground/50 shrink-0">
                                <Plus className="h-3.5 w-3.5" />
                            </div>
                            <span>워크스페이스 추가</span>
                        </button>
                    </div>
                )}
            </nav>

            {/* 하단 유저 정보 */}
            <div className="border-t border-sidebar-border p-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary shrink-0">
                        
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-sidebar-foreground">김철수</p>
                        <p className="truncate text-xs text-muted-foreground">cheolsu@example.com</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    >
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </aside>
    )
}