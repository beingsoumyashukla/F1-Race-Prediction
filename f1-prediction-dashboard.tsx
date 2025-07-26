import React, { useState, useEffect } from 'react';
import { Play, Settings, TrendingUp, MapPin, Clock, Trophy, Zap, AlertCircle } from 'lucide-react';

const F1PredictionDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [raceConfig, setRaceConfig] = useState({
    raceNumber: 9,
    raceName: 'Canadian Grand Prix',
    latitude: 45.5048,
    longitude: -73.5221,
    forecastTime: '2025-06-15 14:00:00',
    apiKey: ''
  });

  const [qualifyingTimes, setQualifyingTimes] = useState([
    { driver: 'Max Verstappen', team: 'Red Bull', time: '1:12.345', position: 1 },
    { driver: 'Lewis Hamilton', team: 'Mercedes', time: '1:12.456', position: 2 },
    { driver: 'Charles Leclerc', team: 'Ferrari', time: '1:12.567', position: 3 },
    { driver: 'Lando Norris', team: 'McLaren', time: '1:12.678', position: 4 },
    { driver: 'George Russell', team: 'Mercedes', time: '1:12.789', position: 5 },
    { driver: 'Oscar Piastri', team: 'McLaren', time: '1:12.890', position: 6 },
    { driver: 'Carlos Sainz', team: 'Ferrari', time: '1:12.901', position: 7 },
    { driver: 'Sergio Perez', team: 'Red Bull', time: '1:13.012', position: 8 },
    { driver: 'Fernando Alonso', team: 'Aston Martin', time: '1:13.123', position: 9 },
    { driver: 'Lance Stroll', team: 'Aston Martin', time: '1:13.234', position: 10 }
  ]);

  const [teamPoints, setTeamPoints] = useState({
    'McLaren': 362,
    'Mercedes': 159,
    'Red Bull': 144,
    'Williams': 54,
    'Ferrari': 165,
    'Haas': 26,
    'Aston Martin': 16,
    'Kick Sauber': 16,
    'Racing Bulls': 22,
    'Alpine': 11
  });

  const [predictions, setPredictions] = useState([
    { driver: 'Max Verstappen', winProbability: 0.342, podiumProbability: 0.789, points: 18.2 },
    { driver: 'Charles Leclerc', winProbability: 0.198, podiumProbability: 0.654, points: 14.1 },
    { driver: 'Lando Norris', winProbability: 0.156, podiumProbability: 0.598, points: 12.8 },
    { driver: 'Lewis Hamilton', winProbability: 0.134, podiumProbability: 0.567, points: 11.3 },
    { driver: 'George Russell', winProbability: 0.089, podiumProbability: 0.445, points: 8.9 }
  ]);

  const [weatherData, setWeatherData] = useState({
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
    precipitation: 10,
    conditions: 'Partly Cloudy'
  });

  const [isRunning, setIsRunning] = useState(false);

  const races2025 = [
    { number: 1, name: 'Bahrain Grand Prix', location: 'Bahrain', lat: 26.0325, lon: 50.5106 },
    { number: 2, name: 'Saudi Arabian Grand Prix', location: 'Jeddah', lat: 21.6319, lon: 39.1044 },
    { number: 3, name: 'Australian Grand Prix', location: 'Melbourne', lat: -37.8497, lon: 144.968 },
    { number: 4, name: 'Japanese Grand Prix', location: 'Suzuka', lat: 34.8431, lon: 136.5407 },
    { number: 5, name: 'Chinese Grand Prix', location: 'Shanghai', lat: 31.3389, lon: 121.2277 },
    { number: 6, name: 'Miami Grand Prix', location: 'Miami', lat: 25.9581, lon: -80.2389 },
    { number: 7, name: 'Emilia Romagna Grand Prix', location: 'Imola', lat: 44.3439, lon: 11.7133 },
    { number: 8, name: 'Monaco Grand Prix', location: 'Monaco', lat: 43.7347, lon: 7.4206 },
    { number: 9, name: 'Canadian Grand Prix', location: 'Montreal', lat: 45.5048, lon: -73.5221 },
    { number: 10, name: 'Spanish Grand Prix', location: 'Barcelona', lat: 41.57, lon: 2.2611 }
  ];

  const handleRaceSelect = (race) => {
    setRaceConfig({
      ...raceConfig,
      raceNumber: race.number,
      raceName: race.name,
      latitude: race.lat,
      longitude: race.lon
    });
  };

  const handleQualifyingUpdate = (index, field, value) => {
    const updated = [...qualifyingTimes];
    updated[index][field] = value;
    setQualifyingTimes(updated);
  };

  const handleTeamPointsUpdate = (team, points) => {
    setTeamPoints({ ...teamPoints, [team]: parseInt(points) || 0 });
  };

  const runPrediction = async () => {
    setIsRunning(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would integrate with your actual ML model
    // For demo purposes, we'll generate some random predictions
    const newPredictions = qualifyingTimes.slice(0, 5).map((driver, index) => ({
      driver: driver.driver,
      winProbability: Math.random() * 0.4 + (5 - index) * 0.08,
      podiumProbability: Math.random() * 0.3 + (5 - index) * 0.12 + 0.4,
      points: Math.random() * 5 + (5 - index) * 3 + 8
    }));
    
    setPredictions(newPredictions);
    setIsRunning(false);
  };

  const ConfigPanel = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Race Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Race</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={raceConfig.raceNumber}
              onChange={(e) => {
                const race = races2025.find(r => r.number === parseInt(e.target.value));
                if (race) handleRaceSelect(race);
              }}
            >
              {races2025.map(race => (
                <option key={race.number} value={race.number}>
                  Race {race.number}: {race.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Race Date & Time</label>
            <input
              type="datetime-local"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={raceConfig.forecastTime.replace(' ', 'T')}
              onChange={(e) => setRaceConfig({...raceConfig, forecastTime: e.target.value.replace('T', ' ')})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
            <input
              type="number"
              step="0.0001"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={raceConfig.latitude}
              onChange={(e) => setRaceConfig({...raceConfig, latitude: parseFloat(e.target.value)})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
            <input
              type="number"
              step="0.0001"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={raceConfig.longitude}
              onChange={(e) => setRaceConfig({...raceConfig, longitude: parseFloat(e.target.value)})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weather API Key</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={raceConfig.apiKey}
              onChange={(e) => setRaceConfig({...raceConfig, apiKey: e.target.value})}
              placeholder="Enter OpenWeather API key"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Qualifying Results
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Position</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Driver</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Team</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {qualifyingTimes.map((entry, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3">{entry.position}</td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={entry.driver}
                      onChange={(e) => handleQualifyingUpdate(index, 'driver', e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={entry.team}
                      onChange={(e) => handleQualifyingUpdate(index, 'team', e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={entry.time}
                      onChange={(e) => handleQualifyingUpdate(index, 'time', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Constructor Championship Points
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(teamPoints).map(([team, points]) => (
            <div key={team} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <label className="font-medium text-gray-700">{team}</label>
              <input
                type="number"
                className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={points}
                onChange={(e) => handleTeamPointsUpdate(team, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Race {raceConfig.raceNumber}: {raceConfig.raceName}</h2>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <MapPin className="w-4 h-4" />
            {raceConfig.latitude.toFixed(4)}, {raceConfig.longitude.toFixed(4)}
          </p>
        </div>
        
        <button
          onClick={runPrediction}
          disabled={isRunning}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Running Model...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Prediction
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Race Predictions
            </h3>
            
            <div className="space-y-4">
              {predictions.map((pred, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">{pred.driver}</h4>
                    <span className="text-sm text-gray-600">#{index + 1} Favorite</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Win Probability</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${pred.winProbability * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{(pred.winProbability * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Podium Probability</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${pred.podiumProbability * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{(pred.podiumProbability * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Expected Points</p>
                      <p className="text-lg font-bold text-gray-800">{pred.points.toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Weather Conditions
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature</span>
                <span className="font-semibold">{weatherData.temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Humidity</span>
                <span className="font-semibold">{weatherData.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wind Speed</span>
                <span className="font-semibold">{weatherData.windSpeed} km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rain Chance</span>
                <span className="font-semibold">{weatherData.precipitation}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Conditions</span>
                <span className="font-semibold">{weatherData.conditions}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Model Status</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Data Sources Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Weather API Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Model Last Updated: 2h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">F1 Prediction Dashboard</h1>
          <p className="text-gray-600">Real-time race outcome predictions powered by machine learning</p>
        </header>

        <nav className="mb-8">
          <div className="flex space-x-1 bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'config'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Configuration
            </button>
          </div>
        </nav>

        {activeTab === 'dashboard' ? <Dashboard /> : <ConfigPanel />}
      </div>
    </div>
  );
};

export default F1PredictionDashboard;