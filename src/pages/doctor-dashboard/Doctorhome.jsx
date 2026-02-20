import React, { useState } from "react";
// import { FaUserMd, FaClock, FaCheckCircle, FaStopwatch } from "react-icons/fa";
// import { IoPersonOutline } from "react-icons/io5";
 import Header from "../../components/ui/Header";
 import PatientQueue from "./PatientQueue";
 

const Doctordashboard = () => {
  const [patients, setPatients] = useState([
    { id: "PT001", name: "Sarah Johnson", time: "10:30 AM", status: "Waiting", symptoms: "Chest pain, shortness of breath" },
    { id: "PT002", name: "Michael Chen", time: "10:45 AM", status: "Waiting", symptoms: "Fever, cough" },
    { id: "PT003", name: "Emma Davis", time: "11:00 AM", status: "In Progress", symptoms: "Back pain" },
    { id: "PT004", name: "Robert Lee", time: "11:15 AM", status: "Completed", symptoms: "Headache" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
       <Header /> 
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Good morning, Dr. Mitchell</h1>
        <p className="text-gray-500 mt-1">
          You have {patients.filter(p => p.status === "Waiting").length} patients waiting for consultation
        </p>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-100 p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              {/* <FaUserMd className="text-blue-600 text-2xl" /> */}
              <span className="text-green-600 text-sm">+12%</span>
            </div>
            <h2 className="text-3xl font-semibold mt-2">24</h2>
            <p className="text-gray-600 text-sm">Total Patients Today</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              {/* <FaClock className="text-yellow-600 text-2xl" /> */}
              <span className="text-red-500 text-sm">-2</span>
            </div>
            <h2 className="text-3xl font-semibold mt-2">
              {patients.filter(p => p.status === "Waiting").length}
            </h2>
            <p className="text-gray-600 text-sm">Waiting Consultations</p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              {/* <FaCheckCircle className="text-green-600 text-2xl" /> */}
              <span className="text-green-500 text-sm">+5</span>
            </div>
            <h2 className="text-3xl font-semibold mt-2">
              {patients.filter(p => p.status === "Completed").length}
            </h2>
            <p className="text-gray-600 text-sm">Completed Today</p>
          </div>

          <div className="bg-red-100 p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              {/* <FaStopwatch className="text-red-600 text-2xl" /> */}
              <span className="text-red-500 text-sm">-3 min</span>
            </div>
            <h2 className="text-3xl font-semibold mt-2">22 min</h2>
            <p className="text-gray-600 text-sm">Avg. Consultation Time</p>
          </div>
        </div>

        {/* Search and Queue */}
        <div className="mt-8 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by name, ID, or symptoms..."
            className="border rounded-lg px-4 py-2 w-full md:w-1/2"
          />
          <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg">Refresh</button>
        </div>

         Patient Queue 
         <PatientQueue patients={patients} /> 
      </div>
    </div>
  );
};

export default Doctordashboard;