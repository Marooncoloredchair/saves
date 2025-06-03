const fs = require('fs');
const path = require('path');

const API_DIR = path.join(__dirname, '../src/app/api');

function updateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already using the singleton
  if (content.includes('import { prisma } from \'@/lib/prisma\'')) {
    return;
  }

  // Replace PrismaClient import and instantiation
  const updatedContent = content
    .replace(/import { PrismaClient } from '@prisma\/client';?\n/g, '')
    .replace(/const prisma = new PrismaClient\(\);?\n/g, '')
    .replace(/import { NextResponse } from 'next\/server';?\n/g, 
      `import { NextResponse } from 'next/server';\nimport { prisma } from '@/lib/prisma';\n`);

  fs.writeFileSync(filePath, updatedContent);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file === 'route.ts') {
      updateFile(filePath);
    }
  }
}

processDirectory(API_DIR); 