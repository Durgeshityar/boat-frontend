export interface HealthApiResponse {
  success: boolean
  message: string
  imageUrl: string
  health: {
    projection: {
      [year: string]: {
        year: number
        inputs?: {
          ageYears: number
          BMI: number
          BMR: number
          TDEE: number
          waterTargetMl: number
          activityFactor: number
        }
        bioAge: number
        energy: number
        focus: number
        mood: number
        stress: number
      }
    }
    insights: string[]
  }
}

export interface EditImagePayload {
  image: File
  dob: string
  height: number
  weight: number
  sleepHours: number
  waterMl: number
  steps: number
  calories: number
  gender?: 'male' | 'female' | 'auto'
  goal?: 'fatloss' | 'musclegain'
  bodyFatPct?: number
}

export const editImage = async (
  payload: EditImagePayload
): Promise<HealthApiResponse> => {
  const formData = new FormData()
  formData.append('image', payload.image)
  formData.append('dob', payload.dob)
  formData.append('height', payload.height.toString())
  formData.append('weight', payload.weight.toString())
  formData.append('sleepHours', payload.sleepHours.toString())
  formData.append('waterMl', payload.waterMl.toString())
  formData.append('steps', payload.steps.toString())
  formData.append('calories', payload.calories.toString())
  if (payload.gender) formData.append('gender', payload.gender)
  if (payload.goal) formData.append('goal', payload.goal)
  if (payload.bodyFatPct !== undefined)
    formData.append('bodyFatPct', payload.bodyFatPct.toString())

  const res = await fetch(`http://localhost:3002/api/image/edit`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to edit image: ${text}`)
  }

  const data: HealthApiResponse = await res.json()
  return data
}
