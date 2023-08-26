import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd"
import { useLogout } from "../../hooks/useLogout";

export const LogoutButton = () => {
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const { logout, isLoading } = useLogout();
    const navigate = useNavigate();
    

    const handleLogout = async () => {
        enterLoading(1)
        await logout();
        navigate('/login')
    };

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    return (
        <Button
            type="text"
            style={{ color: "#fff", position: 'absolute', bottom: '2%', width: '100%' }}
            icon={<PoweroffOutlined />}
            loading={loadings[1]}
            onClick={handleLogout}
        >
            {isLoading ? `Login Out` : 'Logout'}
        </Button>
    )
}