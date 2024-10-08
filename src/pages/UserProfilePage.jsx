import { useRecoilState } from "recoil";
import { RecoilRoot } from "recoil";
import { Topbar } from "../components/topbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import profileImage from '../assets/imageholder.jpg';
 
export function ProfilePage() {
    // Retrieve user info from localStorage
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate(); // Initialize navigate function for redirection

    // Handle Logout
    const handleLogout = () => {
        // Get cart items from localStorage before clearing
        const cartItems = localStorage.getItem('cartItems');

        // Clear all of localStorage
        localStorage.clear();

        // Redirect to /signin after logout
        navigate("/signin"); // Redirect to the signin page
    };

    return (
        <div>
            <Topbar />
            <div className="m-5  h-screen">
                <div className="m-10 mb-4 font-bold text-3xl">
                    {/* Check if userdata exists and display the username */}
                    {userinfo ? userinfo.username : "Guest"}
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="border m-10 mt-0 shadow-lg w-[200px] h-[200px] flex-shrink-0">
                        <img src={profileImage} alt="" />
                    </div>
                    <div className="flex-grow p-10 pt-0">
                        <div className="text-xl mb-5 font-bold"> Email Id: <br />
                            <div className="font-light text-lg">
                                {userinfo ? userinfo.email : "No email found"}
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="m-10 border-gray-300" />
                <div className="m-10 flex justify-between">
                    <button 
                        onClick={() => navigate('/myorders')} 
                        className="border hover:bg-orange-300 px-2 py-2 text-white rounded-lg bg-orange-400 font-bold"
                    >
                        Previous orders
                    </button>
                    <button 
                        className="border px-3 py-2 rounded-lg bg-red-600 font-medium hover:bg-red-500 text-white"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}

export default function PROFILEPAGE() {
    return (
        <RecoilRoot>
            <ProfilePage />
        </RecoilRoot>
    );
}
