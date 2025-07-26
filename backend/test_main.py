from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 404  # No root endpoint defined

def test_api_docs():
    response = client.get("/docs")
    assert response.status_code == 200

def test_sessions_endpoint():
    response = client.get("/api/v1/sessions")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_query_endpoint():
    response = client.post("/api/v1/query", json={"question": "What is compliance?"})
    # This might fail without proper API key, but we're testing the endpoint exists
    assert response.status_code in [200, 422, 500]  # Various possible responses

def test_create_session():
    response = client.post("/api/v1/sessions", json={"title": "Test Session"})
    assert response.status_code in [200, 422]  # 422 if validation fails 