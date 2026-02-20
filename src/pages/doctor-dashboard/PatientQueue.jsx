import React from "react";
// import { IoPersonOutline } from "react-icons/io5";

const PatientQueue = ({ patients }) => {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        {/* <IoPersonOutline className="mr-2 text-green-600" />*/} Patient Queue 
      </h2>
      <div className="grid gap-4">
        {patients.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition"
          >
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-gray-500 text-sm">{p.time} | ID: {p.id}</p>
              <p className="text-gray-600 text-sm">{p.symptoms}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  p.status === "Waiting"
                    ? "bg-yellow-100 text-yellow-700"
                    : p.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {p.status}
              </span>
              <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
                Start Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientQueue;