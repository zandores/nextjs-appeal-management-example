import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: "Ban Appeal Management",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-light`}>
        <div className="d-flex" style={{ height: "100vh" }}>
          {/* Sidebar */}
          <div className="d-flex flex-column p-3 bg-dark text-white" style={{ width: "250px", height: "100vh", position: "fixed", top: 0, left: 0 }}>
            <div className="text-center mb-3">
              <h2>Ban Appeal Management</h2>
            </div>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/appeal" className="btn btn-primary w-100 text-start">Create New Appeal</a>
              </li>
              <li className="nav-item mb-2">
                <a href="/delete" className="btn btn-danger w-100 text-start">Delete Appeal</a> {/* New Link */}
              </li>
              <li className="nav-item mb-2">
                <a href="/pending" className="btn btn-dark w-100 text-start">Pending Appeals</a>
              </li>
              <li className="nav-item mb-2">
                <a href="/reviewed" className="btn btn-dark w-100 text-start">Reviewed Appeals</a>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div className="flex-fill" style={{ marginLeft: "250px", padding: "20px", overflowY: "auto", height: "100vh" }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
