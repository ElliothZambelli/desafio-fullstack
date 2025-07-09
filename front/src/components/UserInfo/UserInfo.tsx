import { useUser } from '../../hooks/useUser'

export function UserInfo() {
  const { user, loading, error } = useUser()

  if (loading) return <p>Carregando usuário...</p>
  if (error) return <p>{error}</p>
  if (!user) return <p>Usuário não encontrado</p>

  return (
    <div>
      <h2>Bem-vindo, {user.name}!</h2>
      <p>Email: {user.email}</p>
    </div>
  )
}
