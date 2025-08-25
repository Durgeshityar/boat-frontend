# Valour Boat API Contract

## Overview

The Valour Boat API provides endpoints for processing user transformations based on lifestyle data and generating AI-enhanced images. The API accepts user information including photos, personal details, and daily activity metrics to produce transformation results.

## Base URL

```
http://localhost:3001/api
```

## Authentication

The API uses access tokens for authentication. Most endpoints require a valid access token in the request header.

### Getting an Access Token

**Endpoint:** `GET /token`

**Description:** Generates a new access token for API authentication.

**Headers:**
```
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "uuid-string",
    "expiresIn": "15 minutes",
    "maxRequests": 5,
    "message": "Use this token in the 'x-access-token' header. Valid for 5 requests or 15 minutes, whichever comes first."
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Using Access Tokens

Include the access token in the `x-access-token` header for all authenticated requests:

```
x-access-token: your-access-token-here
```

### Token Status

**Endpoint:** `GET /token/status/{token}`

**Description:** Check the status and usage of an access token.

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "uuid1234...",
    "requestsUsed": 2,
    "requestsLeft": 3,
    "maxRequests": 5,
    "timeLeft": "12 minutes",
    "expiresAt": "2024-01-01T00:15:00.000Z",
    "isExpired": false,
    "isExhausted": false
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Endpoints

### 1. Process Transformation

**Endpoint:** `POST /transform`

**Description:** Processes user data and generates transformation results including metrics and AI-enhanced images.

**Headers:**
```
Content-Type: application/json
x-access-token: your-access-token-here
```

**Request Body:**
```json
{
  "userName": "string",
  "userPhoto": "string (base64 encoded image with data URL prefix)",
  "userDetails": {
    "dateOfBirth": "string (YYYY-MM-DD)",
    "height": "number (cm)",
    "weight": "number (kg)"
  },
  "dailyActivity": {
    "sleep": "number (hours)",
    "water": "number (ml)",
    "steps": "number (thousands)",
    "calories": "number (kcal)"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "jobId": "job_1704067200000_abc123def",
    "status": "processing"
  },
  "message": "Transformation job started successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### 2. Get Transformation Status

**Endpoint:** `GET /status/{jobId}`

**Description:** Checks the status of a transformation job and returns results when completed.

**Headers:**
```
Content-Type: application/json
x-access-token: your-access-token-here
```

**Response (Processing):**
```json
{
  "success": true,
  "data": {
    "status": "processing"
  }
}
```

**Response (Completed):**
```json
{
  "success": true,
  "data": {
    "status": "completed",
    "result": {
      "biologicalAge": 25,
      "currentAge": 27,
      "metrics": {
        "energy": {
          "value": 83,
          "change": "+18%",
          "current": "65%"
        },
        "focus": {
          "value": 88,
          "change": "+14%",
          "current": "74%"
        },
        "mood": {
          "value": 91,
          "change": "+19%",
          "current": "72%"
        },
        "stress": {
          "value": 25,
          "change": "-30%",
          "current": "55%"
        }
      },
      "transformedImage": "string (base64 encoded transformed image)",
      "originalImage": "string (base64 encoded original image)"
    }
  }
}
```

**Response (Failed):**
```json
{
  "success": true,
  "data": {
    "status": "failed",
    "error": "Error message describing what went wrong"
  }
}
```

### 3. Upload Image

**Endpoint:** `POST /upload-image`

**Description:** Uploads and stores an image, returning a URL for future reference.

**Headers:**
```
Content-Type: application/json
x-access-token: your-access-token-here
```

**Request Body:**
```json
{
  "image": "string (base64 encoded image with data URL prefix)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://example.com/images/img_1704067200000_abc123def.jpg"
  },
  "message": "Image uploaded successfully"
}
```

### 4. Get Prompts

**Endpoint:** `GET /prompts`

**Description:** Returns available transformation prompts.

**Headers:**
```
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "data": {
    "prompts": [
      {
        "key": "health_optimization",
        "name": "Health Optimization",
        "description": "Transform to show optimal health and vitality",
        "category": "health"
      }
    ]
  }
}
```

### 5. Get Prompt Categories

**Endpoint:** `GET /prompts/categories`

**Description:** Returns available prompt categories.

**Headers:**
```
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "key": "health",
        "name": "Health & Wellness",
        "description": "Health-focused transformations"
      }
    ]
  }
}
```

### 6. Legacy Image Edit (Backward Compatibility)

**Endpoint:** `POST /edit-image`

**Description:** Direct image editing with health data integration.

**Headers:**
```
Content-Type: application/json
x-access-token: your-access-token-here
```

**Request Body:**
```json
{
  "promptKey": "health_optimization",
  "inputImage": "string (base64 encoded image)",
  "dob": "1990-05-15",
  "height": 175,
  "weight": 70,
  "sleepHours": 7,
  "waterMl": 2000,
  "steps": 8,
  "calories": 2200,
  "config": {
    "sex": "male",
    "bodyFatPct": 15
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "image": {
      "output_image": "string (base64 encoded transformed image)",
      "metadata": {}
    },
    "health": {
      "projections": [...],
      "insights": [...],
      "summary": {
        "currentBioAge": 28,
        "currentEnergy": 85,
        "currentFocus": 90,
        "currentMood": 92,
        "currentStress": 20
      }
    }
  }
}
```

## Data Types

### UserData
```typescript
interface UserData {
  userName: string;
  userPhoto: string; // base64 encoded image with data URL prefix
  userDetails: {
    dateOfBirth: string; // YYYY-MM-DD format
    height: number; // cm
    weight: number; // kg
  };
  dailyActivity: {
    sleep: number; // hours
    water: number; // ml
    steps: number; // thousands
    calories: number; // kcal
  };
}
```

### TransformationJob
```typescript
interface TransformationJob {
  success: boolean;
  data: {
    jobId: string;
    status: 'processing' | 'completed' | 'failed';
  };
  message?: string;
  error?: string;
}
```

### TransformationResult
```typescript
interface TransformationResult {
  success: boolean;
  data: {
    status: 'processing' | 'completed' | 'failed';
    result?: {
      biologicalAge: number;
      currentAge: number;
      metrics: {
        energy: {
          value: number;
          change: string;
          current: string;
        };
        focus: {
          value: number;
          change: string;
          current: string;
        };
        mood: {
          value: number;
          change: string;
          current: string;
        };
        stress: {
          value: number;
          change: string;
          current: string;
        };
      };
      transformedImage: string; // base64 encoded transformed image
      originalImage: string; // base64 encoded original image
    };
    error?: string;
  };
}
```

### AccessToken
```typescript
interface AccessToken {
  success: boolean;
  data: {
    accessToken: string;
    expiresIn: string;
    maxRequests: number;
    message: string;
  };
  timestamp: string;
}
```

## Error Codes

| HTTP Status | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid or missing access token |
| 403 | Forbidden - Bot access denied |
| 413 | Payload Too Large - Image file too large |
| 415 | Unsupported Media Type - Invalid image format |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Processing failed |
| 503 | Service Unavailable - AI service temporarily unavailable |

## Image Requirements

- **Format:** JPEG, PNG, or other common image formats
- **Max Size:** 5MB (as base64)
- **Encoding:** Base64 string with data URL prefix
- **Example:** `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...`

## Rate Limiting

- **Access Token Limits:** 5 requests per token (15-minute lifetime)
- **IP-based Limits:** 100 requests per 15 minutes
- **Request Pattern Limits:** 5 requests per fingerprint per 15 minutes

## Processing Time

- **Typical processing time:** 10-30 seconds
- **Maximum processing time:** 2 minutes
- **Timeout:** 2 minutes

## Environment Variables

The frontend expects the following environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Example Usage

### Frontend Integration

```typescript
import { apiService } from '@/lib/api';

// 1. Get access token
const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`);
const tokenData = await tokenResponse.json();
const accessToken = tokenData.data.accessToken;

