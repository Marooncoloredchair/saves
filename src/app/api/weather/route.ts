import { NextResponse } from 'next/server'

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const LOCATION = process.env.WEATHER_LOCATION

export async function GET() {
  if (!WEATHER_API_KEY || !LOCATION) {
    return NextResponse.json({
      error: 'Weather API key or location not set in environment variables.'
    }, { status: 500 })
  }
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(LOCATION)}&aqi=no`)
    if (!res.ok) throw new Error('Failed to fetch weather')
    const data = await res.json()
    return NextResponse.json({
      temperature: data.current.temp_f,
      condition: data.current.condition.text,
      icon: 'https:' + data.current.condition.icon
    })
  } catch (error: any) {
    return NextResponse.json({
      temperature: 68,
      condition: 'Partly Cloudy',
      icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
      error: error.message || 'Failed to fetch weather'
    })
  }
} 