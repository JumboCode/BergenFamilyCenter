// overall rule should be everything is private
// allows users to write to any event_attendees documents
service cloud.firestore {
 match /databases/{database}/documents {
  // Match any document in the ‘cities’ collection
  match /event_attendees/{people} {
   allow write: if true;
  }
 }
}
//read access to everything for authenticated users
service cloud.firestore {
 match /databases/{database}/documents {
  allow read: if request.auth != null
 }
}
//give users access to their own data
service cloud.firestore {
 match /databases/{database}/documents {
  // Allow only authenticated content owners access
  match /some_collection/{userId}/{documents=**} {
   allow read, write: if request.auth != null && request.auth.uid == userId
  }
 }
}
// allow anyone to read to admin, but not write
service cloud.firestore {
 match /databases/{database}/documents {
  // Match any document in the ‘cities’ collection
  match /admin/{an_admin} {
   allow read: if true;
  }
 }
}

