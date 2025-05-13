import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { conversionTools, mergeTools, compressTools } from "../../toolsData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toolsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTools = () => setIsToolsOpen((prev) => !prev);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const syncLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", syncLoginStatus);
    return () => window.removeEventListener("storage", syncLoginStatus);
  }, []);

  const closeMenus = () => {
    setIsOpen(false);
    setIsToolsOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center text-xl font-bold text-blue-800">
            <span className="mr-1 text-2xl"><b>ProtonPDF</b></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
            <Link to="/" className="hover:text-blue-800">Home</Link>

            <div className="relative" ref={toolsRef}>
              <button onClick={toggleTools} className="hover:text-blue-800 transition-colors">
                Tools
              </button>

              {isToolsOpen && (
                <div className="absolute left-0 mt-3 w-[800px] bg-white border border-gray-200 rounded-md shadow-xl z-50">
                  <div className="p-6 grid grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Conversion Tools</h4>
                      {conversionTools.slice(0, 6).map((tool, index) => (
                        <Link
                          key={index}
                          to={tool.link}
                          onClick={closeMenus}
                          className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-md"
                        >
                          <div className={`w-10 h-10 flex items-center justify-center rounded-full text-xl ${tool.color}`}>
                            {tool.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-800 mt-1">{tool.title}</span>
                        </Link>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 invisible lg:visible">&nbsp;</h4>
                      {conversionTools.slice(6).map((tool, index) => (
                        <Link
                          key={index}
                          to={tool.link}
                          onClick={closeMenus}
                          className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-md"
                        >
                          <div className={`w-10 h-10 flex items-center justify-center rounded-full text-xl ${tool.color}`}>
                            {tool.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-800 mt-1">{tool.title}</span>
                        </Link>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Merge Tools</h4>
                      {mergeTools.map((tool, index) => (
                        <Link
                          key={index}
                          to={tool.link}
                          onClick={closeMenus}
                          className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-md"
                        >
                          <div className={`w-10 h-10 flex items-center justify-center rounded-full text-xl ${tool.color}`}>
                            {tool.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-800 mt-1">{tool.title}</span>
                        </Link>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Compress Tools</h4>
                      {compressTools.map((tool, index) => (
                        <Link
                          key={index}
                          to={tool.link}
                          onClick={closeMenus}
                          className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-md"
                        >
                          <div className={`w-10 h-10 flex items-center justify-center rounded-full text-xl ${tool.color}`}>
                            {tool.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-800 mt-1">{tool.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className="hover:text-blue-800">About</Link>
            <Link to="/contact" className="hover:text-blue-800">Contact</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <button className="bg-blue-800 text-white px-4 py-1 rounded hover:bg-white hover:text-blue-800 border border-blue-800 transition">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-white text-blue-800 px-4 py-1 rounded hover:bg-blue-800 hover:text-white border border-blue-800 transition">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={logoutHandler}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-white hover:text-red-600 border border-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 pb-4 space-y-2">
            <button onClick={toggleTools} className="block text-gray-700 hover:text-blue-800 w-full text-left px-2">
              Tools
            </button>

            {isToolsOpen && (
              <div className="bg-white border border-gray-200 rounded-md shadow-md px-4 py-4 space-y-4" ref={toolsRef}>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Conversion Tools</h4>
                  {conversionTools.map((tool, index) => (
                    <Link
                      key={index}
                      to={tool.link}
                      onClick={closeMenus}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xl ${tool.color}`}>
                        {tool.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{tool.title}</span>
                    </Link>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Merge Tools</h4>
                  {mergeTools.map((tool, index) => (
                    <Link
                      key={index}
                      to={tool.link}
                      onClick={closeMenus}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xl ${tool.color}`}>
                        {tool.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{tool.title}</span>
                    </Link>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Compress Tools</h4>
                  {compressTools.map((tool, index) => (
                    <Link
                      key={index}
                      to={tool.link}
                      onClick={closeMenus}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xl ${tool.color}`}>
                        {tool.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{tool.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link to="/about" onClick={closeMenus} className="block text-gray-700 hover:text-blue-800 px-2">About</Link>
            <Link to="/contact" onClick={closeMenus} className="block text-gray-700 hover:text-blue-800 px-2">Contact</Link>

            <div className="flex flex-col gap-2 pt-2 px-2">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={closeMenus}>
                    <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded hover:bg-gray-200 w-full">Login</button>
                  </Link>
                  <Link to="/register" onClick={closeMenus}>
                    <button className="bg-blue-800 text-white px-4 py-1 rounded hover:bg-blue-700 w-full">Sign up</button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    logoutHandler();
                    closeMenus();
                  }}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-white hover:text-red-600 border border-red-600 transition w-full"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
