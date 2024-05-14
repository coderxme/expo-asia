import { Image } from 'antd';
import  { useState } from 'react';
import Event from '../../assets/events.svg'

const TwoButtonTabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='tabsContainer'>
     <div className="tabsBtnBox">
     <button onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? 'activeTab' : ''}>
      <b>DAY 1 </b> - June 13, 2024
    </button>
      <button onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? 'activeTab' : ''}>
      <b>DAY 2</b> - June 14, 2024
        </button>
     </div>
      <div className='flex flex-col items-center '>
        {activeTab === 'tab1' && <Image src={Event} width={"75%"} />}
        {activeTab === 'tab2' && <Image src={Event} width={"75%"} />}

      </div>
    </div>
  );
};

export default TwoButtonTabs;
