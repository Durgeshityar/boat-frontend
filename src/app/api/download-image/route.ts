import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import fetch from 'node-fetch'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get('url')

  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing image URL' }, { status: 400 })
  }

  try {
    // Fetch original image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Valour-Bot/1.0)',
        Accept: 'image/*,*/*;q=0.8',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: response.status }
      )
    }

    const buffer = Buffer.from(await response.arrayBuffer())

    const logoPath = join(process.cwd(), 'public', 'logo.svg')
    let logoSvg = readFileSync(logoPath, 'utf8')

    logoSvg = logoSvg.replace(/fill="white"/g, 'fill="black"')

    const newWidth = Math.round(165 * 1.5) // 248
    const newHeight = Math.round(22 * 1.5) // 33

    logoSvg = logoSvg.replace(/width="165"/, `width="${newWidth}"`)
    logoSvg = logoSvg.replace(/height="22"/, `height="${newHeight}"`)
    logoSvg = logoSvg.replace(/viewBox="0 0 165 22"/, `viewBox="0 0 165 22"`) // Keep original viewBox for proper scaling

    // Convert modified logo SVG to buffer
    const logoWatermark = await sharp(Buffer.from(logoSvg)).png().toBuffer()

    // Get image dimensions to position watermark
    const imageMetadata = await sharp(buffer).metadata()
    const imageWidth = imageMetadata.width || 800

    const outputBuffer = await sharp(buffer)
      .composite([
        {
          input: logoWatermark,
          top: 20,
          left: Math.max(0, imageWidth - 268), // 248px + 20px padding
          blend: 'over',
        },
      ])
      .jpeg({ quality: 90 })
      .toBuffer()

    // Convert Node Buffer -> Uint8Array (BodyInit-compatible)
    const body = new Uint8Array(outputBuffer)

    // Return the watermarked image
    return new NextResponse(body, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition':
          'attachment; filename="valour-transformation.jpg"',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to process image',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
