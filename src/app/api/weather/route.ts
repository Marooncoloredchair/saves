import { NextResponse } from 'next/server'

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const LOCATION = process.env.WEATHER_LOCATION

export async function GET() {
  if (!OPENWEATHER_API_KEY || !LOCATION) {
    console.error('OpenWeather API key or location missing:', { OPENWEATHER_API_KEY, LOCATION });
    return NextResponse.json({
      error: 'OpenWeather API key or location not set in environment variables.'
    }, { status: 500 })
  }
  try {
    // OpenWeatherMap API: get weather by city name
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(LOCATION)}&appid=${OPENWEATHER_API_KEY}&units=imperial`)
    if (!res.ok) throw new Error('Failed to fetch weather: ' + res.status + ' ' + res.statusText)
    const data = await res.json()
    return NextResponse.json({
      temperature: data.main.temp,
      condition: data.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    })
  } catch (error: any) {
    console.error('OpenWeather API error:', error);
    return NextResponse.json({
      temperature: 68,
      condition: 'Partly Cloudy',
      icon: 'https://openweathermap.org/img/wn/03d@2x.png',
      error: error.message || 'Failed to fetch weather'
    })
  }
} 