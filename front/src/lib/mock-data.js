const today = new Date()
const y = today.getFullYear()
const m = today.getMonth()

export const mockWorkspaces = [
    {
        id: 'team-project',
        name: '팀 프로젝트',
        isShared: true,
        members: ['user1', 'user2', 'user3'],
    },
    {
        id: 'personal',
        name: '개인 태스크',
        isShared: false,
        members: ['user1'],
    },
    {
        id: 'side-project',
        name: '사이드 프로젝트',
        isShared: false,
        members: ['user1'],
    },
]

export const mockTasks = [
    {
        id: 'task-1',
        title: '프로젝트 기획서 작성',
        workspaceId: 'team-project',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date(y, m, 18),
    },
    {
        id: 'task-2',
        title: '백그 수정 · 코드 리뷰',
        workspaceId: 'team-project',
        status: 'in-progress',
        priority: 'medium',
        dueDate: new Date(y, m, 21),
    },
    {
        id: 'task-3',
        title: 'UI 디자인 리뷰',
        workspaceId: 'personal',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date(y, m, 22),
    },
    {
        id: 'task-4',
        title: '주간 회의 준비',
        workspaceId: 'team-project',
        status: 'done',
        priority: 'low',
        dueDate: new Date(y, m, 14),
    },
    {
        id: 'task-5',
        title: '스프린트 계획',
        workspaceId: 'team-project',
        status: 'todo',
        priority: 'high',
        dueDate: new Date(y, m, 21),
    },
    {
        id: 'task-6',
        title: '디자인 시스템 정리',
        workspaceId: 'side-project',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date(y, m, today.getDate()),
    },
]
