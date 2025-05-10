import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <main className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>
          MongoDB Dashboard
        </h1>
        <Dashboard />
      </div>
    </main>
  );
}
