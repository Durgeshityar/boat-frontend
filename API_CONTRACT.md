# Valour Boat API Contract

## Overview

The Valour Boat API provides endpoints for processing user transformations based on lifestyle data and generating AI-enhanced images. The API accepts user information including photos, personal details, and daily activity metrics to produce transformation results.

## Base URL

```
http://localhost:3001/api
```

## Authentication

Currently, the API does not require authentication. In production, consider implementing JWT tokens or API keys.

## Endpoints

### 1. Process Transformation

**Endpoint:** `POST /transform`

**Description:** Processes user data and generates transformation results including metrics and AI-enhanced images.

**Request Body:**
```json
{
  "userName": "string",
  "userPhoto": "string (base64 encoded image)",
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
  },
  "message": "Transformation completed successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### 2. Upload Image

**Endpoint:** `POST /upload-image`

**Description:** Uploads and stores an image, returning a URL for future reference.

**Request Body:**
```json
{
  "image": "string (base64 encoded image)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://example.com/images/uploaded-image.jpg"
  }
}
```

### 3. Get Transformation Status

**Endpoint:** `GET /status/{jobId}`

**Description:** Checks the status of a transformation job.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "processing|completed|failed",
    "result": {
      // Same structure as transformation response data
    }
  }
}
```

## Data Types

### UserData
```typescript
interface UserData {
  userName: string;
  userPhoto: string; // base64 encoded image
  userDetails: {
    dateOfBirth: string;
    height: number;
    weight: number;
  };
  dailyActivity: {
    sleep: number;
    water: number;
    steps: number;
    calories: number;
  };
}
```

### TransformationResult
```typescript
interface TransformationResult {
  success: boolean;
  data: {
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
  message?: string;
  error?: string;
}
```

## Error Codes

| HTTP Status | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input data |
| 413 | Payload Too Large - Image file too large |
| 415 | Unsupported Media Type - Invalid image format |
| 500 | Internal Server Error - Processing failed |
| 503 | Service Unavailable - AI service temporarily unavailable |

## Image Requirements

- **Format:** JPEG, PNG, or GIF
- **Max Size:** 5MB
- **Max Dimensions:** 800x800 pixels
- **Encoding:** Base64 string

## Rate Limiting

- **Requests per minute:** 10
- **Requests per hour:** 100
- **Requests per day:** 1000

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

// Process transformation
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

const result = await apiService.processTransformation(userData);

if (result.success) {
  console.log('Transformation completed:', result.data);
} else {
  console.error('Transformation failed:', result.error);
}
```

## Backend Implementation Notes

1. **Image Processing:** Use AI/ML models for image transformation
2. **Data Storage:** Store user data and results in a database
3. **Caching:** Cache transformation results for better performance
4. **Security:** Validate and sanitize all input data
5. **Monitoring:** Log all API calls and errors for debugging
6. **Scalability:** Consider using message queues for long-running transformations

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

### Expected Response

```json
{
  "success": true,
  "data": {
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
```
