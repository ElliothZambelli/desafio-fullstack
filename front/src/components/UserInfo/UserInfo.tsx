import { useUser } from '../../hooks/useUser'

export function UserInfo() {
  const { user, loading, error } = useUser()

  if (loading) return <p>Carregando usuário...</p>
  if (error) return <p>{error}</p>
  if (!user) return <p>Usuário não encontrado</p>

  return (
    <div className="flex flex-col">
      <p className="text-xl font-semibold text-gray-800">{user.name}</p>
      <p className="text-sm text-gray-600">{user.email}</p>
    </div>
  )
}
