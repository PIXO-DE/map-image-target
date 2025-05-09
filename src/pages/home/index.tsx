import logo from '/logo.png';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center quizbg px-6">
      <div className="flex flex-col items-center text-center animate-fade-in space-y-6">
        
        <h1 className="text-3xl md:text-4xl font-bold text-red-900">Willkommen!</h1>
        <p className="text-gray-700 text-lg">Was willst du machen?</p>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <button
            onClick={() => (window.location.href = '/wimmelbild/ar')}
            className="bg-red-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-800 transition"
          >
            Karte entdecken
          </button>
          <button
            onClick={() => (window.location.href = '/wimmelbild/quiz')}
            className="bg-red-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-800 transition"
          >
            Quizaufgaben lösen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
