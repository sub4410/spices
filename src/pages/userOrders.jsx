import { useRecoilState } from "recoil";
import { userDetailAtom } from "../atoms/userAtom";
import { RecoilRoot } from "recoil";
import { Topbar } from "../components/topbar";

export function ProfilePage() {
    // Recoil state for user info
    const [userinfo] = useRecoilState(userDetailAtom);

    // Retrieve and parse user info from localStorage
    const userdata = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div>
            <Topbar />
            <div className="m-5 shadow-lg h-screen">
                <div className="m-10 mb-4 font-bold text-3xl">
                    Your orders
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
