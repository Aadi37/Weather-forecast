import { useState, useEffect } from "react";
import logo from "../images/Logo.png";

const Header = () => {
  const [location, setLocation] = useState(null);
  const [datePart, setDatePart] = useState("");
  const [timePart, setTimePart] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      const ipApi = "https://ipapi.co/json/";

      try {
        const res = await fetch(ipApi);
        const data = await res.json();

        setLocation({
          city: data.city,
          region: data.region,
          country: data.country_name,
          timezone: data.timezone,
        });

        if (data.timezone) {
          updateTime(data.timezone);

          // 🔄 Update every second
          const timer = setInterval(() => updateTime(data.timezone), 1000);
          return () => clearInterval(timer);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    const updateTime = (tz) => {
      const now = new Date();

      // 🗓️ Day + Date
      const dateString = now.toLocaleString("en-IN", {
        timeZone: tz,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // ⏰ Time only
      const timeString = now.toLocaleString("en-IN", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setDatePart(dateString);
      setTimePart(timeString);
    };

    fetchLocation();
  }, []);

  return (
    <div className="MainHeader text-center mx-auto HeaderComp">
      <img src={logo} width={225} className="mx-auto" alt="Logo" />

      <div className="userInfo  items-center mt-4 text-white">
        {location ? (
          <>
          <div className='flex justify-between sm:flex-row flex-col'>
            <div>
<h2 className="text-xl font-bold">
              {location.city}, {location.country}
              <br />
              {location.region}
            </h2>
            </div>
            <div>
           <p className="mt-2 text-gray-300">{datePart || "Loading date..."}</p>
            <p className="text-lg font-semibold">{timePart || "Loading time..."}</p>
            </div>
          </div>
          </>
        ) : (
          <p>Detecting location...</p>
        )}
      </div>
    </div>
  );
};

export default Header;
