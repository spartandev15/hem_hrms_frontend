import React from "react";
import "../../assets/styles/leave.css";

const employeeLeaveData = [
  {
    employeeId: 1,
    employeeName: "John Doe",
    leaveTypes: {
      sickLeave: {
        totalGranted: 12, // Total sick leave granted
        taken: 4, // Sick leave already taken
        remaining: 8, // Remaining sick leave (calculated as total - taken)
      },
      paidLeave: {
        totalGranted: 20, // Total paid leave granted
        taken: 5, // Paid leave already taken
        remaining: 15, // Remaining paid leave (calculated as total - taken)
      },
      unpaidLeave: {
        totalGranted: 10, // Total unpaid leave granted
        taken: 2, // Unpaid leave already taken
        remaining: 8, // Remaining unpaid leave (calculated as total - taken)
      },
      casualLeave: {
        totalGranted: 10, // Total casual leave granted
        taken: 3, // Casual leave already taken
        remaining: 7, // Remaining casual leave (calculated as total - taken)
      },
    },
    totalLeaves: 24,
    totalLeavesTaken: 15, // Total leaves taken
    totalLeavesRemaining: 3, // Remaining leaves (calculated as total - taken)
  },
  {
    employeeId: 1,
    employeeName: "Raitender",
    leaveTypes: {
      sickLeave: {
        totalGranted: 12, // Total sick leave granted
        taken: 4, // Sick leave already taken
        remaining: 8, // Remaining sick leave (calculated as total - taken)
      },
      paidLeave: {
        totalGranted: 20, // Total paid leave granted
        taken: 5, // Paid leave already taken
        remaining: 15, // Remaining paid leave (calculated as total - taken)
      },
      unpaidLeave: {
        totalGranted: 10, // Total unpaid leave granted
        taken: 2, // Unpaid leave already taken
        remaining: 8, // Remaining unpaid leave (calculated as total - taken)
      },
      casualLeave: {
        totalGranted: 10, // Total casual leave granted
        taken: 3, // Casual leave already taken
        remaining: 7, // Remaining casual leave (calculated as total - taken)
      },
    },
    totalLeaves: 24,
    totalLeavesTaken: 15, // Total leaves taken
    totalLeavesRemaining: 3, // Remaining leaves (calculated as total - taken)
  },
  {
    employeeId: 1,
    employeeName: "Vikash",
    leaveTypes: {
      sickLeave: {
        totalGranted: 12, // Total sick leave granted
        taken: 4, // Sick leave already taken
        remaining: 8, // Remaining sick leave (calculated as total - taken)
      },
      paidLeave: {
        totalGranted: 20, // Total paid leave granted
        taken: 5, // Paid leave already taken
        remaining: 15, // Remaining paid leave (calculated as total - taken)
      },
      unpaidLeave: {
        totalGranted: 10, // Total unpaid leave granted
        taken: 2, // Unpaid leave already taken
        remaining: 8, // Remaining unpaid leave (calculated as total - taken)
      },
      casualLeave: {
        totalGranted: 10, // Total casual leave granted
        taken: 3, // Casual leave already taken
        remaining: 7, // Remaining casual leave (calculated as total - taken)
      },
    },
    totalLeaves: 24,
    totalLeavesTaken: 15, // Total leaves taken
    totalLeavesRemaining: 3, // Remaining leaves (calculated as total - taken)
  },
  {
    employeeId: 1,
    employeeName: "John Doe",
    leaveTypes: {
      sickLeave: {
        totalGranted: 12, // Total sick leave granted
        taken: 4, // Sick leave already taken
        remaining: 8, // Remaining sick leave (calculated as total - taken)
      },
      paidLeave: {
        totalGranted: 20, // Total paid leave granted
        taken: 5, // Paid leave already taken
        remaining: 15, // Remaining paid leave (calculated as total - taken)
      },
      unpaidLeave: {
        totalGranted: 10, // Total unpaid leave granted
        taken: 2, // Unpaid leave already taken
        remaining: 8, // Remaining unpaid leave (calculated as total - taken)
      },
      casualLeave: {
        totalGranted: 10, // Total casual leave granted
        taken: 3, // Casual leave already taken
        remaining: 7, // Remaining casual leave (calculated as total - taken)
      },
    },
    totalLeaves: 24,
    totalLeavesTaken: 15, // Total leaves taken
    totalLeavesRemaining: 3, // Remaining leaves (calculated as total - taken)
  },
  // More employee data can go here...
];

const Leave = () => {
  return (
    <div className="container">
      <h1>Leave</h1>
      <p>This is the Leave page.</p>

      <table className="employee-leave-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Total Granted</th>
            <th>Leaves Taken</th>
            <th>Remaining Leaves</th>
          </tr>
        </thead>
        <tbody>
          {employeeLeaveData.map((employee) => (
            <React.Fragment key={employee.employeeId}>
              {Object.keys(employee.leaveTypes).map((leaveType, index) => {
                const leaveData = employee.leaveTypes[leaveType];
                return (
                  <tr key={index}>
                    {index === 0 && (
                      <td rowSpan={Object.keys(employee.leaveTypes).length}>
                        {employee.employeeName}
                      </td>
                    )}
                    <td>{leaveType.replace(/([A-Z])/g, " $1")}</td>
                    <td>{leaveData.totalGranted}</td>
                    <td>{leaveData.taken}</td>
                    <td>{leaveData.remaining}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="2">
                  <strong>Total</strong>
                </td>
                <td>{employee.totalLeaves}</td>
                <td>{employee.totalLeavesTaken}</td>
                <td>{employee.totalLeavesRemaining}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leave;
