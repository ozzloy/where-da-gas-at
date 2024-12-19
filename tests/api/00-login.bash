#! /usr/bin/env bash

# Make initial GET request and save cookies
echo "Making GET request to /api/auth..."
wget --server-response \
     --save-cookies cookies.txt \
     --keep-session-cookies \
     --output-document response1.txt \
     "http://localhost:8000/api/auth"

# Extract and display full GET request/response
echo -e "\n=== GET Request ==="
echo "GET /api/auth HTTP/1.1"
echo "Host: localhost:8000"
echo "User-Agent: Wget"
echo "Accept: */*"
echo -e "Connection: close\n"

echo "=== GET Response ==="
cat response1.txt
echo -e "\n=== GET Cookies Saved ==="
cat cookies.txt

# Extract CSRF token from cookies
csrf_token=$(grep "csrf_token" cookies.txt | cut -f 7)

# Make POST request using saved cookies and CSRF token
echo -e "\nMaking POST request to /api/auth/login..."
wget --server-response \
     --load-cookies cookies.txt \
     --header="Content-Type: application/json" \
     --header="X-CSRF-Token: ${csrf_token}" \
     --post-data='{"email":"demo@example.com","password":"password"}' \
     --output-document response2.txt \
     "http://localhost:8000/api/auth/login"

# Extract and display full POST request/response
echo -e "\n=== POST Request ==="
echo "POST /api/auth/login HTTP/1.1"
echo "Host: localhost:8000"
echo "User-Agent: Wget"
echo "Accept: */*"
echo "Content-Type: application/json"
echo "X-CSRF-Token: ${csrf_token}"
echo "Content-Length: 52"
echo "Connection: close"
echo ""
echo '{"email":"demo@example.com","password":"password"}'

echo -e "\n=== POST Response ==="
cat response2.txt

# Cleanup
rm -f cookies.txt response1.txt response2.txt
