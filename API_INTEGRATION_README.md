# API Integration Implementation

## Overview

This document describes the API integration changes made to the Valour Boat application to connect it with a backend service for processing user transformations.

## Changes Made

### 1. API Service Layer (`src/lib/api.ts`)

Created a comprehensive API service that handles:
- **UserData interface**: Defines the structure for user input data
- **TransformationResult interface**: Defines the expected response structure
- **ApiService class**: Handles all HTTP requests to the backend
- **Error handling**: Comprehensive error management for API calls

### 2. Custom Hook (`src/lib/hooks/useTransformation.ts`)

Created a React hook that manages:
- **Transformation state**: Loading, success, error states
- **Progress tracking**: Real-time progress updates
- **API integration**: Seamless connection to the transformation service
- **Error handling**: User-friendly error management

### 3. Updated Components

#### Main Page (`src/app/page.tsx`)
- Added transformation state management
- Integrated API calls into the user flow
- Added error handling and progress tracking
- Connected all user data to the API

#### Step 4 (`src/components/Step4.tsx`)
- Added props for processing state
- Integrated progress bar with real API progress
- Added error display functionality
- Removed static progress simulation

#### Step 5 (`src/components/Step5.tsx`)
- Added support for real transformation results
- Integrated actual transformed images
- Added fallback to static data when API fails
- Enhanced with real metrics from backend

## Environment Configuration

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## API Endpoints

The application expects the following backend endpoints:

### POST /transform
Processes user data and returns transformation results.

**Request:**
```json
{
  "userName": "string",
  "userPhoto": "base64-encoded-image",
  "userDetails": {
    "dateOfBirth": "YYYY-MM-DD",
    "height": 178,
    "weight": 74
  },
  "dailyActivity": {
    "sleep": 7.5,
    "water": 2000,
    "steps": 12,
    "calories": 2200
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
      "energy": { "value": 83, "change": "+18%", "current": "65%" },
      "focus": { "value": 88, "change": "+14%", "current": "74%" },
      "mood": { "value": 91, "change": "+19%", "current": "72%" },
      "stress": { "value": 25, "change": "-30%", "current": "55%" }
    },
    "transformedImage": "base64-encoded-transformed-image",
    "originalImage": "base64-encoded-original-image"
  }
}
```

## Data Flow

1. **User Input Collection**: Steps 1-3 collect user data
2. **Data Preparation**: Step 4 triggers API call with complete user data
3. **API Processing**: Backend processes data and returns results
4. **Results Display**: Step 5 shows transformation results

## Error Handling

The application handles various error scenarios:

- **Network errors**: Connection failures, timeouts
- **API errors**: Invalid responses, server errors
- **Validation errors**: Invalid input data
- **Processing errors**: Transformation failures

## Testing

### Manual Testing
1. Start the development server: `npm run dev`
2. Complete the user flow (Steps 1-4)
3. Verify API call is made in browser network tab
4. Check error handling by temporarily disabling the backend

### API Testing
Use the provided test data in `API_CONTRACT.md` to test the backend endpoints.

## Backend Requirements

The backend should implement:

1. **Data validation**: Validate all input fields
2. **Image processing**: Handle base64 image data
3. **AI transformation**: Apply transformation algorithms
4. **Metrics calculation**: Generate health and wellness metrics
5. **Error handling**: Proper error responses
6. **CORS support**: Allow frontend requests

## Performance Considerations

- **Image optimization**: Compress images before API calls
- **Progress tracking**: Show real-time progress updates
- **Error recovery**: Graceful fallback to static data
- **Caching**: Consider caching transformation results

## Security Notes

- **Input validation**: All user inputs are validated
- **Image security**: Images are processed securely
- **Data privacy**: No sensitive data is logged
- **CORS**: Configure CORS properly for production

## Future Enhancements

1. **Authentication**: Add user authentication
2. **Caching**: Implement result caching
3. **Offline support**: Add offline capabilities
4. **Real-time updates**: WebSocket for live progress
5. **Analytics**: Track user engagement and API usage
