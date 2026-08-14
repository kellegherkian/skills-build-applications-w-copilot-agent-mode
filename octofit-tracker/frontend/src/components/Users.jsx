import { useEffect, useMemo, useState } from 'react'

function normalizeList(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [payload.results, payload.items, payload.data]
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate
    }
  }

  return []
}

function Users({ endpoint }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const payload = await response.json()
        setRows(normalizeList(payload))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load users')
        }
      } finally {
        setLoading(false)
      }
    }

    loadUsers()

    return () => controller.abort()
  }, [endpoint])

  const columns = useMemo(() => {
    if (rows.length === 0) {
      return []
    }

    return Object.keys(rows[0])
  }, [rows])

  return (
    <section>
      <h2 className="mb-3">Users</h2>
      <p className="text-body-secondary mb-3">
        Endpoint: <code>{endpoint}</code>
      </p>

      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">Unable to load users: {error}</div>}
      {!loading && !error && rows.length === 0 && <div className="alert alert-info">No users returned.</div>}

      {!loading && !error && rows.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id ?? index}>
                  {columns.map((column) => (
                    <td key={column}>{String(row[column] ?? '')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
