import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const Dashboard: React.FC = () => {
  const { user, logout } = useContext(AuthContext) ?? {
    user: null,
    logout: () => {},
  };
  const navigate = useNavigate();
  const [analytics, setAnalytics] = React.useState<any[]>([]);
  const [activities, setActivities] = React.useState<any[]>([]);
  const [notification, setNotification] = React.useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const analyticsRes = await axios.get(
          `${API_URL}/api/user/analytics/${user.id}`,
          {
            withCredentials: true,
          }
        );
        setAnalytics(analyticsRes.data);

        const activitiesRes = await axios.get(
          `${API_URL}/api/user/activities/${user.id}`,
          {
            withCredentials: true,
          }
        );
        setActivities(activitiesRes.data);

        if (user.isSetupComplete)
          setNotification(
            "Your LinkFree profile has been set up successfully."
          );
      }
    };
    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-purple-500">LinkFree</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="px-4 py-2 text-gray-700 bg-gray-200">Overview</li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200">
              <Link to="/links">Links</Link>
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200">
              <Link to="/analytics">Analytics</Link>
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200">
              <Link to="/themes">Themes</Link>
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200">
              <Link to="/settings">Settings</Link>
            </li>
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-200">
              <Link to="/help">Help Center</Link>
            </li>
            <li
              className="px-4 py-2 text-red-500 hover:bg-gray-200"
              onClick={handleLogout}
            >
              Sign Out
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-600">
            Welcome back! Here's an overview of your LinkFree profile.
          </p>
        </header>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Visits",
              value: "1.2K",
              change: "+12%",
              icon: "👁️",
            },
            { title: "Total Clicks", value: "856", change: "+8%", icon: "📈" },
            {
              title: "Unique Visitors",
              value: "689",
              change: "+16%",
              icon: "👥",
            },
            {
              title: "Conversion Rate",
              value: "3.2%",
              change: "+5%",
              icon: "📊",
            },
          ].map((metric, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{metric.title}</h3>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-green-500">{metric.change} from last week</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: "42%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Pages */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Your Pages</h3>
          <p className="text-gray-600">Create and manage your link pages</p>
          <p className="text-gray-500 mt-2">
            You haven't created any pages yet
          </p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
            Create Your First Page
          </button>
        </div>

        {/* Weekly Visits */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Weekly Visits</h3>
          <p className="text-gray-600">Profile visits over the last 7 days</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <p className="text-gray-600">Latest interactions with your profile</p>
          <ul>
            {activities.map((activity, index) => (
              <li key={index} className="mb-2 flex items-center">
                <span className="mr-2">👁️</span>
                {activity.action} on your {activity.linkType} link -{" "}
                {activity.timestamp}
              </li>
            ))}
          </ul>
        </div>

        {/* Notification */}
        {notification && (
          <div className="bg-white p-4 rounded-lg shadow-md fixed bottom-4 right-4 w-64">
            <p className="text-gray-800">{notification}</p>
            <div className="mt-2 flex justify-end">
              <button className="bg-black text-white py-1 px-2 rounded mr-2">
                Edit with Lovabl
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