// 2. Process transformation
const userData = {
  userName: "John Doe",
  userPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  userDetails: {
    dateOfBirth: "1995-06-15",
    height: 178,
    weight: 74
  },
  dailyActivity: {
    sleep: 7.5,
    water: 2500,
    steps: 12,
    calories: 2200
  }
};

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': accessToken
};

const transformResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transform`, {
  method: 'POST',
  headers,
  body: JSON.stringify(userData)
});

const transformData = await transformResponse.json();

if (transformData.success) {
  const jobId = transformData.data.jobId;
  
  // 3. Poll for results
  const pollInterval = setInterval(async () => {
    const statusResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/status/${jobId}`, {
      headers
    });
    const statusData = await statusResponse.json();
    
    if (statusData.data.status === 'completed') {
      clearInterval(pollInterval);
      console.log('Transformation completed:', statusData.data.result);
    } else if (statusData.data.status === 'failed') {
      clearInterval(pollInterval);
      console.error('Transformation failed:', statusData.data.error);
    }
  }, 2000); // Poll every 2 seconds
} else {
  console.error('Transformation failed:', transformData.error);
}
```

## Backend Implementation Notes

1. **Authentication:** Access tokens with request limits and expiration
2. **Image Processing:** AI/ML models for image transformation via BFL API
3. **Data Storage:** In-memory storage for development (use Redis/database in production)
4. **Caching:** Cache transformation results for better performance
5. **Security:** Validate and sanitize all input data, bot detection
6. **Monitoring:** Log all API calls and errors for debugging
7. **Scalability:** Consider using message queues for long-running transformations

## Testing

### Test Data

```json
{
  "userName": "Test User",
  "userPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "userDetails": {
    "dateOfBirth": "1990-01-01",
    "height": 175,
    "weight": 70
  },
  "dailyActivity": {
    "sleep": 8.0,
    "water": 2000,
    "steps": 10,
    "calories": 2000
  }
}
```

### Testing Flow

1. **Get Access Token:**
   ```bash
   curl -X GET "http://localhost:3001/api/token" \
     -H "Content-Type: application/json"
   ```

2. **Start Transformation:**
   ```bash
   curl -X POST "http://localhost:3001/api/transform" \
     -H "Content-Type: application/json" \
     -H "x-access-token: YOUR_TOKEN" \
     -d '{"userName": "Test", "userPhoto": "data:image/jpeg;base64,...", ...}'
   ```

3. **Check Status:**
   ```bash
   curl -X GET "http://localhost:3001/api/status/JOB_ID" \
     -H "Content-Type: application/json" \
     -H "x-access-token: YOUR_TOKEN"
   ```

### Expected Response

```json
{
  "success": true,
  "data": {
    "status": "completed",
    "result": {
      "biologicalAge": 28,
      "currentAge": 34,
      "metrics": {
        "energy": {
          "value": 85,
          "change": "+20%",
          "current": "65%"
        },
        "focus": {
          "value": 90,
          "change": "+16%",
          "current": "74%"
        },
        "mood": {
          "value": 92,
          "change": "+22%",
          "current": "70%"
        },
        "stress": {
          "value": 20,
          "change": "-35%",
          "current": "55%"
        }
      },
      "transformedImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
      "originalImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
    }
  }
}
```
