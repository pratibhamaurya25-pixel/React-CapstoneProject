import "../../styles/Dashboard.css";

function Dashboard() {
  const stats = [
    { title: "Total Products", value: "25", bg: "#eff6ff", color: "#2563eb" },
    { title: "Total Orders", value: "12", bg: "#f0fdf4", color: "#16a34a" },
    { title: "Total Users", value: "8", bg: "#faf5ff", color: "#9333ea" },
    { title: "Total Categories", value: "6", bg: "#fff7ed", color: "#ea580c" },
  ];

  const recentOrders = [
    { id: "#1001", customer: "John Doe", amount: "₹ 1,40,000", status: "Pending", date: "2 mins ago" },
    { id: "#1002", customer: "Alice Smith", amount: "₹ 2,499", status: "Completed", date: "1 hour ago" },
    { id: "#1003", customer: "Bob Johnson", amount: "₹ 5,999", status: "Processing", date: "3 hours ago" },
  ];

  return (
    <div className="dashboard-page">
      <h1>Admin Dashboard</h1>

      {/* Metric Cards */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <div>
              <p className="stat-title">{stat.title}</p>
              <h2 className="stat-value">{stat.value}</h2>
            </div>
            <div className="stat-badge" style={{ backgroundColor: stat.bg, color: stat.color }}>
              📊
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="table-card">
        <h3>Recent Orders</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="font-semibold">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.amount}</td>
                <td>
                  <span className={`status-pill ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td className="text-muted">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;