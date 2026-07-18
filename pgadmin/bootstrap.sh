#!/bin/sh
set -eu

PGADMIN_EMAIL="${PGADMIN_DEFAULT_EMAIL:-admin@test.com}"
PGADMIN_USER_DIR="$(printf '%s' "$PGADMIN_EMAIL" | tr '@' '_' | tr '[:upper:]' '[:lower:]')"
PGADMIN_STORAGE_DIR="/var/lib/pgadmin/storage/${PGADMIN_USER_DIR}"

mkdir -p "$PGADMIN_STORAGE_DIR"

cat > /tmp/servers.json <<EOF
{
  "Servers": {
    "1": {
      "Name": "Game PostgreSQL",
      "Group": "Servers",
      "Host": "${DB_HOST:-postgres}",
      "Port": ${DB_PORT:-5432},
      "MaintenanceDB": "${POSTGRES_DB:-game_db}",
      "Username": "${POSTGRES_USER:-gameuser}",
      "SSLMode": "prefer",
      "ConnectionParameters": {
        "sslmode": "prefer",
        "passfile": "pgpass"
      }
    }
  }
}
EOF

cat > "${PGADMIN_STORAGE_DIR}/pgpass" <<EOF
${DB_HOST:-postgres}:${DB_PORT:-5432}:*:${POSTGRES_USER:-gameuser}:${POSTGRES_PASSWORD}
EOF

chmod 600 "${PGADMIN_STORAGE_DIR}/pgpass"

exec /entrypoint.sh
