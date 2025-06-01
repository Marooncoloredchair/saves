// sync-firebase-users.js
const { PrismaClient } = require('@prisma/client');
const admin = require('firebase-admin');
const prisma = new PrismaClient();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

async function syncUsers() {
  let nextPageToken;
  do {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    for (const userRecord of listUsersResult.users) {
      const { uid, email, displayName } = userRecord;
      // Check if user exists in DB
      const exists = await prisma.user.findUnique({ where: { id: uid } });
      if (!exists && email) {
        await prisma.user.create({
          data: {
            id: uid,
            name: displayName || email.split('@')[0],
            email,
            password: '', // Set to empty string or handle as needed
            role: 'MEMBER',
          },
        });
        console.log(`Created user: ${email}`);
      }
    }
    nextPageToken = listUsersResult.pageToken;
  } while (nextPageToken);
  console.log('Sync complete!');
  process.exit(0);
}

syncUsers().catch(console.error); 