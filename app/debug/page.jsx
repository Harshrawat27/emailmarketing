import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

export default async function DebugPage() {
  let connectionStatus = 'Not connected';
  let databaseName = 'Unknown';
  let collections = [];
  let waitlistCount = 0;
  let error = null;

  try {
    await connectToDatabase();
    connectionStatus = 'Connected';
    databaseName = mongoose.connection.db.databaseName;

    // List all collections in the database
    const collectionsArray = await mongoose.connection.db
      .listCollections()
      .toArray();
    collections = collectionsArray.map((c) => c.name);

    // Count documents in the waitlist collection
    waitlistCount = await mongoose.connection.db
      .collection('waitlist')
      .countDocuments();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
    connectionStatus = 'Error connecting';
  }

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-bold mb-6'>MongoDB Connection Debug</h1>

      <div className='bg-white shadow rounded-lg p-6 mb-6'>
        <h2 className='text-xl font-semibold mb-4'>Connection Status</h2>
        <p
          className={`text-lg ${
            connectionStatus === 'Connected' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {connectionStatus}
        </p>

        {error && (
          <div className='mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
            <p className='font-bold'>Error:</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {connectionStatus === 'Connected' && (
        <>
          <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Database Info</h2>
            <p>
              <strong>Database Name:</strong> {databaseName}
            </p>
          </div>

          <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Collections</h2>
            {collections.length > 0 ? (
              <ul className='list-disc pl-6'>
                {collections.map((collection, index) => (
                  <li key={index} className='mb-1'>
                    {collection}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No collections found</p>
            )}
          </div>

          <div className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Waitlist Collection</h2>
            <p>
              <strong>Document Count:</strong> {waitlistCount}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
