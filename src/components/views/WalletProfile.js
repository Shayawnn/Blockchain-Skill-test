import { Row,Col } from 'antd';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {AiOutlineQrcode,AiTwotoneContainer,AiOutlineKey,AiOutlineUser} from 'react-icons/ai';
import WalletResetPasswordModal from "../component/WalletResetPasswordModal";
import { useTranslation } from 'react-i18next';
import { SERVER_URL } from "../../constants/env";
    
function WalletProfile() {
    const [t,i18n] = useTranslation();
    const [use,setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
    const [showModal, setShowModal] = useState(false);
    const [ethPrice, setEthPrice] = useState(null);

    const fetchEthPrice = async () => {
        try {
            const response = await axios.get(SERVER_URL + 'wallets/gettoptokens');
            if (response.data.response && response.data.data.length > 0) {
                const ethData = response.data.data.find(token => token.symbol === 'ETH');
                if (ethData) {
                    setEthPrice(ethData.price);
                }
            }
        } catch (error) {
            console.error("Error fetching ETH price:", error);
        }
    };

    useEffect(() => {
        fetchEthPrice();
    }, []);

  return (
    <Col span={22} offset={1} className="mt-8 myColor1 text-sm">
      <Row>
        <Col span={20}>
         {t('Email Address')} 
        </Col>
        <Col span={4} className="text-center text-overflow">
          {t('Edit Password')}
        </Col>
      </Row>

      <Row className="text-lg font-bold">
        <Col span={20}>
          {t(use.email)}
        </Col>
        <Col span={4} className="text-center">
          <a onClick={()=>setShowModal(true)}><AiOutlineKey size={20} className="inline mr-2"/></a>
        </Col>
      </Row>


      {
        showModal?
          <WalletResetPasswordModal  setModalShow={setShowModal} title="Reset Password"/>
        : null
      }
      {/* Display ETH Price */}
      {ethPrice && (
          <div>
              <p>Current ETH Price: {ethPrice}</p>
          </div>
      )}
    </Col>
  );
}

export default WalletProfile;
