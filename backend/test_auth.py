import urllib.request
import json
import urllib.error
import urllib.parse

BASE_URL = "http://127.0.0.1:8000"

def test_auth():
    print("Testing Registration...")
    try:
        data = json.dumps({
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123"
        }).encode('utf-8')
        req = urllib.request.Request(f"{BASE_URL}/auth/register", data=data, headers={'Content-Type': 'application/json'})
        res = urllib.request.urlopen(req)
        print(res.status, res.read().decode())
    except urllib.error.HTTPError as e:
        print(e.code, e.read().decode()) # Might already exist

    print("\nTesting Login...")
    try:
        data = urllib.parse.urlencode({
            "username": "test@example.com",
            "password": "password123"
        }).encode('utf-8')
        req = urllib.request.Request(f"{BASE_URL}/auth/login", data=data, headers={'Content-Type': 'application/x-www-form-urlencoded'})
        res = urllib.request.urlopen(req)
        response_data = json.loads(res.read().decode())
        print("200 Login Success")
        token = response_data.get("access_token")
    except urllib.error.HTTPError as e:
        print(e.code, e.read().decode())
        return

    print("\nTesting Protected Route (Meetings Create)...")
    try:
        data = json.dumps({"title": "Test Auth Meeting", "duration": 30, "host_id": 1, "scheduled_time": "2024-12-01T10:00:00Z"}).encode('utf-8')
        req = urllib.request.Request(
            f"{BASE_URL}/meetings/create", 
            data=data,
            headers={"Authorization": f"Bearer {token}", 'Content-Type': 'application/json'}
        )
        res = urllib.request.urlopen(req)
        print(res.status, res.read().decode())
    except urllib.error.HTTPError as e:
        print(e.code, e.read().decode())

if __name__ == "__main__":
    test_auth()
